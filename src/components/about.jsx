import React from "react";

export const About = () => {
  return (
    <div className="about-container">
      <h1>About NC News</h1>
      <p>
        Welcome to NC News, a platform where you can read, discuss, and share
        news articles on a variety of topics.
      </p>
      <p>
        This project was built using modern web technologies, including React
        for the frontend and Node.js/Express for the backend.
      </p>
      <p>
        The goal is to provide a seamless and engaging experience for users to
        stay informed and connect with others.
      </p>
      <h2>Technologies Used</h2>
      <div className="technologies-container">
        <ul>
          <li>React</li>
          <li>Node.js</li>
          <li>Express</li>
          <li>PostgreSQL</li>
        </ul>
      </div>
      <h2>GitHub Repository</h2>
      <p>
        <a
          href="https://github.com/Alsamri/fe_nc_news"
          target="_blank"
          rel="noopener noreferrer"
        >
          View the code on GitHub
        </a>
      </p>
    </div>
  );
};
