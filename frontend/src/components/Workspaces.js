import React from 'react';
import WorkspaceList from './WorkspaceList';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    header: {
      marginBottom: '20px'
    }
}));
  
const Workspaces = (props) => {
    
  const workspaces = [{id: 1, title: 'Title 1'}, 
    {id: 2, title: 'Title 2'}, 
    {id: 3, title: 'Title 2'}, 
    {id: 4, title: 'Title 2'}, 
    {id: 5, title: 'Title 2'}, 
  ];
  const classes = useStyles();
    
  return (
      <Container>
        <Grid container>
            <Typography variant="h6" className={classes.header}>
                Workspaces
            </Typography>
            <WorkspaceList workspaces={workspaces} />
        </Grid>
      </Container>
        
  )
};

export default Workspaces;