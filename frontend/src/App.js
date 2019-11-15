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

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

const userStore = rootStore.userStore;

function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
          userStore.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/signin",
              state: { referrer: location }
            }}
          />
        )
      }
    />
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <PrivateRoute path="/workspaces">
            <Workspaces userStore={userStore}/>
          </PrivateRoute>
          <Route path="/signin">
            <Signin userStore={userStore} />
          </Route>
          <Route path="/signup">
            <Signup userStore={userStore} />
          </Route>
          <PrivateRoute path="/workspace">
            <Workspace />
          </PrivateRoute>
          <Route path="/">
            <Home userStore={userStore}/>
          </Route>
        </Switch>
      </Router>
    </ThemeProvider>
  );
}

export default App;
