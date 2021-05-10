import React from 'react';
import {Avatar, Divider, IconButton, makeStyles, Paper, Typography} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import {useSelector} from "react-redux";

const useStyles = makeStyles({
  root: {
    margin: 5,
    border: '1px solid black'
  },
  title: {
    textAlign: 'left',
    padding:5,
  },
  test: {
    width: 50
  },
  deleteBtn: {
    padding: 0,
    margin: '0 5px',
  }
});

const MessagesList = ({ author, body, date, avatar, id, ws}) => {
  const classes = useStyles();
  const image = avatar ? avatar : 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png';
  const user = useSelector(state => state?.activeUsers.loginUser.role);

  const deleteHandler = () => {
    ws.current.send(JSON.stringify({
      type: 'DELETE_MESSAGE',
      id: id,
    }))
  };

  return (
    <Paper elevation={3} variant='outlined' className={classes.root}>
      <Avatar alt='users avatar' src={image}/>
      <Divider/>
      <Typography variant='h5' className={classes.title}>
        <strong>{author} says:</strong>  {body}
      </Typography>
      <Divider/>
      <Typography variant='caption'>
        {date}
      </Typography>
      <IconButton aria-label="delete"
                  onClick={deleteHandler}
                  className={classes.deleteBtn}
                  style={{display: user === 'moderator' ? 'inline-flex' : 'none'}}>
        <DeleteIcon />
      </IconButton>
    </Paper>
  )
}

export default MessagesList;