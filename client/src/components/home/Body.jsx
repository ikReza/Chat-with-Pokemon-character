import React, { useState } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  MobileStepper,
  Paper,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";

import tutorialSteps from "./PokemonData";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: "100%",
    flexGrow: 1,
  },
  header1: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 75,
    backgroundColor: "#262e28",
  },
  header2: {
    display: "flex",
    alignItems: "center",
    height: 50,
    justifyContent: "center",
    backgroundColor: "#37474f",
  },
  img: {
    height: 350,
    display: "block",
    maxWidth: "100%",
    overflow: "hidden",
    width: "100%",
  },
}));

const Body = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = tutorialSteps.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Grid container direction="row" justify="center" spacing={1}>
      <Grid item xs={12} sm={4}>
        <div className={classes.root}>
          <Paper square elevation={3} className={classes.header1}>
            <Typography variant="h6" style={{ color: "#ebeff5" }}>
              Welcome to the world of Pokémon
            </Typography>
          </Paper>
          <Paper square elevation={0} className={classes.header2}>
            <Typography variant="h5" style={{ color: "#ebeff5" }}>
              {tutorialSteps[activeStep].label}
            </Typography>
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {tutorialSteps.map((step, index) => (
              <div key={step.id}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <img
                    className={classes.img}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            steps={maxSteps}
            position="static"
            variant="text"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </div>
      </Grid>
    </Grid>
  );
};

export default Body;
