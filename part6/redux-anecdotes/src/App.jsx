import { useSelector, useDispatch } from 'react-redux'
import { voteForAnAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import reducer from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => state)
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForAnAnecdote(id))
  }

  const addNewAnecdote = (event) =>{
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList anecdotes={anecdotes} vote={vote}/>
      
      <h2>create new</h2>
      <AnecdoteForm addNewAnecdote={addNewAnecdote}/>
    </div>
  )
}

export default App