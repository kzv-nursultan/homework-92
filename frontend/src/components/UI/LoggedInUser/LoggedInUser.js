import React from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "@material-ui/core/Button";
import {Grid, Menu, MenuItem} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import {logOut} from "../../../store/actions/UsersActions";

const useStyle = makeStyles({
  header: {
    color: 'white',
    fontWeight:'bold'
  },
  avatar: {
    width: 30,
    height: 30,
    border: '1px solid white',
    borderRadius: '50%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  }
});

const LoggedInUser = ({displayName, avatar}) => {
  const classes = useStyle();
  const history = useHistory();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const userId = useSelector(state => state?.activeUsers.loginUser._id);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOutHandler = async () => {
    await dispatch(logOut(userId));
    history.push('/');
  };

  const image = {avatar}.avatar ? {avatar}.avatar : 'https://www.pngitem.com/pimgs/m/150-1503945_transparent-user-png-default-user-image-png-png.png';

  return (
    <>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        className={classes.header}
      >
        Hello, {displayName}
      </Button>
      <Grid item className={classes.avatar} style={{backgroundImage: "url('" + image + "')"}}/>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={logOutHandler}> Log Out </MenuItem>
      </Menu>
    </>
  );
};

export default LoggedInUser;