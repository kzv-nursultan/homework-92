import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {NotificationManager} from "react-notifications";
import {Grid, makeStyles,} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';
import FormInput from "../FormInput/FormInput";

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
  const [message, setMessage] = useState({
    author: author,
    body:''
  });

  const onChangeHandler = e => {
    const {name, value} = e.target;
    setMessage(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    ws.current.send(JSON.stringify({
      type: 'NEW_MESSAGE',
      value: message,
    }))
    NotificationManager.success('Message sent');
  }
  return (
    <Grid container item component='form'
          onSubmit={onSubmitHandler}
          className={classes.formBlock}
          justify='center'
          alignItems='center'>

      <FormInput
      name='body'
      label='Message'
      onChange={onChangeHandler}
      required={true}
      fullWidth
      value={message.body}
      newStyles={{margin: 0, textAlign: 'center'}}
      />
      <Button
        variant='contained'
        type='submit'
        color='primary'
        className={classes.sendBtn}
        endIcon={<SendIcon/>}>
        Send
      </Button>
    </Grid>
  );
};

InputBlock.propTypes = {
  author: PropTypes.string.isRequired,
}

export default InputBlock;