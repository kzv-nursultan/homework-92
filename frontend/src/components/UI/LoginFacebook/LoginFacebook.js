import React from 'react';
import FacebookLoginButton from 'react-facebook-login/dist/facebook-login-render-props';
import {Button} from "@material-ui/core";
import FacebookIcon from '@material-ui/icons/Facebook';
import {useDispatch} from "react-redux";
import {facebookLogin} from "../../../store/actions/UsersActions";

const LoginFacebook = () => {
  const dispatch = useDispatch();

  const callbackHandler = (response) => {
    if (response.id) {
      dispatch(facebookLogin(response));
    }
  };

  return (
    <FacebookLoginButton
      appId="1881289012046340"
      fields="name,email,picture"
      render={props=>(
        <Button
          variant='outlined'
          color='primary'
          onClick={props.onClick}
          startIcon={<FacebookIcon/>}>
          Sign up and Login with Facebook
        </Button>
      )}
      callback={response=>callbackHandler(response)}
    />
  );
};

export default LoginFacebook;