import React from 'react';
import { observer } from 'mobx-react';
import WorkspaceCard from './WorkspaceCard.js';
import AddWorkspaceCard from './AddWorkspaceCard.js';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
}));

const WorkspaceList = observer(props => {
    const classes = useStyles();
    const workspaces = props.workspaces;
    
    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item>
                <AddWorkspaceCard />
            </Grid>
            {workspaces.map(workspace => (
                <Grid item key={workspace.id}>
                    <WorkspaceCard workspace={workspace} />
                </Grid>
            ))}
        </Grid>
    )
    
});

export default WorkspaceList;