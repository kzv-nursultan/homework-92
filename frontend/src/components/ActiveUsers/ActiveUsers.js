import React from 'react';
import {Paper, Typography} from "@material-ui/core";

const ActiveUsers = ({displayName}) => {
  return (
    <Paper elevation={2} style={{margin: 5}}>
      <Typography variant='h4'>
        <strong>{displayName}</strong>
      </Typography>
    </Paper>
  );
};

export default ActiveUsers;