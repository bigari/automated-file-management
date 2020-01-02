import React from "react";
import conference from "../icons/conference.png";
import NavBar from "./NavBar";
import JoinEvent from "./event/JoinEvent";

const Home = props => {
  return (
    <div>
      <NavBar userStore={props.userStore} />
      <div className="App">
        <header className="App-header">
          <div>
            <img src={conference} className="App-logo" alt="logo" />
            <JoinEvent/>
          </div>
        </header>
      </div>
    </div>
  );
};

export default Home;
