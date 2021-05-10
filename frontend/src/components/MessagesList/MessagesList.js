import React from 'react';
import {Avatar, Divider, makeStyles, Paper, Typography} from "@material-ui/core";

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
  }
});

const MessagesList = ({author, body, date, avatar}) => {
  const classes = useStyles();
  const image = avatar ? avatar : 'https://i.pinimg.com/originals/51/f6/fb/51f6fb256629fc755b8870c801092942.png';
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
    </Paper>
  )
}

export default MessagesList;