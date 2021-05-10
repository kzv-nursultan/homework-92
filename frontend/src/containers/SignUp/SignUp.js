import React, {useState} from 'react';
import {NavLink} from "react-router-dom";
import {Grid, Typography} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Button from "@material-ui/core/Button";
import {useDispatch, useSelector} from "react-redux";
import {postUser} from "../../store/actions/UsersActions";
import FormInput from "../../components/FormInput/FormInput";
import LoginFacebook from "../../components/UI/LoginFacebook/LoginFacebook";

const useStyles = makeStyles({
  formBlock: {
    display: 'block',
    margin: '10px auto',
    textAlign: 'center'
  },
  mainBlock: {
    flexDirection:'column',
    textAlign:"center",
  },
  title: {
    textTransform:'uppercase',
    marginTop:10,
  },
  link:{
    float:'right',
    marginTop:'35px',
    fontSize:'small'
  },
  submitBtn:{
    margin: '5px 0 10px'
  }
})

const SingUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email:'',
    password:'',
    displayName:'',
    avatar:'',
  });

  const error = useSelector(state => state?.activeUsers.status)


  const onChangeHandler = e => {
    const {name, value} = e.target;

    setUser(prevState => ({
      ...prevState,
      [name]:value
    }));
  };

  const getFieldError = () => {
    try {
      return error;
    } catch (e) {
      return undefined;
    };
  };

  const onSubmitHandler = async e => {
    e.preventDefault();
    await dispatch(postUser('/users', {...user}));
  };


  return (
    <Grid container item xs={12} className={classes.mainBlock}>
      <Typography variant='h4' className={classes.title}>
        <PersonAddIcon fontSize='large' color='action'/>
        <br/>
        <strong>sign up</strong>
      </Typography>
      <form onSubmit={onSubmitHandler} className={classes.formBlock}>

        <FormInput
          name='email'
          label='Email'
          onChange={onChangeHandler}
          required={true}
          value={user.email}
          error={Boolean(getFieldError('email'))}
          helperText={getFieldError('email')}/>

        <FormInput
          name='password'
          label='Password'
          onChange={onChangeHandler}
          required={true}
          value={user.password}
          type='password'
          error={Boolean(getFieldError('password'))}
          helperText={getFieldError('password')}/>

        <FormInput
          name={'displayName'}
          label={'Display Name'}
          onChange={onChangeHandler}
          required={true}
          value={user.displayName}/>

        <FormInput
          name={'avatar'}
          label={'Avatar Image'}
          onChange={onChangeHandler}
          value={user.avatar}/>

        <Grid container item direction='column'>
          <Button
            type='submit'
            color='primary'
            variant='contained'
            className={classes.submitBtn}>
            Submit
          </Button>

          <LoginFacebook/>

        </Grid>
        <Grid item>
          <NavLink to='/login' className={classes.link}>
            Already registered?
          </NavLink>
        </Grid>
      </form>
    </Grid>
  );
};

export default SingUp;