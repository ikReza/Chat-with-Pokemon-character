import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import Body from "./Body";

const Home = () => {
  return (
    <div>
      <AppBar position="static" style={{ backgroundColor: "#37474f" }}>
        <Toolbar>
          <img
            src="assets/images/pokeball.png"
            alt="pokeball"
            style={{ height: "30px", width: "30px", padding: "1%" }}
          />

          <Typography
            variant="h6"
            className="homeTypo"
            style={{ color: "#e8c00c" }}
          >
            Pokémon Center
          </Typography>

          <Button color="primary" variant="contained" className="homeBtn1">
            <Link
              to="/login"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              {" "}
              Login
            </Link>
          </Button>

          <Button color="primary" variant="contained" className="homeBtn2">
            <Link
              to="/register"
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              {" "}
              Register
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Body />
    </div>
  );
};

export default Home;
