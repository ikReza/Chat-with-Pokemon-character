import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link } from "react-router-dom";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import axios from "axios";
import {
  Grid,
  Card,
  CardHeader,
  Button,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  card: {
    width: "90%",
    height: "550px",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    marginTop: "2%",
  },
  text: {
    marginTop: "7px",
    width: "90%",
    backgroundColor: "white",
  },
  btn: {
    marginTop: "4%",
    width: "90%",
  },
}));

const Register = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState(new Date());
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const classes = useStyle();

  const onSubmit = (e) => {
    e.preventDefault();

    const info = { username, password, email, birthday };
    console.log(info);

    axios
      .post("https://my-pokemon-chat.herokuapp.com/register", info)
      .then((res) => {
        setIsSubmitted(true);
        setIsError(false);
        console.log(res.data);
        props.history.push("/login");
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
    <Grid container justify="center">
      <Grid item sx={12} sm={4}>
        <Card className={classes.card} align="center">
          <CardHeader
            title="Register"
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
              placeholder="4+ characters"
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
              placeholder="5+ characters"
              required
              type="password"
              variant="filled"
              className={classes.text}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <TextValidator
              value={email}
              size="small"
              onChange={(e) => setEmail(e.target.value)}
              label="Email"
              type="email"
              variant="filled"
              className={classes.text}
              validators={["required", "isEmail"]}
              errorMessages={["this field is required", "email is not valid"]}
            />
            <CardContent margintop="25px">
              <Typography variant="h6" style={{ color: "white" }}>
                Date of Birth
              </Typography>
              <DatePicker
                selected={birthday}
                onChange={(date) => setBirthday(date)}
              />
            </CardContent>

            <FormControl component="fieldset">
              <FormLabel component="legend" style={{ color: "white" }}>
                Gender
              </FormLabel>
              <RadioGroup
                row
                aria-label="position"
                name="position"
                defaultValue="top"
              >
                <FormControlLabel
                  style={{ color: "white" }}
                  value="female"
                  control={<Radio color="primary" />}
                  label="Female"
                />
                <FormControlLabel
                  style={{ color: "white" }}
                  value="male"
                  control={<Radio color="primary" />}
                  label="Male"
                />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.btn}
            >
              Submit
            </Button>
          </ValidatorForm>
          <p style={{ color: "whitesmoke" }}>
            Already have an account?{" "}
            <Link style={{ color: "#e8c00c" }} to="/login">
              Login
            </Link>
          </p>
          {isSubmitted && (
            <p style={{ color: "green" }}>
              Registration Successful! Please{" "}
              <Button color="primary" href="/login">
                login
              </Button>{" "}
              to continue
            </p>
          )}
          {isError && <p style={{ color: "red" }}>{errMsg}</p>}
        </Card>
      </Grid>
    </Grid>
  );
};

export default Register;
