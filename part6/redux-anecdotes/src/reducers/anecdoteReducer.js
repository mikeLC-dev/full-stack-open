import { createSlice } from '@reduxjs/toolkit'
/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
      addNewAnecdote(state, action) {
        const content = action.payload
        state.push({
          content,
          votes: 0,
          id: getId()
        })
      },
      addNewVote(state,action){
        const id = action.payload
        const anecdoteToFind = state.find(anecdote => anecdote.id === id)
        const changedAnecdote = {...anecdoteToFind, votes: anecdoteToFind.votes+1}
        return state.map(anecdote =>
          anecdote.id !== id ? anecdote : changedAnecdote)
      }
  },
})

export const { addNewAnecdote, addNewVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer