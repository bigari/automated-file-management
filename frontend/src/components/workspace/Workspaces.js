import React from 'react';
import WorkspaceList from './WorkspaceList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import NavBar from '../NavBar';

const useStyles = makeStyles(theme => ({
    container: {
      marginTop: '20px',
      marginBottom: '20px'
    }
}));
  
const Workspaces = (props) => {
  const userStore = props.userStore;
  const workspaces = [
    {id: 1, name: 'name 1'}, 
    {id: 2, name: 'name 2'}, 
    {id: 3, name: 'name 2'}, 
    {id: 4, name: 'name 2'}, 
    {id: 5, name: 'name 2'}, 
  ];
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
  )
};

export default Workspaces;