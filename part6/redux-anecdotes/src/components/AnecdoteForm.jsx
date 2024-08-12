import { useSelector, useDispatch } from 'react-redux'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const addAnNewAnecdote = (event) =>{
        
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addNewAnecdote(content))
        dispatch(setNotification(`You have created the note: ${content}`))
        let timeoutID = setTimeout(() => dispatch(setNotification(null)), 5 * 1000);
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