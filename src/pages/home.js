import React from "react";
import "../styles/home.css"

const Home = () => {
  return (
    <div className="jumbotron">
      <div className="file-uploader">File Uploader</div>
      <div className="on-chain">Your Stuff, On-Chain.</div>
      <div className="desc">Upload a file to <strong>Shadow Drive</strong> and get a sharable link</div>
    </div>
  );
};

export default Home;