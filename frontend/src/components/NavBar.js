import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link, useHistory } from "react-router-dom";
import { observer } from "mobx-react";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  username: {
    color: 'white',
  },
}));

const NavBar = observer((props) => {
    const classes = useStyles();
    const userStore = props.userStore;
    const history = useHistory();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
      event.stopPropagation();
      event.nativeEvent.stopImmediatePropagation()
      setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
      setAnchorEl(null);
    };

    const logout = () => {
      setAnchorEl(null);
      userStore.logout().then(() => {
        history.push('/')
      });
    }

    const navigateToAccount = () => {
      setAnchorEl(null);
      console.log('My account')
    }

    const signinBtn = (
      <Link key="signin" to="/signin" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Signin</Button>
      </Link>
    )

    const signupBtn = (
      <Link key="signup" to="/signup" style={{ textDecoration: "none", color: "white" }}>
          <Button color="inherit">Signup</Button>
      </Link>
    )

    let navbarItems = [signinBtn, signupBtn];

    if(userStore.isLoggedIn) {
      navbarItems = []

      navbarItems = [(
        <Button key="btn" aria-controls="menu" aria-haspopup="true" 
        onClick={handleClick} 
        className={classes.username}>
          {userStore.user.username}
        </Button>),
        (<Menu
            key="menu"
            id="menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={navigateToAccount}>My account</MenuItem>
            <MenuItem onClick={logout}>Logout</MenuItem>
          </Menu>
        )
      ];
      
    }

    

    return (
      <div className={classes.root}>
        <AppBar
          position="static"
          style={{
            background: "#282c34",
            boxShadow: "none",
            color: "white",
            minHeight: "5vh"
          }}
        >
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              File Flow
            </Typography>

            {navbarItems}
          
          </Toolbar>
        </AppBar>
      </div>
    );
  }
);

export default NavBar;
