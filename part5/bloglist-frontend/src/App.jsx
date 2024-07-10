import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNotification, setNotification] = useState(null)
  const blogFormRef = useRef()
  

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const orderBlogsByLikes = (b1, b2) => b2.likes - b1.likes

  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      console.log("login success")
      setNotification(`Login success for user ${user.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    } catch (exception) {
      console.log("wrong credentials")
      setNotification(`ERROR: Wrong Credentials`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setUsername('')
    setPassword('')
    console.log("logout success")
      setNotification(`logout success for user ${user.name}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
  }

  const addBlog = async (blogToAdd) =>{
    try{
      const addedBlog = await blogService.create(blogToAdd)
      setBlogs(blogs.concat(addedBlog))
      console.log("blog created")
      setNotification(`A new blog ${blogToAdd.title} by ${blogToAdd.author} `)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
      blogFormRef.current.toggleVisibility()
    } catch(exception){
      console.log("Fail to create the blog")
      setNotification(`ERROR: Fail to create the blog`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    }
  }

  const updateLikes = async (blogToUpdate) =>{
    try{
      const updatedBlog = await blogService.update(blogToUpdate.id,blogToUpdate)
      setBlogs(blogs.map(blog => blog.id !== blogToUpdate.id ? blog : updatedBlog))
      console.log("blog's likes updated",blogToUpdate.id)
      setNotification(`Blog ${blogToUpdate.title} by ${blogToUpdate.author} likes +1 `)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    } catch(exception){
      console.log("Fail to update the blog")
      setNotification(`ERROR: Fail to update the blog`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    }
  }

  const deleteBlog = async (idToDelete) =>{
    try{
      const deletedBlog = await blogService.remove(idToDelete)
      setBlogs(blogs.filter(blog => blog.id !== idToDelete))
      console.log("blog with the following id has been deleted",idToDelete)
      setNotification(`Blog with the following id has been deleted: ${idToDelete}`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    } catch(exception){
      console.log("Fail to delete the blog:",exception)
      setNotification(`ERROR: Fail to delete the blog`)
            setTimeout(() => {
              setNotification(null)
            }, 5000)
    }
  }

  return (
    <div>
      <Notification message={newNotification}/>
      {user === null ?
      <div>
        <h2>login in to application</h2>
        <LoginForm handleLogin={handleLogin} handleUsernameChange={({ target }) => setUsername(target.value)} handlePasswordChange={({ target }) => setPassword(target.value)} username={username} password={password} />
      </div> :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={() => logout()}>logout</button>
        <Togglable buttonLabel='Create Blog' ref={blogFormRef}>
          <BlogForm addBlog={addBlog}/>
        </Togglable>
        
        <h2>blogs</h2>
        {blogs.sort(orderBlogsByLikes).map(blog =>
        <Blog key={blog.id} blog={blog} blogService={blogService} updateLikes={updateLikes} deleteBlog={deleteBlog} actualUser={user}/>
        )}
      </div>
    }
     </div> 
  )
}

export default App