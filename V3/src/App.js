import React, { Suspense } from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Movies from "./Movies";
import Header from "./Header";
import Genres from "./Genres";
import MovieDetails from "./MovieDetails";
import { Route, Routes } from "react-router-dom";
import "./css/section.css";
import "./App.css";
import { Dropdown } from "react-bootstrap";
import SeeMore from "./SeeMore";
import TableMovie from "./TableMovie";
import TableMovie1 from "./TableMovie1";

const TrailerBar = React.lazy(() => import("./TrailerBar"));

function App() {
  const [theme, setTheme] = useState("dark");
  const [moviesFull, setMoviesFull] = useState([]);
  const [moviesTop, setMoviesTop] = useState([]);
  const [moviesBottom, setMoviesBottom] = useState([]);
  const [genre, setGenre] = useState([]);
  const languages = [
    "Tamil",
    "English",
    "Hindi",
    "Telungu",
    "Marathi",
    "Punjabi",
  ];
  const [searchData, setsearchData] = useState("");
  const [searchResult, setsearchResult] = useState([]);
  const [ApiSearchfetch, setApiSearchfetch] = useState([]);
  const [Open, setOpen] = useState(false);
  const [passId, setpassId] = useState(false)
  const [passData, setpassData] = useState("")

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const img_url = process.env.REACT_APP_IMG_URL;
  const base_url = process.env.REACT_APP_BASE_URL;
  const api_key = process.env.REACT_APP_API_KEY;
  const genre_url = process.env.REACT_APP_GENRE_URL;
  const content_url1 = process.env.REACT_APP_CONTENT_URL1;
  const content_url2 = process.env.REACT_APP_CONTENT_URL2;

  useEffect(async () => {
    const response = await axios.get(genre_url + api_key);
    const genresfull = response.data.genres;
    const genrelist = genresfull.slice(1, 10);
    setGenre(genrelist);
  }, []);

  useEffect(async () => {
    const response = await axios.get(base_url + content_url1 + api_key);
    const movielistfull1 = response.data.results;
    const movielist1 = movielistfull1.slice(0, 4);
    setMoviesTop(movielist1);
    setMoviesFull(movielistfull1);
  }, []);

  useEffect(async () => {
    const response = await axios.get(base_url + content_url2 + api_key);
    const movielistfull1 = response.data.results;
    const movielist1 = movielistfull1.slice(0, 4);
    setMoviesBottom(movielist1);
  }, []);

  const movieId = moviesTop.map((movie) => {
    return { id: movie.id };
  });

  // console.log(movieId);

  const movieName = moviesTop.map((movie) => {
    return [movie.original_title];
  });

  // const na me =;
  // console.log(process.env);

  // Search Api data Fetching part

  const ApiSearchFun = () => {
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?${api_key}&language=en-US&query=${searchData}&page=1&include_adult=false`
      )
      .then((res) => {
        console.log("ApiSearchfetch : ", res.data.results);
        setApiSearchfetch(res.data.results.slice(0, 18));
        console.log(searchData);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    ApiSearchFun();
  }, [searchData]);

  useEffect(() => {
    const filterSearchData = moviesFull.filter((movie) =>
      movie.original_title.toLowerCase().includes(searchData.toLowerCase())
    );

    setsearchResult(filterSearchData.slice(0, 18));

    // setsearchResult("")
  }, [moviesFull, searchData]);

  return (
    // <themeCxt.Provider value={[theme, setTheme]}>
    <div className="App bg-dark">
      <Header
        Open={Open}
        setOpen={setOpen}
        handleClose={handleClose}
        img_url={img_url}
        ApiSearchfetch={ApiSearchfetch}
        theme={theme}
        setTheme={setTheme}
        searchData={searchData}
        setsearchData={setsearchData}
        handleOpen={handleOpen}
        passData={passData}
        passId={passId}
      />
      <Routes>
        <Route
          path="/"
          element={
            <section onClick={handleClose}

            // style={{ display: "grid", gridTemplateColumns: "1fr 3fr 1.5fr" }}
            >
              <div className="BoxOne">
                <Genres theme={theme} genre={genre} languages={languages} handleClose={handleClose} />
              </div>

              <div
                id="BoxTwo"
                style={{ backgroundColor: "#19181F" }}
                className="d-flex flex-column"
              >
                <div
                  style={{
                    backgroundColor: theme === "dark" ? "#222128" : "#c7c7c7",
                    color: theme === "dark" ? "white" : "black",
                  }}
                  // variant={theme === "dark" ? " dark" : "white"}
                  // className="bg-#19181F d-flex flex-column align-items-center text-center gap-3 p-4"
                  id="insideBoxTrai2"
                >
                  <div className="mobile-box">
                    <h5>New Trailers</h5>
                    <Dropdown className="btnDroptext">
                      <Dropdown.Toggle
                        variant="none"
                        id="dropdown-basic"
                        size="md"
                        style={{ color: theme === "dark" ? "white" : "black" }}
                        className="bnone"
                      >
                        Genres
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">
                          Adventure
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-2">
                          Animation
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Comedy</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Crime</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">
                          Documentary
                        </Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Drama</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Family</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">Fantasy</Dropdown.Item>
                        <Dropdown.Item href="#/action-3">History</Dropdown.Item>
                      </Dropdown.Menu>
                    </Dropdown>
                  </div>
                  <div className="scroll"  >
                    <Suspense fallback={<div>Loading ...</div>}>
                      <TrailerBar
                        c="mobile"
                        movieId={movieId[0]}
                        movieName={movieName[0]}
                        theme={theme}
                      />
                      <TrailerBar
                        c="mobile"
                        movieId={movieId[1]}
                        movieName={movieName[1]}
                        theme={theme}
                      />
                      <TrailerBar
                        c="mobile"
                        movieId={movieId[2]}
                        movieName={movieName[2]}
                        theme={theme}
                      />
                      <TrailerBar
                        c="mobile"
                        movieId={movieId[3]}
                        movieName={movieName[3]}
                        theme={theme}
                      />
                    </Suspense>
                  </div>
                </div>

                <Movies
                  theme={theme}
                  title={"Movies in Theatre"}
                  movies={moviesTop} //searchResult --- moviesTop
                  img_url={img_url}
                  ApiSearchfetch={ApiSearchfetch}
                  Open={Open}
                  setOpen={setOpen}
                  handleClose={handleClose}
                  setpassId={setpassId}
                  setpassData={setpassData}
                  passId={passId}
                />

                <Movies
                  theme={theme}
                  title={"Most Popular Movies"}
                  movies={moviesBottom} //searchResult --- moviesBottom
                  img_url={img_url}
                  ApiSearchfetch={ApiSearchfetch}
                  Open={Open}
                  setOpen={setOpen}
                  handleClose={handleClose}
                />
              </div>
              <div
                // style={{
                //   backgroundColor: theme === "dark" ? "#222128" : "#c7c7c7",
                //   color: theme === "dark" ? "white" : "black",
                // }}
                // variant={theme === "dark" ? " dark" : "white"}
                // className="bg-#19181F d-flex flex-column align-items-center text-center gap-3 p-4"
                id="insideBoxTrai"
                style={{
                  backgroundColor: theme === "dark" ? "#222128" : "#c7c7c7",
                  color: theme === "dark" ? "white" : "black",
                }}
              >
                <Suspense fallback={<div>Loading ...</div>}>
                  <h5 style={{color: theme === "dark" ? "white" : "black"}} >New Trailers</h5>
                  <TrailerBar theme={theme} movieId={movieId[0]} movieName={movieName[0]} />
                  <TrailerBar theme={theme} movieId={movieId[1]} movieName={movieName[1]} />
                  <TrailerBar theme={theme} movieId={movieId[2]} movieName={movieName[2]} />
                  <TrailerBar theme={theme} movieId={movieId[3]} movieName={movieName[3]} />
                </Suspense>
              </div>
            </section>
          }
        ></Route>

        <Route
          path="/movie/:id"
          element={
            <MovieDetails theme={theme} moviesFull={moviesFull} genre={genre} handleClose={handleClose} />
          }
        ></Route>

        <Route
          path="/seemore"
          element={
            <SeeMore
              ApiSearchfetch={ApiSearchfetch}
              img_url={img_url}
              theme={theme}
              moviesFull={searchResult}
              handleClose={handleClose}
            />
          }
        ></Route>
        <Route
          path="/table"
          element={
            <TableMovie moviesFull={moviesFull} />
          }
        ></Route>
        <Route
          path="/table1"
          element={
            <TableMovie1 moviesFull={moviesFull} />
          }
        ></Route>
      </Routes>
    </div>
    // </themeCxt.Provider>
  );
}

export default App;
