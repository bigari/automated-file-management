import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import CardMedia from "@material-ui/core/CardMedia";
import Add from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  hoverable: {
    cursor: "pointer",
    "&:hover": {
      background: "#DDFFDD"
    }
  },
  card: {
    minWidth: "100px",
    width: "250px",
    height: "200px",
    "padding-top": "20px",
    "padding-right": "20px",
    "padding-bottom": "12px",
    "padding-left": "20px",
    display: "flex",
    "flex-direction": "column",
    "align-items": "center",
    "justify-content": "center"
  },
  title: {
    "font-size": "20px",
    "line-height": "5px"
  },
  media: {
    height: "50px",
    width: "50px"
  }
}));

const AddWorkspaceCard = function(props) {
  const classes = useStyles();
  const workspaceStore = props.workspaceStore;
  const [isAdding, setIsAdding] = useState(false);
  const [workspaceName, setWorskspaceName] = useState("");

  const handleCancel = () => {
    setIsAdding(false);
  };

  const handleCreate = () => {
    setWorskspaceName("");
    workspaceStore.create(workspaceName);
    setIsAdding(false);
  };

  const addWorkspace = () => {
    console.log("click");
    setIsAdding(true);
  };

  return (
    <Grid item>
      {isAdding || workspaceStore.isCreating ? (
        <Card className={classes.card}>
          <div>
            <Box my={2}>
              <form>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Workspace Name"
                  name="name"
                  value={workspaceName}
                  onChange={e => setWorskspaceName(e.target.value)}
                  autoFocus
                />
              </form>
            </Box>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              flexWrap="wrap"
            >
              <Box mr="auto">
                <Button variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
              </Box>

              <Button
                variant="contained"
                color="primary"
                disabled={workspaceName.length === 0 || workspaceStore.isCreating}
                onClick={handleCreate}
                className={classes.button}
              >
                Create
              </Button>
            </Box>
          </div>
        </Card>
      ) : (
        <Card
          className={classes.card + " " + classes.hoverable}
          onClick={() => {
            addWorkspace();
          }}
        >
          <CardMedia title="Add a workspace">
            <Add fontSize="large" color="action" />
          </CardMedia>
        </Card>
      )}
    </Grid>
  );
};

export default AddWorkspaceCard;
