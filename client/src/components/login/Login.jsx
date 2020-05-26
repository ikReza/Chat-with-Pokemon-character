import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import { Grid, Card, CardHeader, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  card: {
    width: "90%",
    height: "420px",
    background: "rgba(68, 61, 61, 0.7)",
    color: "#fff",
    marginTop: "20%",
    boxSizing: "border-box",
  },
  text: {
    marginTop: "20px",
    width: "90%",
    backgroundColor: "white",
  },
  btn: {
    marginTop: "10%",
    width: "90%",
  },
}));

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const isEnabled = username.length > 3 && password.length > 4;
  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();

    const info = { username, password };
    console.log(info);

    axios
      .post("https://my-pokemon-chat.herokuapp.com/login", info)
      .then((res) => {
        setIsSubmitted(true);
        setIsError(false);
        console.log(res.data);
        props.history.push(`/room?name=${username}`);
      })
      .catch((err) => {
        setIsSubmitted(false);
        setIsError(true);
        console.log({ message: err.response.data });
        setErrMsg(err.response.data);
      });

    setPassword("");
  };

  return (
    <Grid container direction="row" justify="center" spacing={1}>
      <Grid item xs={12} sm={4}>
        <Card className={classes.card} align="center">
          <CardHeader
            title="Sign In"
            style={{ color: "white", marginTop: "5%" }}
          />
          <ValidatorForm
            onSubmit={onSubmit}
            onError={(errors) => console.log(errors)}
          >
            <TextValidator
              value={username}
              size="small"
              onChange={(e) => setUsername(e.target.value)}
              label="Username"
              required
              variant="filled"
              className={classes.text}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              value={password}
              size="small"
              onChange={(e) => setPassword(e.target.value)}
              label="Password"
              required
              type="password"
              variant="filled"
              className={classes.text}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={!isEnabled}
              className={classes.btn}
            >
              Enter
            </Button>
          </ValidatorForm>
          <p style={{ color: "whitesmoke" }}>
            Don't have an account?{" "}
            <Link style={{ color: "#e8c00c" }} to="/register">
              Register
            </Link>
          </p>
          {isSubmitted && (
            <p style={{ color: "green" }}>
              Welcome {username}! You can enter{" "}
              <Link to={`/room?name=${username}`}>
                <Button color="primary">Room</Button>
              </Link>{" "}
              to continue
            </p>
          )}
          {isError && <p style={{ color: "red" }}>{errMsg}</p>}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Login;
