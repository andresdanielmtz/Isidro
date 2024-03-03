import React from "react";
import { Link } from 'react-router-dom'

export default function Title() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        An{" "}
        <mark className="px-2 text-white bg-indigo-700 rounded dark:bg-indigo-500">
          accesible
        </mark>{" "}
        option for organization.
      </h1>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        Welcome, to the first AI-powered solution focused on empowering
        individuals through accesibility.
      </p>
      <p className="text-lg lg:text-x2 text-gray-500 dark:text-gray-400 italic py-5px">
        {" "}
        (Currently in development!){" "}
      </p>

      <Link to = "/Project" className="relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 my-10">
        <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
          Get Started!
        </span>
      </Link>
    </div>
  );
}
