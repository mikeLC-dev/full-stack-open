import { configureStore } from '@reduxjs/toolkit'
import filterReducer from '../reducers/filterReducer'
import anecdotesReducer from '../reducers/anecdoteReducer'


const store = configureStore({
  reducer: {
    anecdotes: anecdotesReducer,
    filter: filterReducer
  }
})

export default store