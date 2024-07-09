import BlogInfo from "./BlogInfo"
import Togglable from "./Togglable"

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  
  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}
    <Togglable buttonLabel='View'>
          <BlogInfo url={blog.url} likes={blog.likes} user={blog.user.username}/>
    </Togglable>
  </div>  
)
}
export default Blog