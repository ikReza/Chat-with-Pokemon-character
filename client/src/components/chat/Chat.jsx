import React, { useState, useEffect } from "react";
import queryString from "query-string";
import "./Chat.css";
import io from "socket.io-client";
import { AppBar, Toolbar, Typography, Grid, Button } from "@material-ui/core";
import LeftPanel from "./leftPanel/LeftPanel";
import CenterPanel from "./centerPanel/CenterPanel";
let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const ENDPOINT = "https://my-pokemon-chat.herokuapp.com/";

  useEffect(() => {
    const { name, room } = queryString.parse(location.search);

    socket = io(ENDPOINT);
    console.log(socket);

    setName(name);
    setRoom(room);

    socket.emit("join", name, () => {});

    return () => {
      socket.emit("disconnect");

      socket.off();
    };
  }, [ENDPOINT, location.search]);

  useEffect(() => {
    socket.on("chat", (data) => {
      setMessages([...messages, [data[0], data[1]]]);
    });
    return () => {};
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();

    const data = [message, name];
    if (message) {
      socket.emit("chat", data, () => setMessage(""));
    }
  };

  let bgColor;
  switch (room) {
    case "Fire":
      bgColor = "#de4204";
      break;
    case "Grass":
      bgColor = "#5b9103";
      break;
    case "Electric":
      bgColor = "#edda05";
      break;
    case "Water":
      bgColor = "#03389c";
      break;
    case "Dragon":
      bgColor = "#470191";
      break;
    case "Fighting":
      bgColor = "#913101";
      break;
    case "Dark":
      bgColor = "#1a1818";
      break;
    case "Fairy":
      bgColor = "#9c0247";
      break;
    default:
      bgColor = "#37474f";
  }

  return (
    <div>
      <Grid container direction="column">
        <Grid item>
          <AppBar position="static" style={{ backgroundColor: bgColor }}>
            <Toolbar>
              <img
                src="assets/images/pokeball.png"
                alt="pokeball"
                style={{ height: "30px", width: "30px", padding: "1%" }}
              />
              <Typography variant="h6" className="chatTypo">
                {room}
              </Typography>
              <Typography variant="h6" className="nameBtn">
                Welcome {name.charAt(0).toUpperCase() + name.slice(1)}!
              </Typography>
              <Button color="inherit" className="homeBtn" href="/">
                Home
              </Button>
            </Toolbar>
          </AppBar>
        </Grid>
        <Grid item container spacing={1}>
          <Grid item xs={12} sm={4}>
            <LeftPanel />
          </Grid>
          <Grid item xs={12} sm={8}>
            <CenterPanel
              name={name}
              message={message}
              messages={messages}
              setMessage={setMessage}
              sendMessage={sendMessage}
            />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Chat;
