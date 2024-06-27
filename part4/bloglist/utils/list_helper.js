const dummy = (blogs) => {
    return 1
  }

const totalLikes  = (blogs) => {
    
    return blogs.length === 0 ? 0 : blogs.reduce((sum,blog)=> sum + blog.likes,0) 
    
  }

const favoriteBlog = (blogs) => {
    return blogs.length === 0 ? {} : blogs.reduce((maxLikes, blog) => blog.likes > maxLikes.likes ? blog : maxLikes, blogs[0])
}

const mostBlogs = (blogs) =>{

    let aux = []
    if(blogs.length === 0){
        return {}
    } else {

        blogs.forEach((blog) => {
            if(!aux.some(e=>e.author === blog.author)){
                aux.push({author: blog.author, blogs:1})
            } else{                
                aux.filter(e=>e.author === blog.author)[0].blogs += 1
            }
        })
       
        aux.sort((a,b)=>a.blogs - b.blogs)
        return aux[aux.length-1]
    }


}

const mostLikes = (blogs) =>{

    let aux = []
    if(blogs.length === 0){
        return {}
    } else {

        blogs.forEach((blog) => {
            if(!aux.some(e=>e.author === blog.author)){
                aux.push({author: blog.author, likes:blog.likes})
            } else{                
                aux.filter(e=>e.author === blog.author)[0].likes += blog.likes
            }
        })
       
        aux.sort((a,b)=>a.likes - b.likes)
        return aux[aux.length-1]
    }

}

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }