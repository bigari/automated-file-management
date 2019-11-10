import React from "react";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import Workspaces from './components/Workspaces'
import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { ThemeProvider } from "@material-ui/core/styles";
import Workspace from "./components/Workspace";
import rootStore from "./repositories/mobx/RootStore";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path="/workspaces">
            <Workspaces userStore={rootStore.userStore}/>
          </Route>
          <Route path="/signin">
            <Signin userStore={rootStore.userStore} />
          </Route>
          <Route path="/signup">
            <Signup userStore={rootStore.userStore} />
          </Route>
          <Route path="/workspace">
            <Workspace />
          </Route>
          <Route path="/">
            <Home userStore={rootStore.userStore}/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
