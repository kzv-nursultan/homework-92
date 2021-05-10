import React from 'react';
import {NavLink} from "react-router-dom";
import {makeStyles} from "@material-ui/core/styles";

const useStyle = makeStyles({
  links: {
    color: 'white',
    textDecoration: 'none',
    textTransform: 'uppercase'
  }
})

const ToolBar = () => {
  const classes = useStyle();
  return (
    <>
      <NavLink to='/login' className={classes.links}> <strong> Sign in </strong></NavLink>
      <NavLink to='/register' className={classes.links}> <strong> Sign up </strong></NavLink>
    </>
  );
};

export default ToolBar;