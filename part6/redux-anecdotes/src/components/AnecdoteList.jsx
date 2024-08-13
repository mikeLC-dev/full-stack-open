import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'




const AnecdoteList = () => {

  const anecdotes = useSelector(state => {
    if (!state.filter) {
      return state.anecdotes
                
    }
    return state.anecdotes.filter((anecdote) => 
        anecdote.content.toLowerCase()
            .includes(state.filter.toLowerCase()))
            
  })

  const dispatch = useDispatch() 

  const vote = async (id) => {
    dispatch(voteAnecdote(id))
    dispatch(setNotification(`You voted the anecdote with id'${id}'`))
    setTimeout(() => dispatch(setNotification(null)), 5 * 1000);
  }

  const orderedAnecdotes = [...anecdotes].sort((a,b)=> b.votes-a.votes)
    return(
       <div>
        {orderedAnecdotes.map(anecdote =>
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