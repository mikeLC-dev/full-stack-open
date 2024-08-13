import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
/* eslint-disable no-case-declarations */
/* eslint-disable no-empty */

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
      addNewAnecdote(state, action) {
        state.push(action.payload)
      },
      addNewVote(state,action){
        const id = action.payload.id
      const votedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== id ? anecdote : votedAnecdote
      )
      },
      appendAnecdote(state, action) {
        state.push(action.payload)
      },
      setAnecdotes(state, action) {
        return action.payload
      }
  },
})

export const { addNewAnecdote, addNewVote, appendAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = id => {
  return async dispatch => {
    const newVote = await anecdoteService.voteAnAnecdote(id)
    dispatch(addNewVote(newVote))
  }
}

export default anecdoteSlice.reducer