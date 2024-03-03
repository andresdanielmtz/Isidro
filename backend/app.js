const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    // Allow communication with the frontend
    origin: "*",
  },
});
const port = 3000; // Change this to your desired port
const cors = require("cors");
const voice = require("elevenlabs-node");

const apiKey = "f5da8a45cef5d77d242f8394b80ace65";
const voiceID = "pNInz6obpgDQGcFmaJgB";
const audioFile = "audio.mp3";

app.use(cors());

// Enable CORS (Cross-Origin Resource Sharing) to allow communication with the frontend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json());
app.use(express.static("public"));

io.on("connection", (socket) => {
  // Event handler for incoming transcription data from the frontend
  socket.on("transcription", (data) => {
    console.log("Transcription:", data);
    // Here you can further process or store the transcription data as per your needs
  });
});

// process axios post request
// POST route to handle Axios request
app.post("/api/transcript", (req, res) => {
  console.log("API TRANSCRIPT REQUEST");
  console.log(req.body.transcript);

  // Process the request data here (e.g., save to a database, perform some action)
  let data = req.body.transcript;
  voice.textToSpeech(apiKey, voiceID, audioFile, data).then((res) => {
    console.log(res);
  });

  const responseData = "Server says: Request received successfully!";
  res.send(responseData);
});

app.get("/stream", (req, res) => {
  const file = __dirname + "/api/audio.mp3";
  fs.exists(file, (exists) => {
    if (exists) {
      const rstream = fs.createReadStream(file);
      rstream.pipe(res);
    } else {
      res.send("Error - 404");
      res.end();
    }
  });
});

app.get("/get_audio", (req, res) => {
  const audioFilePath = "/audio.mp3"; // Replace with the actual path to your audio file
  res.sendFile(__dirname + audioFilePath);
});

/*

  voice.textToSpeech(apiKey, voiceID, audioFile, data).then((data) => {
    // res.sendFile(__dirname, audioFile);
    console.log("Audio file generated:", data);
  });
  */
http.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
});
