import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NotificationManager} from "react-notifications";
import {Grid, makeStyles,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import FormInput from "../FormInput/FormInput";
import {useSelector} from "react-redux";

const useStyles = makeStyles({
  formBlock: {
    margin: '15px auto 10px'
  },
  sendBtn: {
    margin: '0 10px'
  }
});

const InputBlock = ({ws, author}) => {
  const classes = useStyles();
  const users = useSelector(state => state?.activeUsers.onlineUsers);
  const [message, setMessage] = useState({
    author: author,
    body:''
  });
  const [personalMessage, setPersonalMessage] = useState({
    sender: author,
    body: '',
    recipient:'',
  });

  const onChangeHandler = e => {
    const {name, value} = e.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const personalOnChangeHandler = (e) => {
    const {name, value} = e.target;
    setPersonalMessage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = () => {
    ws.current.send(JSON.stringify({
      type: 'NEW_MESSAGE',
      value: message,
    }));
    NotificationManager.success('Message sent');
    setMessage(prevState => ({
      ...prevState,
      body: ''
    }));
  };

  const clickHandler = () => {
    ws.current.send(JSON.stringify({
      type: 'PERSONAL_MESSAGE',
      value: personalMessage,
    }));
    NotificationManager.success('Message sent');
    setPersonalMessage(prevState => ({
      ...prevState,
      body:'',
      recipient: '',
    }))
  };

  return (
    <Grid container item
          className={classes.formBlock}
          justify='center'
          alignItems='center'>

      <FormInput
        name = 'recipient'
        label='Select User for personal Message'
        onChange={personalOnChangeHandler}
        select={true}
        options={users}
        value={personalMessage.recipient}
      />

      <FormInput
      name='body'
      label='Message'
      onChange={!personalMessage.recipient ? onChangeHandler : personalOnChangeHandler}
      required={true}
      fullWidth
      value={!personalMessage.recipient ? message.body : personalMessage.body}
      newStyles={{margin: 0, textAlign: 'center'}}
      />


      {personalMessage.recipient ?
        <Button
          variant='contained'
          onClick={clickHandler}
          color='secondary'
          className={classes.sendBtn}
          endIcon={<SendIcon/>}>
          Send
        </Button> :
        <Button
          variant='contained'
          onClick={onSubmitHandler}
          color='primary'
          className={classes.sendBtn}
          endIcon={<SendIcon/>}>
          Send
        </Button>}


    </Grid>
  );
};

InputBlock.propTypes = {
  author: PropTypes.string.isRequired,
}

export default InputBlock;