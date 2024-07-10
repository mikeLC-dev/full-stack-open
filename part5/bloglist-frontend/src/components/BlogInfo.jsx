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

    const removeBlog=()=>{
        if (window.confirm("Do you really want to remove this blog?")) {
            props.deleteBlog(props.id)
          }    
        
    }
    
    const showDeleteButton = () => props.actualUser.username === props.user.username 

    console.log(showDeleteButton())
    
    

    
    return (
    <div>
      <p>{props.url}</p>
      <p>{props.likes}<button type="submit" onClick={likeIncrement}>like</button></p>
      <p>{props.user.username}</p>
      {showDeleteButton() &&

        <button type="submit" onClick={removeBlog}>delete</button>
      }
        
      
    </div>  
  )
  }
  export default BlogInfo