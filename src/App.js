import { useState } from 'react'
import './App.css';
import TrelloList from './components/TrelloList';
import { makeStyles } from '@material-ui/core';
import AddCardOrList from './components/AddCardOrList';
import mockData from './mockData';
import ContextAPI from './ContextAPI';
import uuid from 'react-uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

function App() {
  const classes = useStyle()
  const [data, setData] = useState(mockData)

  const updateListTitle = (updatedTitle, listId) => {
    const list = data.lists[listId]
    list.title = updatedTitle
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
  }

  const addCard = (title, listId) => {
    // Crear id unico para el nuevo card
    const newCardId = uuid()
    // Crear el card nuevo
    const newCard = {
      id: newCardId,
      title
    }
    // Añadir newCard array de cards en la lista
    const list = data.lists[listId]
    list.cards = [...list.cards, newCard]
    setData({
      ...data,
      lists: {
        ...data.lists,
        [listId]: list
      }
    })
  }

  const addList = (title) => {
    // Crear id unico para la nueva lista
    const newListId = uuid()
    // Crear la lista nueva
    const newList = {
      id: newListId,
      title,
      cards: []
    }
    // Añadir newList a la lista
    setData({
      listIds: [...data.listIds, newListId],
      lists: {
        ...data.lists,
        [newListId]: newList
      },
     })
  }

  const onDragEnd = (result) => {
    const { destination, destination: { droppableId: destDroppableId, index : destIndex }, source, source: { droppableId: srcDroppableId, index: srcIndex } , draggableId, type } = result;
    console.table([{ draggableId, srcDroppableId, destDroppableId }])
    console.table([{ type, srcIndex, destIndex }])

    if (!destination) return;
    if (type === "list") {
      const newListIds = data.listIds
      newListIds.splice(srcIndex, 1)
      newListIds.splice(destIndex, 0, draggableId)
      return;
    }

    const srcList = data.lists[srcDroppableId]
    const destList = data.lists[destDroppableId]
    const dragginCard = srcList.cards.filter(card => card.id === draggableId)[0]

    if (srcDroppableId === destDroppableId) {
      // utilizar splice para intercambiar los indices
      srcList.cards.splice(srcIndex, 1)
      destList.cards.splice(destIndex, 0, dragginCard)
      // actualizar setData con los nuevos indices
    }
  }

  return (
    <ContextAPI.Provider value={{ updateListTitle, addCard, addList }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="12345" type="list" direction="horizontal">
          {
            (provided) => (
              <div className={classes.root} ref={provided.innerRef} {...provided.droppableProps}>
                <div className={classes.container}>
                    {data.listIds.map((listID, index) => {
                      // JavaScript
                      const list = data.lists[listID]
                      return <TrelloList key={listID} list={list} index={index} />
                    })}
                  <div>
                    <AddCardOrList type="list" />
                    {provided.placeholder}
                  </div>
                </div>
              </div>
            )
          }
        </Droppable>
      </DragDropContext>
    </ContextAPI.Provider>
  );
}

export default App;

const useStyle = makeStyles(theme => ({
  root: {
    minHeight: '100vh',
    overflowY: 'auto',
    backgroundImage: `url(/images/laptop.jpg)`,
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
  container: {
    display: 'flex',
  }
}))