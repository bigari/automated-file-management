import React from "react";
import "./App.css";
import Home from "./components/Home";
import Signin from "./components/user/Signin";
import Signup from "./components/user/Signup";
import Workspaces from './components/workspace/Workspaces'
import { createMuiTheme } from "@material-ui/core/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import { ThemeProvider } from "@material-ui/core/styles";
import Workspace from "./components/workspace/Workspace";
import rootStore from "./repositories/mobx/RootStore";
import { observer } from 'mobx-react';


import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: deepPurple
  }
});

const userStore = rootStore.userStore;
const workspaceStore = rootStore.workspaceStore;

const PrivateRoute = observer(({ children, ...rest }) => {
  const render = ({location}) => {
    if (userStore.isLoggedIn){
      return (children)
    }

    else{ 
      return (
        <Redirect
          to={{
            pathname: "/signin",
            state: { referrer: location }
          }}
        />
      )
    }
  }

  if (userStore.isPending) {
    return (<div>Loading...</div>)
  }
  else{
    return (
      <Route
        {...rest}
        render={render}
      />
    );
  }
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <PrivateRoute path="/workspaces">
            <Workspaces userStore={userStore} workspaceStore={workspaceStore}/>
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
