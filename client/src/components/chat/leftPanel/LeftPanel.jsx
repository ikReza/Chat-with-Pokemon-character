import React from "react";
import { Paper, Card, Avatar, Typography, IconButton } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Email } from "@material-ui/icons";

const useStyle = makeStyles(() => ({
  root: {
    background: "rgba(0, 0, 0, 0.5)",
    color: "#fff",
    boxSizing: "border-box",
  },
}));

const LeftPanel = () => {
  const classes = useStyle();

  return (
    <Paper align="center" className={classes.root}>
      <Typography gutterBottom style={{ paddingTop: "2%" }}>
        Contact with us if you've any problem
      </Typography>
      <Card
        align="center"
        className={classes.root}
        style={{ marginTop: "7%", marginBottom: "7%" }}
      >
        <Avatar
          src="/assets/images/nurseJoy.png"
          alt="Nurse Joy"
          style={{ height: "56px", width: "56px" }}
        />

        <Typography gutterBottom>Nurse Joy</Typography>
        <IconButton>
          <Email style={{ height: "30px", width: "30px" }} color="primary" />
        </IconButton>
      </Card>
      <Card align="center" className={classes.root}>
        <Avatar
          src="/assets/images/officerJenny.png"
          alt="Nurse Joy"
          style={{ height: "56px", width: "56px", background: "white" }}
        />

        <Typography gutterBottom>Officer Jenny</Typography>
        <IconButton>
          <Email style={{ height: "30px", width: "30px" }} color="primary" />
        </IconButton>
      </Card>
      <Card align="center" className={classes.root} style={{ marginTop: "7%" }}>
        <Avatar
          src="/assets/images/oak.png"
          alt="Professor Oak"
          style={{ height: "56px", width: "56px", background: "white" }}
        />

        <Typography gutterBottom>Professor Oak</Typography>
        <IconButton>
          <Email style={{ height: "30px", width: "30px" }} color="primary" />
        </IconButton>
      </Card>
    </Paper>
  );
};

export default LeftPanel;
