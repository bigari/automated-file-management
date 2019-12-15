import React, { useState } from "react";
//import { makeStyles } from "@material-ui/core/styles";
import { Box, Container, IconButton, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { Lock, LockOpen } from "@material-ui/icons/";

// const useStyles = makeStyles(theme => ({
//   buttons: {
//     border: "none",
//     background: "none",
//     cursor: "pointer",
//     padding: "0px"
//   }
// }));

const Info = observer(props => {
  //const classes = useStyles();
  const event = props.event;
  const [isDisplayable, setIsDisplayable] = useState(false);
  return (
    <Container maxWidth="md">
      <Box>
        <Typography variant="h4"><p>{event.name}</p>
        </Typography>
        <Typography variant="subtitle1">
          <p>From {new Date(event.startAt).toLocaleString()}</p>
          <p>To {new Date(event.endAt).toLocaleString()}</p>
        </Typography>

        <Box display="flex" alignItems="center">
          <Box mr={4}>
            <Typography variant="h2">
              {isDisplayable ? <p>{event.accessCode}</p> : <p>- - - - - -</p>}
            </Typography>
          </Box>
          <Box>
            <IconButton
              color="primary"
              onClick={() => setIsDisplayable(!isDisplayable)}
            >
              {isDisplayable ? (
                <Lock fontSize="large" />
              ) : (
                <LockOpen fontSize="large" />
              )}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Container>
  );
});

export default Info;
