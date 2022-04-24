import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./css/Movies.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";

function Movies({
  theme,
  title,
  movies,
  img_url,
  ApiSearchfetch,
  Open,
  setOpen,
  handleClose,
  setpassId,
  setpassData,
  passId
}) {
  const navigate = useNavigate();

  return (
    <div
      className="CardBoxMovie"
      // className=" d-flex flex-column align-items-center justify-content-center pt-4 ps-4 pe-4"
      style={{
        backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
        color: theme === "dark" ? "white" : "black",
      }}
      onClick={handleClose}
    >
      <div className="Movie-title">
        <h5 style={{color: theme === "dark" ? "white" : "black"}}>{title}</h5>
        <h6
          className="ms-auto text-muted see-more-box"
          onClick={() => navigate(`/seemore`)}
          style={{ cursor: "pointer" }}
        >
          See More
        </h6>
      </div>
      <div className="innerMovieBox">
        {movies.map((movie) => {
          return (
            <Card
              onClick={() => {
                navigate(`/movie/${movie.id}`)
                console.log("show",movie.title);

                setpassId(true)
                setpassData(movie.title)
              }}
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
                  <h6 className="headtext" style={{color: theme === "dark" ? "white" : "black"}}>{movie.original_title}</h6>
                </Card.Title>

                <p className="paratext">⭐{movie.vote_average}</p>
              </Card.Body>
            </Card>
          );
        })}
      </div>

      <hr className="w-100 color-secondary" />

      {/* <div className="innerMovieBox">
        {ApiSearchfetch.map((movie) => {
          return (
            <Card
              onClick={() => navigate(`/movie/${movie.id}`)}
              className="m-3 movie-card"
              style={{
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                border: "none",
                width: '138px'
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
      </div> */}

      {/* <Modal
        open={Open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal> */}
    </div>
  );
}

export default Movies;
