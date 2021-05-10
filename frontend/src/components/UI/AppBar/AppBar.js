import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import {NavLink} from "react-router-dom";
import {Grid} from "@material-ui/core";
import {useSelector} from "react-redux";
import ToolBar from "../ToolBar/ToolBar";
import LoggedInUser from "../LoggedInUser/LoggedInUser";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginBottom:'20px'
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor:'pointer'
  },
  navs: {
    display:'flex',
    maxWidth: 190,
    flexGrow: 1,
    justifyContent: 'space-around',
    alignItems:'center',
  },
  links: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
}));

const ButtonAppBar = () => {
  const classes = useStyles();
  const user = useSelector(state=>state?.activeUsers.loginUser);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <NavLink to='/' className={classes.links}> <strong> MusicApi </strong></NavLink>
          </Typography>
          <Grid item className={classes.navs}>
            {user._id ? (<LoggedInUser displayName={user.displayName} avatar={user.avatar}/>) : (<ToolBar/>)}
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default ButtonAppBar;