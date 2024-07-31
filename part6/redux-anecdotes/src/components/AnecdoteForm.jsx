const AnecdoteForm = ({ addNewAnecdote }) => {
    return(
        <div>
            <form onSubmit={addNewAnecdote}>
                <div><input name="anecdote"/></div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}
export default AnecdoteForm