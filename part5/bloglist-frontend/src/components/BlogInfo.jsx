const BlogInfo = (props) => {
    
    return (
    <div>
      <p>{props.url}</p>
      <p>{props.likes}<button type="submit">like</button></p>
      <p>{props.user}</p>
    </div>  
  )
  }
  export default BlogInfo