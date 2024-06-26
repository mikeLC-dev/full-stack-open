const dummy = (blogs) => {
    return 1
  }

  const totalLikes  = (blogs) => {
    
    return blogs.length === 0 ? 0 : blogs.reduce((sum,blog)=> sum + blog.likes,0) 
    
  }

  const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? {} : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes.likes ? blog : maxLikes, blogs[0])
    /*
    let blog = {}
    if(blogs.length === 1){
        blog = blogs[0]
    } else if (blogs.length >= 1){
        blog = blogs.reduce((maxLikes, blog) => blog.likes > maxLikes.likes ? blog : maxLikes, blogs[0]) 
    }
    return blog
    */
}
  
  module.exports = {
    dummy, totalLikes, favoriteBlog
  }