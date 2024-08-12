import { useSelector, useDispatch } from 'react-redux'
import { voteForAnAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    console.log("FILTROOOOO:",state.filter)
    if(state.filter === 'ALL'){
      return state.anecdotes
    } 
    
    return state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))

  })
  anecdotes.sort((a, b) => b.votes - a.votes)
  const dispatch = useDispatch()  

  const vote = (id) => {
    console.log('vote', id)
    dispatch(voteForAnAnecdote(id))
  }

    return(
       <div>
        {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
       </div> 
    )
}

export default AnecdoteList