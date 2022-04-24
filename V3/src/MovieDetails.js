import React, { useEffect, useState } from "react";
import { Button, Card } from "react-bootstrap";
import axios from "axios";
import "./App.css";
import { useParams, useNavigate } from "react-router-dom";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper";
import "swiper/css/pagination";
import Rating from "@mui/material/Rating";
import "./css/MovieDetails.css";

function MovieDetails({ theme, handleClose }) {
  const [moviesFull, setMoviesFull] = useState([]);
  const navigate = useNavigate();
  const movieId = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [key, setKey] = useState("");
  const img_url = process.env.REACT_APP_IMG_URL;
  const trailer_url = process.env.REACT_APP_TRAILER_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const youtube_url = process.env.REACT_APP_YOUTUBE_LINK;
  const [findWidth, setFindWidth] = useState()

  useEffect(async () => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId.id}?api_key=22aebc42426caea5ad0370c9680690d6`
    );
    const movie = response.data;
    setMovieDetails(movie);
  }, [movieId]);

  const funSimilarMovies = () => {
    axios
      .get(
        `

${trailer_url}${movieId.id}/similar?${api_key}

`
      )
      .then((res) => {
        console.log("dataField", res.data.results);
        setMoviesFull(res.data.results);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    funSimilarMovies();
  }, []);
  // console.log(movieDetails);
  useEffect(async () => {
    const response = await axios.get(
      `${trailer_url}${movieId.id}/videos?${api_key}`
    );
    const res = response.data.results[0].key;
    setKey(res);
  }, [movieId]);

  // let ratedata = movieDetails.vote_average;

  return (
    <div
      
      style={{
        backgroundImage:
          theme === "dark"
            ? `linear-gradient(rgba(0, 0, 0, 0.8), #19181F), url(${
                img_url + movieDetails["poster_path"]
              })`
            : `linear-gradient(rgba(255, 255, 255, 0.6), #FFFFFF), url(${
                img_url + movieDetails["poster_path"]
              })`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
        backgroundColor: theme === "dark" ? "#19181F" : "white",
        color: theme === "dark" ? "white" : "black",
      }}
    >
      <div onClick={handleClose} className="gap-4 Wrapper1">
        <div className="gap-4 p-4 Wrapper2">
          <img
            className="movie-poster"
            style={{ borderRadius: "1rem", cursor:"pointer" }}
            src={img_url + movieDetails["poster_path"]}
          />
          <div className="text-wrapper gap-4">
            <h2 className="movie-poster-title ">{movieDetails.title}</h2>
            {/* <div
              style={{ display: movieDetails.genres ? "unset" : "none" }}
              className="d-flex gap-2"
            >
              {movieDetails.genres.map(async (g) => {
                return (
                  <Button className="btn-sm" variant="secondary">
                    {g.name}
                  </Button>
                );
              })}
            </div> */}

            <Rating
              className="movie-rating"
              name="customized-10"
              value={movieDetails.vote_average}
              precision={0.5}
              readOnly
              max={10}
            />
            
            {console.log(movieDetails.vote_average)}

            <p className="movie-para">{movieDetails.overview}</p>
          </div>
        </div>

        <iframe
          className="iframe-box"
          src={youtube_url + key}
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <h4 className="px-4">Similar</h4>
      <div style={{ overflow: "hidden" }}>
        <div className="d-flex gap-2">
          <Swiper
            // slidesPerView={ window.innerWidth >= 415 ? 6 : 2}
            slidesPerView={5}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper data-box-one"
          >
            {moviesFull.map((movie) => {
              return (
                <SwiperSlide>
                  <Card
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="m-3 swp-card"
                    style={{
                      cursor: "pointer",
                      width: "150px",
                      border: "none",
                      backgroundColor: theme === "dark" ? "#19181F" : "white",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0.5rem" }}
                      className="rounded-5"
                      variant="top"
                      src={img_url + movie["poster_path"]}
                    />
                    <Card.Body style={{ paddingTop: "1rem" }}>
                      <Card.Title className="text-start">
                        <h6>{movie.title}</h6>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
        <div className="d-flex gap-2">
          <Swiper
            slidesPerView={2}
            spaceBetween={5}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="mySwiper data-box-two"
          >
            {moviesFull.map((movie) => {
              return (
                <SwiperSlide>
                  <Card
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    className="m-3"
                    style={{
                      cursor: "pointer",
                      width: "150px",
                      border: "none",
                      backgroundColor: theme === "dark" ? "#19181F" : "white",
                    }}
                  >
                    <Card.Img
                      style={{ borderRadius: "0.5rem" }}
                      className="rounded-5"
                      variant="top"
                      src={img_url + movie["poster_path"]}
                    />
                    <Card.Body style={{ paddingTop: "1rem" }}>
                      <Card.Title className="text-start">
                        <h6>{movie.title}</h6>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
