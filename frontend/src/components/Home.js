import React from "react";
import fileflow from "../fileflow.png";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar
        position="static"
        style={{
          background: "#282c34",
          boxShadow: "none",
          color: "white",
          minHeight: "10vh"
        }}
      >
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            File Flow
          </Typography>
          <Link to="/signin" style={{ decoration: "#none", color: "white" }}>
            <Button color="inherit">Signin</Button>
          </Link>
          <Link to="/signup" style={{ decoration: "#none", color: "white" }}>
            <Button color="inherit">Signup</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <div className="App">
        <header className="App-header">
          <img src={fileflow} className="App-logo" alt="logo" />
          <p>Make your files flow to one place</p>
        </header>
      </div>
    </div>
  );
};

export default Home;
