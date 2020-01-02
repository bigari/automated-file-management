import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
//import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InputRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// import { Switch, Route, useRouteMatch } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "white"
  },
  margin: {
    marginLeft: theme.spacing(1)
  }
}));

const JoinEvent = observer(props => {
  //const rootStore = props.rootStore;
  // const eventStore = rootStore.eventStore;
  // const userStore = rootStore.userStore;
  const classes = useStyles();
  const [accessCode, setAccessCode] = useState("");

  return (
    <div>
      <form
        noValidate
        onSubmit={e => {
          e.preventDefault();
          console.log("join");
        }}
      >
        <TextField
          className={classes.container}
          variant="filled"
          margin="normal"
          required
          fullWidth
          label="Access Code"
          name="access-code"
          value={accessCode}
          id="access-code"
          onChange={e => setAccessCode(e.target.value)}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  variant="contained"
                  color="primary"
                  aria-label="Join"
                  onClick={e => {}}
                  startIcon={<InputRounded/>}
                >
                  Join
                </Button>
              </InputAdornment>
            )
          }}
        />
      </form>
    </div>
  );
});

export default JoinEvent;
