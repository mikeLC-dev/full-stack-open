import {  useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    
    const addAnNewAnecdote = async (event) =>{
        
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        const newAnecdote = await anecdoteService.createNew(content)
        dispatch(addNewAnecdote(newAnecdote))
        dispatch(setNotification(`You have created the note: ${content}`))
        setTimeout(() => dispatch(setNotification(null)), 5 * 1000);
      }

    return(
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnNewAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm