import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import { createStore, combineReducers } from 'redux'
import filterReducer from './reducers/filterReducer'
import anecdotesReducer from './reducers/anecdoteReducer'


const reducer = combineReducers({
  anecdotes: anecdotesReducer,
  filter: filterReducer
})

const store = createStore(reducer)

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)