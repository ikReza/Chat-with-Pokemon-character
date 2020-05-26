import React, { useState, useEffect } from "react";
import queryString from "query-string";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Avatar,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyle = makeStyles(() => ({
  card: {
    width: "90%",
    height: "400px",
    padding: "2%",
    background: "rgba(0, 0, 0, 0.7)",
    color: "#fff",
    marginTop: "10%",
    boxSizing: "border-box",
  },
}));

const Room = ({ location, history }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const classes = useStyle();

  useEffect(() => {
    const { name } = queryString.parse(location.search);

    setName(name);
  }, [location.search]);

  const onSubmit = (e) => {
    e.preventDefault();

    history.push(`/chat?name=${name}&room=${room}`);
  };

  return (
    <Grid container justify="center" spacing={1}>
      <Grid item sm={4}>
        <Card className={classes.card}>
          <form onSubmit={onSubmit}>
            <CardContent align="center">
              <Typography
                variant="h4"
                style={{ color: "white", marginTop: "5%" }}
              >
                Room
              </Typography>
              <Typography
                variant="subtitle2"
                color="secondary"
                style={{ marginTop: "3%" }}
              >
                Hello, {<strong>{name.toUpperCase()}</strong>}! Please select
                any type
              </Typography>
            </CardContent>
            <CardContent align="center" style={{ marginTop: "4%" }}>
              <Button
                type="submit"
                onClick={() => {
                  setRoom("Fire");
                }}
              >
                <Avatar src="/assets/images/fire.jpg" alt="fire" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Grass")}>
                <Avatar src="/assets/images/grass.jpg" alt="grass" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Water")}>
                <Avatar src="/assets/images/water.jpg" alt="water" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Electric")}>
                <Avatar src="/assets/images/electric.jpg" alt="electric" />
              </Button>
            </CardContent>
            <CardContent align="center" style={{ marginTop: "4%" }}>
              <Button type="submit" onClick={() => setRoom("Dragon")}>
                <Avatar src="/assets/images/dragon.jpg" alt="dragon" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Fighting")}>
                <Avatar src="/assets/images/fighting.jpg" alt="fighting" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Dark")}>
                <Avatar src="/assets/images/dark.jpg" alt="dark" />
              </Button>
              <Button type="submit" onClick={() => setRoom("Fairy")}>
                <Avatar src="/assets/images/fairy.jpg" alt="fairy" />
              </Button>
            </CardContent>
          </form>
        </Card>
      </Grid>
    </Grid>
  );
};

export default Room;
