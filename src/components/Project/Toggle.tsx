import React, { useState, useEffect } from "react";
import axios from "axios";
import openSocket from "socket.io-client";

const ENDPOINT = "http://localhost:3000"; // Replace with the appropriate backend URL

export default function Toggle(props) {
  const [isOn, setIsOn] = useState(false);
  const [transcript, setTranscript] = useState("");
  const socket = openSocket(ENDPOINT, { transports: ["websocket"] });
  const [recognition, setRecognition] = useState(null);
  const [isRecognitionRunning, setIsRecognitionRunning] = useState(false);


  useEffect(() => {
    if (isOn) {
      startListening();
    }
  }, [isOn]);

  const startListening = () => {
    // Check if the browser supports the SpeechRecognition API
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript; // transcribed message
        // send transcript to /api/transcript

        setTranscript(transcript);
        socket.emit('transcription', transcript); // Send the transcription to the backend

        axios
          .post('http://localhost:3000/api/transcript', { transcript })
          .then((res) => {
            console.log(res.data);
            // play audio
            
          })
          .catch((err) => {
            console.log(err);
          });


          setTimeout(()=> {
            axios
              .get('http://localhost:3000/get_audio', { responseType: 'blob' })
              .then((response) => {
                let audioUrl = URL.createObjectURL(new Blob([response.data]));
                let audioElement = new Audio(audioUrl);
                audioElement.play();
              })
              .catch((error) => {
                console.error('Error fetching audio:', error);
              });
         }
         ,1000); // 1 second delay
   

          
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
      };

      recognition.start();
    } else {
      console.error("Speech recognition not supported in this browser.");
    }
  };

  const handleClick = () => {
    setIsOn(!isOn);
  };

  return (
    <div>
      <button
        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
        onClick={handleClick}
      >
        {isOn ? "Stop" : "Start"}
      </button>
      {isOn && props.children}
      {transcript}
    </div>
  );
}
