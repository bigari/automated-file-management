import React from "react";
import { Box, Typography, TextField, Container, Paper, Modal, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { makeStyles } from "@material-ui/core/styles";
  
const useStyles = makeStyles(theme => ({
  modal: {
    padding: "20px",
    background: "white",
    width: "500px",
    border: "none",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignContent: "flex-end"
  },
  member: {
    padding: "10px"
  },
  header: {
    paddingTop: "10px",
    paddingBottom: "10px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  }
}));

export default observer((props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const store = props.rootStore.memberStore;
  const [error, setError] = React.useState('')

  const openModal = function() {
    setOpen(true);
  };
  const closeModal = function() {
    setOpen(false);
  };

  const addMember = function() {
    store.addMember(store.eid, username)
  }

  return (
    <Container maxWidth="md">
      <Box className={classes.header}>
        <Typography variant="h5">
          Members
        </Typography>        
        <Button variant="contained" color="primary" onClick={openModal}>
          Add a member
        </Button>
      </Box>
      <Paper>
        <Box>
          {
            store.members.map(member => {
              return (
                <div key={member.id} className={classes.member}>
                  <div>{member.email}</div>
                  <div>{member.username}</div>
                  <div>{new Date(member.createdAt).toLocaleString()}</div>
                </div>
              );
            })
          }
        </Box>
      </Paper>

      <Modal open={open} onClose={closeModal}>
        <Box className={classes.modal}>
          <Box className={classes.form}>
            <Typography variant="h5">
              Add a member
            </Typography>
            <TextField
              fullWidth={true}
              value={username ? username : ''} 
              onChange={event => setUsername(event.target.value)}
              id="add"
              label="Username"
              multiline
              margin="normal"
              helperText={store.error}
              error={Boolean(store.error)}
            />

            <Button variant="contained" 
            color="primary" 
            disableElevation
            onClick={addMember}>Add</Button>
            
          </Box>
        </Box>
      </Modal>
      
    </Container>
  );
});
