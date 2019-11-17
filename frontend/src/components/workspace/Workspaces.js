import React, { useEffect } from "react";
import WorkspaceList from "./WorkspaceList";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import NavBar from "../NavBar";
import { observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  container: {
    marginTop: "20px",
    marginBottom: "20px"
  }
}));

const Workspaces = observer(props => {
  const userStore = props.userStore;
  const workspaceStore = props.workspaceStore;

  useEffect(() => {
    async function fetchWorkspaces() {
      await workspaceStore.fetchAll();
      // console.log(workspaceStore.list);
    }
    fetchWorkspaces();
  }, [workspaceStore]);

  const workspaces = workspaceStore.list;
  const classes = useStyles();

  return (
    <div>
      <NavBar userStore={userStore} />
      <Container className="container">
        <Grid container>
          <Typography variant="h6" className={classes.header}>
            Workspaces
          </Typography>
          <WorkspaceList workspaces={workspaces} />
        </Grid>
      </Container>
    </div>
  );
});

export default Workspaces;
