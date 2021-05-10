import React, {useEffect, useRef} from 'react';
import {Grid, makeStyles} from "@material-ui/core";
import {useDispatch, useSelector} from "react-redux";
import ActiveUsers from "../../components/ActiveUsers/ActiveUsers";
import InputBlock from "../../components/InputBlock/InputBlock";
import MessagesList from "../../components/MessagesList/MessagesList";

const useStyles = makeStyles({
  root: {
    flexWrap: 'nowrap',
    padding: 10,
    margin: '10px auto',
    justifyContent: 'space-evenly'
  },
  usersBlock: {
    width: '29%',
    border: '1px solid black',
    textAlign: "center",
    flexDirection:'column'
  },
  usersTitle: {
    textTransform: 'uppercase',
    marginTop: -9,
    backgroundColor: 'white',
    maxWidth: 50,
    margin: '0 auto 0 5px'
  },
  messagesBlock: {
    width: '69%',
    textAlign: "center",
  },
  messageTitle: {
    textTransform: 'uppercase',
    marginTop: -9,
    backgroundColor: 'white',
    maxWidth: 80,
    margin: '0 auto 0 5px'
  },
  chatBlock: {
    border: '1px solid black',
    height: 400,
    flexWrap: 'nowrap',
    overflowX: 'hidden',
    overflowY: 'auto',
    padding: '10px 0'
  },
  inputBlock: {
    height: 100,
    alignItems: 'center',
  }
})

const MainPage = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const ws = useRef(null);

  const loginUser = useSelector(state => state?.activeUsers.loginUser);
  const onlineUsers = useSelector(state => state?.activeUsers.onlineUsers);
  const messagesList = useSelector(state => state?.activeUsers.messages);


  useEffect(()=>{
    ws.current = new WebSocket("ws://localhost:8000/chat?token=" + loginUser.token);

    ws.current.onmessage = event => {
      const decoded = JSON.parse(event.data);
      dispatch(decoded);
    };

  },[loginUser.token, dispatch]);


  let activeUsers = "No users";

  if(onlineUsers.length>0) {
    activeUsers = (
    onlineUsers.map(object => (
        <ActiveUsers
        key={object.user._id}
        displayName={object.user.displayName}
        />
      ))
    );
  }

  let chat = "Messages not found";

  if (messagesList.length > 0) {
    chat = (
      messagesList.map(object => (
        <MessagesList
        key={object._id}
        author={object.author.displayName}
        body={object.body}
        date={object.date}
        avatar={object.author.avatar}
        />
      ))
    )
  }


  return (
    <Grid container className={classes.root}>

      <Grid container item className={classes.usersBlock} direction='column'>
        <h5 className={classes.usersTitle}>users</h5>
        {activeUsers}
      </Grid>

      <Grid container item direction='column' className={classes.messagesBlock}>

        <Grid container item className={classes.chatBlock} direction='column-reverse'>
          {chat}
          <h5 className={classes.messageTitle}> chat room </h5>
        </Grid>

        <Grid item className={classes.inputBlock}>
          <InputBlock author={loginUser._id} ws={ws}/>
        </Grid>
      </Grid>

    </Grid>
  );
};

export default MainPage;