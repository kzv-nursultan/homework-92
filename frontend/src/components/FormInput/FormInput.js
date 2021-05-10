import React from 'react';
import {Grid, MenuItem, TextField} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import PropTypes from 'prop-types';


const useStyles = makeStyles({
  fieldBlock: {
    margin: '15px auto',
    textAlign: 'center',
    maxWidth: 400,
  }
});

const FormInput = ({select, error, options, newStyles, ...props}) => {
  const classes = useStyles();
  let inputChildren = null;

  if (select) {
    inputChildren = options.map(option=>(
      <MenuItem key={option._id} value={option._id}>
        {option.name}
      </MenuItem>
    ))
  }

  return (
    <Grid container item className={classes.fieldBlock} style={newStyles}>
      <TextField
        variant="outlined"
        select={select}
        error={error}
        helperText={error}
        fullWidth
        {...props}
      >
        {inputChildren}
      </TextField>
    </Grid>
  );
}
FormInput.propTypes = {
  ...TextField.propTypes,
  select: PropTypes.bool,
  error: PropTypes.bool,
  options: PropTypes.arrayOf(PropTypes.object),
};

export default FormInput;