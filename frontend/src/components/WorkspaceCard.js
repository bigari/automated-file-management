import React from 'react';
import {
    makeStyles
} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    card: {
        minWidth: '100px',
        width: '250px',
        height: '200px',
        'padding-top': '20px',
        'padding-right': '20px',
        'padding-bottom': '12px',
        'padding-left': '20px',
        cursor: 'pointer',
        '&:hover': {
            background: '#E6E2E4'
        }
    },
    title: {
        'font-size': '20px',
        'line-height': '5px',
    }
});

const WorkspaceCard = function(props) {
    const classes = useStyles();
    const workspace = props.workspace;
    const open = () => {console.log(JSON.stringify(workspace))}

    return (
        <Card className={classes.card} onClick={open()}>
            <CardContent>
                <Typography className={classes.title}>
                    {workspace.title}
                </Typography>
            </CardContent>
        </Card>
    )
}


export default WorkspaceCard;