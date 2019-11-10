import React from "react";
import fileflow from "../icons/fileflow.png";
import Copyright from "./Copyright";
import NavBar from "./NavBar";

const Home = (props) => {
  return (
    <div>
      <NavBar userStore={props.userStore} />
      <div className="App">
        <header className="App-header">
          <img src={fileflow} className="App-logo" alt="logo" />
          <p>Make your files flow to one place</p>
        </header>
      </div>
      <Copyright />
    </div>
  );
};

export default Home;
