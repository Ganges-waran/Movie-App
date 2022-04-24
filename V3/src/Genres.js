import React from "react";
import "./App.css";
import { Nav, Navbar } from "react-bootstrap";
import './css/Genres.css';

function Genres({ theme, genre, languages }) {
  return (
    <div
      style={{ backgroundColor: theme === "dark" ? "#0F1115" : "white" }}
      id="SideBox"
    >
      <Navbar id='sideFirst'
        variant={theme === "dark" ? "dark" : "light"}
      >
        <Nav className="d-flex  flex-column">
          <h2 style={{ color: theme === "dark" ? "white" : "black", marginTop:'8px', fontSize:'16px' }} id="sideFirstHead">Genre</h2>
          {genre.map((g) => {
            return <Nav.Link id="sideFirstP">{g.name}</Nav.Link>;
          })}
        </Nav>
      </Navbar>

      <Navbar id='sideFirst'
        variant={theme === "dark" ? "dark" : "light"}
      >
        <Nav className="d-flex flex-column">
          <h2 style={{ color: theme === "dark" ? "white" : "black", marginTop:'8px', fontSize:'16px' }} id="sideFirstHead">Language</h2>
          {languages.map((Language) => {
            return <Nav.Link id="sideFirstP">{Language}</Nav.Link>;
          })}
        </Nav>
      </Navbar>
    </div>
  );
}

export default Genres;
