import React , { useState } from 'react'

const BlogInfo = (props) => {
    const blog= {
        title: props.title,
            author: props.author,
            url: props.url,
            likes: props.likes,
            user: props.user,
            id: props.id
    }
    const [blogObject, setBlogObject] = useState(blog)

    const likeIncrement = () => {
        
        const blogUpdated= {
            title: props.title,
            author: props.author,
            url: props.url,
            likes: props.likes+1,
            user: props.user,
            id: props.id
        }
        props.updateLikes(blogUpdated)
        setBlogObject(blogUpdated)
    }
    console.log("ID:",props.id)
    return (
    <div>
      <p>{props.url}</p>
      <p>{props.likes}<button type="submit" onClick={likeIncrement}>like</button></p>
      <p>{props.user.username}</p>
    </div>  
  )
  }
  export default BlogInfo