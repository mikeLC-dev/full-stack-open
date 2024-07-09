import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'




const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newNotification, setNotification] = useState(null)

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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

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
    } catch(exception){
      console.log("Fail to create the blog")
      setNotification(`ERROR: Fail to create the blog`)
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
        {loginForm()}
      </div> :
      <div>
        <p>{user.name} logged-in</p>
        <button onClick={() => logout()}>logout</button>
        <BlogForm addBlog={addBlog}/>
        <h2>blogs</h2>
        {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
        )}
      </div>
    }
     </div> 
  )
}

export default App