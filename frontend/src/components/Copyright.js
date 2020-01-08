import React from 'react'
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

const Copyright = (props) => {
    const dark=props.dark;
    return (
      <Typography variant="body2" align="center" className={dark?"bg-dark":"no-class"}>
        {'Copyright © '}
        <Link color="inherit" href="/">
          Interconf
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }


export default Copyright