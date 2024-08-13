
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdoteService from './services/anecdotes'
import { setAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes =>
      { console.log("anecdota",anecdotes)
        return dispatch(setAnecdotes(anecdotes))}
    )}, [])
  return (
    <div>
      <Notification />
      <h2>Anecdotes</h2>
      
      <AnecdoteList />
      <Filter />
      <AnecdoteForm />
      
    </div>
  )
}

export default App