const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");

//socket setup
const app = express();
const server = http.createServer(app);
const io = socketIo(server);

mongoose
  .connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log(`DB connection error: ${err.message}`);
  });

let user = [];

io.on("connection", (socket) => {
  console.log("Connection successful!");

  socket.on("join", (name) => {
    socket.broadcast.emit("chat", [`${name} has joined!`, "admin"]);
    user.push([name, socket.id]);
  });

  socket.on("chat", (data, callback) => {
    io.emit("chat", data);

    callback();
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected`);
    for (let i = 0; i < user.length; i++) {
      if (user[i][1] === socket.id) {
        socket.broadcast.emit("chat", [`${user[i][0]} has left!`, "admin"]);
        break;
      }
    }
  });
});

const userRoute = require("./routes/user-route");

app.use(cors());
app.use(express.json());
app.use("/user", userRoute);
app.use("/message", require("./routes/message-route"));

const port = process.env.PORT || 4001;

server.listen(port, () => {
  console.log(`Listening on port no ${port}`);
});
