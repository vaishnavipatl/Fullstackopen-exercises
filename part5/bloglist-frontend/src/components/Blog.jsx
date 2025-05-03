
  import React ,{useState} from "react"
  import Comments from "./Comments"

  const Blog = ({ blog ,handleLike ,user ,handledelete }) => {
  const[selectedId , setSelectedId]= useState(null)
  
  
  return (
    <div >
      <h2>All Blogs</h2>
      {blog.map(blog=>(
        <div key = {blog._id}>
          <h4>{blog.title}</h4>
          <h5>{blog.author?.name || "Unknown Author"}</h5>

          {selectedId === blog._id ? (
            <>
              {blog.image && (
                <img
                    src={`data:${blog.image.contentType};base64,${blog.image.data}`}
                    alt="blog"
                    style={{ maxWidth: "300px" }}
                  />
          )}

              <p>{blog.content}</p>
              <p>Likes: {blog.likes.length}</p>
              <button onClick={() => handleLike(blog._id)}>👍 Like / Unlike</button>
              <button onClick={()=> setSelectedId(null)}>Cancel</button>
              <Comments blog={blog} user={user}/>
            </>
          ): (
            <>
              <p>{blog.content?.slice(0,100)}....</p>
              <button onClick={()=> {setSelectedId(blog._id)}}>View More</button>
              {user?.userid === blog.author?._id && (
                <button onClick={() => handledelete(blog._id)}>Delete</button>
              )}

            </>
          )}
        
        </div>
      ))}
    </div>
  )
  }

  export default Blog


