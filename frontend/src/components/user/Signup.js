import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Copyright from "../Copyright";
import useStyles from "./useStyles";
import { observer } from "mobx-react";
import { Redirect } from "react-router";

const Signup = observer(props => {
  const classes = useStyles();
  const userStore = props.userStore;
  const usernameError = userStore.signupErrors.username;
  const emailError = userStore.signupErrors.email;
  const passwordError = userStore.signupErrors.password;
  const internalError = userStore.signupErrors.internal;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  if (userStore.isLoggedIn) {
    return <Redirect to="/workspaces" />;
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={e => {
            if(email && password && email) {
              userStore.signupErrors = {
                password: '',
                username: '',
                email: '',
                internal: ''  
              }
              userStore.signup(username, email, password);
            }
            e.preventDefault();
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            error={usernameError? true:false}
            helperText={usernameError}
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            onChange={e => setUsername(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={emailError? true:false}
            helperText={emailError}
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={e => setEmail(e.target.value)}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            error={passwordError? true:false}
            helperText={passwordError}
            name="password"
            label="Password"
            type="password"
            onChange={e => setPassword(e.target.value)}
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign up
          </Button>
          <div>{internalError}</div>
          <Box mt={2}>
            <Link href="/signin" variant="body2">
              {"Already have an account? Sign in"}
            </Link>
          </Box>
        </form>
      </div>
      <Box mt={8}>
        <Copyright dark={false}/>
      </Box>
    </Container>
  );
});

export default Signup;
