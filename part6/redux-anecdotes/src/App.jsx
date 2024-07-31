import { useSelector, useDispatch } from 'react-redux'
import { voteForAnAnecdote, addAnecdote } from './reducers/anecdoteReducer'
import reducer from './reducers/anecdoteReducer'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {

  
  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App