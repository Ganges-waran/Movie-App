import axios from "axios";
import React, { useState, useEffect } from "react";
import "./css/TrailerBar.css";
import {
  CgArrowRightO,CgArrowLeftO
} from "react-icons/cg";

function TrailerBar({ movieId, movieName, c, theme, }) {
  const trailer_url = process.env.REACT_APP_TRAILER_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const youtube_url = process.env.REACT_APP_YOUTUBE_LINK;

  // console.log(moviename);

  const [key, setKey] = useState("");

  const funArrow = () => {
    const slidedata = document.querySelector(".scroll");
    slidedata.scrollLeft += 120;
  };

  const funArrowlft = () => {
    const slidedata = document.querySelector(".scroll");
    slidedata.scrollLeft -= 120;
  };

  useEffect(async () => {
    const response = await axios.get(
      `${trailer_url}${movieId.id}/videos?${api_key}`
    );
    const res = response.data.results[0].key;
    // console.log(res);
    setKey(res);
  }, [movieId, trailer_url, api_key]);

  // const youtube = youtube_url + key;
  // console.log(youtube);

  return (
    <div className="display" style={{
      backgroundColor: theme === "dark" ? "#222128" : "#c7c7c7",
      color: theme === "dark" ? "white" : "black",
    }} >
      <div className="TrailerBox">
      <div id={c} className="Right-side-box">
        <div className="Trailer-part" id="databox">
          <span id="SlideIdIcon" onClick={funArrow}>
            <CgArrowRightO size="27px" color="gray" className="Iconarr" />
          </span>
          <span id="SlideIdIconlft" onClick={funArrowlft}>
            <CgArrowLeftO size="27px" color="gray" />
          </span>
          <iframe
            width="200px"
            height="100"
            style={{paddingLeft:'10px', paddingRight:'10px'}}
            src={youtube_url + key}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
          <p className="side-p">{movieName}</p>
        </div>
      </div>
    </div>
    </div>
    
  );
}

export default TrailerBar;
