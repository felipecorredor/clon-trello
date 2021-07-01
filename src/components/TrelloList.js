import React from 'react'
import { Paper, CssBaseline, makeStyles } from '@material-ui/core';
import ListTitle from './ListTitle';
import TrelloCard from './TrelloCard';
import AddCardOrList from './AddCardOrList';
import { Draggable, Droppable } from 'react-beautiful-dnd'

const TrelloList = ({ list, index }) => {
  const classes = useStyle()
  return (
    <Draggable draggableId={list.id} index={index}>
      {(provided) => (
        <div ref={provided.innerRef} {...provided.draggableProps}>
          <Paper className={classes.root} {...provided.dragHandleProps}>
            <CssBaseline />
            <ListTitle title={list.title} listId={list.id} />
            <Droppable droppableId={list.id}>
              {
                (provided) => (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {list.cards.map((card, index) => (
                      <TrelloCard card={card} key={card.id} index={index} />
                    ))}
                    {provided.placeholder}
                  </div>
                )
              }
            </Droppable>

            <AddCardOrList listId={list.id} />
          </Paper>
        </div>
      )}
    </Draggable>
  )
}

export default TrelloList

const useStyle = makeStyles(theme => ({
  root: {
    minWidth: '300px',
    background: '#ebecf0',
    margin: theme.spacing(1)
  }
}))
