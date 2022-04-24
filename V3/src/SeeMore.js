import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/SeeMore.css";

const SeeMore = ({ theme, moviesFull, img_url, ApiSearchfetch, handleClose }) => {
  const navigate = useNavigate();
  return (
    <div
      style={{
        backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
        color: theme === "dark" ? "white" : "black",
      }}
      onClick={handleClose}
    >
      <h1 className="head-con">Explore More</h1>
      <div className="See-More-con">
        {moviesFull.map((movie) => {
          return (
            <Card
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="m-3 movie-card"
              style={{
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                border: "none",
                width: "138px",
              }}
            >
              <Card.Img
                className="rounded-3"
                variant="top"
                src={img_url + movie.poster_path}
              />
              <Card.Body style={{ paddingTop: "1rem" }}>
                <Card.Title className="text-start">
                  <h6 className="headtext">{movie.original_title}</h6>
                </Card.Title>

                <p className="paratext">⭐{movie.vote_average}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <div className="See-More-con">
        {ApiSearchfetch.map((movie) => {
          return (
            <Card
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="m-3 movie-card"
              style={{
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                border: "none",
                width: "138px",
              }}
            >
              <Card.Img
                className="rounded-3"
                variant="top"
                src={img_url + movie.poster_path}
              />
              <Card.Body style={{ paddingTop: "1rem" }}>
                <Card.Title className="text-start">
                  <h6 className="headtext">{movie.original_title}</h6>
                </Card.Title>

                <p className="paratext">⭐{movie.vote_average}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default SeeMore;
