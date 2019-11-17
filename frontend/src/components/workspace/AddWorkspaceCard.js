import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import icon from "../../icons/add-24px.svg";


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
        },
        display: 'flex',
        'flex-direction': 'column',
        'align-items': 'center',
        'justify-content': 'center'
    },
    title: {
        'font-size': '20px',
        'line-height': '5px',
    },
    media: {
        height: '50px',
        width: '50px'
    }
});

const AddWorkspaceCard = function(props) {
    const classes = useStyles();

    const addWorkspace = () => {
        console.log('click')
    }

    return (
        <Card className={classes.card} onClick={() => {addWorkspace()}}>
            <CardMedia 
                className={classes.media}
                image={icon}
                title="Add a workspace"
            />
            <CardContent>
                <Typography className={classes.title}>
                    Add a workspace
                </Typography>
            </CardContent>
        </Card>
    )
}


export default AddWorkspaceCard;