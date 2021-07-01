import React, { useState } from 'react'
import { makeStyles, Collapse, fade, Paper, Typography } from '@material-ui/core';
import AddCardOrListText from './AddCardOrListText';

const AddCardOrList = ({ type, listId }) => {
  const classes = useStyle()
  const [open, setOpen] = useState(false)

  return (
    <div className={classes.root}>
      <Collapse in={open}>
        <AddCardOrListText setOpen={setOpen} type={type} listId={listId} />
      </Collapse>
      <Collapse in={!open}>
        <Paper className={classes.addText} onClick={() => setOpen(true)}>
          <Typography>+ Add a {type ? 'list' : 'card'}</Typography>
        </Paper>
      </Collapse>
    </div>
  )
}

export default AddCardOrList

const useStyle = makeStyles(theme => ({
  root: {
    marginTop: theme.spacing(1)
  },
  addText: {
    padding: theme.spacing(1, 2, 1, 2),
    margin: theme.spacing(0, 1, 1, 1),
    background: '#ebecf0',
    "&:hover": {
      backgroundColor: fade("#000", 0.25)
    }
  }
}))