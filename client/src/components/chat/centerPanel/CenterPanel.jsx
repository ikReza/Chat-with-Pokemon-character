import React from "react";
import "./CenterPanel.css";
import { Paper, TextField, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Send } from "@material-ui/icons";

const useStyle = makeStyles(() => ({
  root1: {
    minHeight: "40px",
    border: "1px solid whitesmoke",
    //backgroundColor: "rgba(0, 0, 0, 0.2)",
    color: "#fff",
    borderRadius: "5px",
    padding: "1%",
    flexWrap: "wrap",
    backgroundImage: `url(${"assets/images/rebgchat.png"})`,
  },
  root2: {
    height: "440px",
    padding: "1%",
    overflow: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    color: "#fff",
  },
  text: {
    marginTop: "10px",
    width: "85%",
  },
}));

const CenterPanel = ({ name, message, messages, setMessage, sendMessage }) => {
  const classes = useStyle();

  return (
    <div>
      <Paper className={classes.root2}>
        {messages.map((msg, i) =>
          msg[1] === "admin" ? (
            <p key={i} style={{ textAlign: "center", color: "#e8c00c" }}>
              {msg[0]}
            </p>
          ) : name === msg[1] ? (
            <p key={i} style={{ textAlign: "right" }}>
              {msg[0]}{" "}
              <strong style={{ color: " #fcfc03" }}>{`:${msg[1]}`}</strong>
            </p>
          ) : (
            <p key={i}>
              <strong style={{ color: "red" }}>{`${msg[1]}:`}</strong> {msg[0]}
            </p>
          )
        )}
      </Paper>
      <Paper className={classes.root1}>
        <TextField
          className={classes.text}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => (e.key === "Enter" ? sendMessage(e) : null)}
          placeholder="type your message. .."
        />
        <IconButton
          onClick={(e) => sendMessage(e)}
          style={{ paddingTop: "2.5%" }}
        >
          <Send />
        </IconButton>
      </Paper>
    </div>
  );
};

export default CenterPanel;
