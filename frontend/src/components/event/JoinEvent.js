import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { observer } from "mobx-react";
import InputAdornment from "@material-ui/core/InputAdornment";
import { InputRounded } from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: "white"
  },
  margin: {
    marginLeft: theme.spacing(1)
  }
}));

const JoinEvent = observer(props => {
  const userStore = props.userStore;
  const classes = useStyles();
  const [accessCode, setAccessCode] = useState("");
  const history = useHistory();

  const join = () => {
    userStore.join(accessCode, {
      onSuccess: () => {
        const event = userStore.member.event;
        history.push(`/events/${event.id}/info`);
      },
      onError: () => {
        console.log("error joining");
      }
    });
  };

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
                  disabled={userStore.joining}
                  onClick={join}
                  startIcon={<InputRounded />}
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
