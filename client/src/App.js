import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Chat from "./components/chat/Chat";
import Room from "./components/room/Room";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/chat" component={Chat} />
      <Route path="/room" component={Room} />
    </Router>
  );
}

export default App;
