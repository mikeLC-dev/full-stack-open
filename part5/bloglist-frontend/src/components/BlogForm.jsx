import React, { useState } from 'react'



const BlogForm = ({ addBlog }) => {

  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const onChangeTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const onChangeAuthor = (event) => {
    setNewAuthor(event.target.value)
  }

  const onChangeUrl = (event) => {
    setNewUrl(event.target.value)
  }


  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }


  return (
    <form onSubmit={createBlog}>
      <div>
        <h2>Create new</h2>
      </div>
      <div>
        Title: <input value={newTitle} title='title' onChange={onChangeTitle} data-testid='title'/>
      </div>
      <div>
        Author: <input value={newAuthor} onChange={onChangeAuthor} data-testid='author'/>
      </div>
      <div>
        URL: <input value={newUrl} onChange={onChangeUrl} data-testid='url'/>
      </div>
      <div>
        <button type="submit" data-testid="submitBlog">create</button>
      </div>
    </form>)

}




export default BlogForm