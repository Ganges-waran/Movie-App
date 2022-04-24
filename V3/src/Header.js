import React, { useState } from "react";
import { Navbar, Nav, Container, FormControl, Dropdown } from "react-bootstrap";
import { Button } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useNavigate } from "react-router-dom";
import "./css/Header.css";
import { HiMenuAlt2 } from "react-icons/hi";
import { Check } from "@mui/icons-material";
import { FaSearch } from "react-icons/fa";

function Header({
  theme,
  setTheme,
  searchData,
  setsearchData,
  handleOpen,
  ApiSearchfetch,
  img_url,
  Open,
  setOpen,
  passData,
  passId,
}) {
  // const [theme, setTheme] = useContext(themeCxt);
  const navigate = useNavigate();
  const [Pass, setPass] = useState();
  const [check, setcheck] = useState(false);
  const [seacrhIcon, setseacrhIcon] = useState(false);
  const handleSearchClick = (id) => {
    navigate(`/movie/${id}`);
    console.log(id);
    setPass(id);
  };

  return (
    <div>
      <div className="row-box">
        <Navbar
          id="NavBar"
          variant={theme === "dark" ? "dark" : "light "}
          style={{
            color: "black",
            backgroundColor: theme === "dark" ? "#0F1115" : "white",
            padding: "15px",
            width: "100%",
          }}
        >
          <div className="LeftPart">
            <img
              src="../images/logo.png"
              style={{ width: "30px" }}
              alt="logo"
              className="rounded-circle img-part"
            />
          </div>
          <div className="RightPart">
            <FormControl
              style={{
                width: "300px",
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                borderColor: theme === "dark" ? "black" : "#E0E0E0",
              }}
              type="search"
              placeholder="Search any movies or tv shows"
              className="ms-auto me-2 rounded-pill"
              aria-label="Search"
              id="searchForm"
              autoComplete="off"
              value={searchData}
              // { Open ? searchData : (check ? Pass : (passId ? passData : "") ) }
              //check ? (Open ? searchData : Pass ) : searchData
              // onKeyPress={(e) => e.code === "enter" && handleOpen}
              onChange={(e) => {
                setsearchData(e.target.value);
                console.log(searchData);
                // console.log(e);
              }}
              onClick={() => {
                handleOpen();
              }}
              list="listData"
            />
            <list
              id="listData"
              style={{
                color: "white",
                zIndex: "1",
                width: "300px",
                // border:"1px solid red",
                position: "absolute",
                top: "60px",
                right: "490px",
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                padding: "10px",
                cursor: "pointer",
                // display:"block"
                display: Open ? "unset" : "none",
              }}
              onClick={() => {
                setOpen(false);
                setcheck(true);
              }}
            >
              {ApiSearchfetch.slice(0, 5).map((res) => {
                return (
                  <option
                    onClick={() => {
                      handleSearchClick(res.id);
                      setPass(res.title);
                    }}
                  >
                    {res.title}
                  </option>
                );
              })}
            </list>

            {seacrhIcon ? null : (
              <Nav id="headerLinkPart">
                <Button className="linktextbtn" onClick={() => navigate("/")}>
                  <Nav.Link className="linktext">Movies</Nav.Link>
                </Button>
                <Button className="linktextbtn" onClick={() => navigate("/table1")}>
                  <Nav.Link className="linktext" href="#features">
                    TV Shows
                  </Nav.Link>
                </Button>
                <Button
                  className="linktextbtn"
                  onClick={() => navigate("/table")}
                >
                  <Nav.Link className="linktext" href="#pricing">
                    Watchlist
                  </Nav.Link>
                </Button>
                <Dropdown className="btnDropIcon">
                  <Dropdown.Toggle
                    variant="none"
                    id="dropdown-basic"
                    size="md"
                    style={{ color: theme === "dark" ? "white" : "black" }}
                  >
                    {/* <HiMenuAlt2 /> */} Menu
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Movies</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Tv Shows</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Watchlist</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <img
                  style={{ width: "30px" }}
                  src="../images/user.jpg"
                  alt="userimg"
                  className="head-img rounded-circle mx-4"
                />
                <Button
                  className="right-side-btn"
                  onClick={() =>
                    theme === "dark" ? setTheme("light") : setTheme("dark")
                  }
                >
                  {theme === "light" ? <DarkModeIcon /> : <LightModeIcon />}
                </Button>
                
              </Nav>
            )}
            <div className="mobile-search">
              {seacrhIcon ? (
               <div className="search-input-div">
                  <input
                  type="search"
                  className="search-input"
                  value={searchData}
                  onChange={(e) => {
                    setsearchData(e.target.value);
                    console.log(searchData);
                    // console.log(e);
                  }}
                  onClick={() => {
                    handleOpen();
                  }}
                  list="listData"
                />
                <list
              id="listData"
              style={{
                color: "white",
                zIndex: "1",
                width: "145px",
                fontSize: "10px",
                // border:"1px solid red",
                position: "absolute",
                top: "55px",
                right: "30px",
                color: theme === "dark" ? "white" : "black",
                backgroundColor: theme === "dark" ? "#19181F" : "#E0E0E0",
                padding: "10px",
                cursor: "pointer",
                // display:"block"
                display: Open ? "unset" : "none",
              }}
              onClick={() => {
                setOpen(false);
                setcheck(true);
              }}
            >
              {ApiSearchfetch.slice(0, 5).map((res) => {
                return (
                  <option
                    onClick={() => {
                      handleSearchClick(res.id);
                      setPass(res.title);
                    }}
                  >
                    {res.title}
                  </option>
                );
              })}
            </list>
               </div>
              ) : null}
              <span className="search-span">
                <FaSearch
                  className="search-Icon"
                  onClick={() => setseacrhIcon(!seacrhIcon)}
                />
              </span>
            </div>
          </div>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;
