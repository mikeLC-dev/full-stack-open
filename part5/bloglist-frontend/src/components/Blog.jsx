import BlogInfo from './BlogInfo'
import Togglable from './Togglable'

const Blog = ({ blog, blogService, updateLikes, deleteBlog, actualUser }) => {
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
        <BlogInfo title={blog.title} author={blog.author} url={blog.url} likes={blog.likes} user={blog.user} id={blog.id} blogService={blogService} updateLikes={updateLikes} deleteBlog={deleteBlog} actualUser={actualUser} />
      </Togglable>
    </div>
  )
}
export default Blog