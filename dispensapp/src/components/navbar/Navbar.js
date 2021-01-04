import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Button, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  appBar: {
    height: '8.5vh',
  },
  button: {

  }
}));

const Navbar = (props) => {
  const classes = useStyles();
  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        {props.loggedIn && (
          <IconButton
            onClick={props.toggleDrawer(true)}
            edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
        )}
        <Typography variant="h6" className={classes.title}>
          DispensApp
        </Typography>
        {props.loggedIn && (
          <Button color="inherit" size="large" className={classes.button} onClick={() => props.handleLogIn(false)}>
            <Typography variant="button">
              Logout
            </Typography>
          </Button>
        )}
        {!props.loggedIn && (
          <div>
            <Link href="#signup" color="inherit" underline="none">
              <Button color="inherit" size="large" className={classes.button}>
                <Typography variant="button">
                  Signup
                </Typography>
              </Button>
            </Link>
            <Link href="#login" color="inherit" underline="none">
              <Button color="inherit" size="large" className={classes.button}>
                <Typography variant="button">
                  Login
                </Typography>
              </Button>
            </Link>
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;