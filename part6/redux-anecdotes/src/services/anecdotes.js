import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (content) => {
    const object = { content, votes: 0 }
    const response = await axios.post(baseUrl, object)
    return response.data
}

const voteAnAnecdote = async (id) => {

    const response = await axios.get(`${baseUrl}/${id}`)
    const anecdota = response.data
    const votedAnecdote= {...anecdota, votes: anecdota.votes+1}
    const request = axios.put(`${baseUrl}/${id}`, votedAnecdote)
    return request.then(response => response.data)
  }

export default { getAll, createNew, voteAnAnecdote }