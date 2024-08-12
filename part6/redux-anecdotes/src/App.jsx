
import AnecdoteList from './components/AnecdoteList'
import AnecdoteForm from './components/AnecdoteForm'
import Filter from './components/Filter'

const App = () => {

  
  return (
    <div>
      <h2>Anecdotes</h2>
      
      <AnecdoteList />
      <AnecdoteForm />
      <Filter />
    </div>
  )
}

export default App