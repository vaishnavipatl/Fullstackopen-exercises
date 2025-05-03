import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/loginForm'
import blogSrv from './services/blogs'
import loginService from './services/login'
import togglelikes from './services/togglelikes'
import registerService from './services/register'
import blogService from './services/newblogs'
import removeblog from './services/removeblog'
// import { use } from 'react'
import Toggle from './components/Toggle'
import Register from "./components/Register";
import Logout from './components/Logout'
import Newblog from './components/Newblog'

const App = () => {
  const [blog, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const formref= useRef()
  useEffect(() => {
    const fetchBlogs = async()=>{
      const allBlogs = await blogSrv.getAll()
      setBlogs(allBlogs)
    } 
    fetchBlogs()
  }, [])

const handledelete =async(blogId) => {
  try {
    if(!user){
      alert('Please login ')
      return
    }
    await removeblog.deleteblog(blogId)
    setBlogs((prevBlogs)=>prevBlogs.filter((blog)=> blog._id !== blogId))
  } catch (error) {
    throw(error)
  }
}
const handleLike =async(blogId)=>{
  try {
    if(!user){
      alert('Please login to like this blog')
      return
     }
    const updatedBlog=await togglelikes.totalLikes(blogId)
    setBlogs((prevBlogs) =>
      prevBlogs.map((blog) =>
        blog._id === updatedBlog.blog._id ? updatedBlog.blog : blog
      )
    );
  } catch (error) {
    throw(error)
  }
 }

 

 const handleLogin = async (email,password)=>{
    try {
      const response = await loginService.login(
        email ,
        password,
      )
      // console.log(response.userExist)
      setUser(response.userExist)
      return response
    }catch (error) {
      throw(error)
  }
}
 

const handleRegister = async(name,email,password)=>{
  try {
    const response = await registerService.register(
      name ,
      email ,
      password)
    setUser(response.user)
    return response
  } catch (error) {
    throw(error)
  }
}

const handleNewBlog = async (title,content,image) =>{

  try {
      const response = await blogService.newblog(
        title,
        content,
        image
      )
      setBlogs([...blog , response.blog])
      formref.current.toggleVisibilty()
      return response
    } catch (error) {
      console.error('error in handlenewblog' ,error)
      throw(error)
    }
}
 

  return (
    <div>
      <>
      
      <Toggle buttonlabel='Login'>
         <LoginForm handleLogin={handleLogin}/>
      </Toggle>
      <Toggle buttonlabel='Register' >
         <Register handleRegister={handleRegister}/>
      </Toggle>
      </>
      <> {user ? <p>Welcome, {user.name}!</p> : <p>Please log in</p>}</>
      <><Logout setUser={setUser}/></>
      <h2>blogs</h2>
      <Toggle buttonlabel="New Blog" ref={formref}>
         <Newblog handleNewBlog={handleNewBlog} user={user}/> 
      </Toggle>
      
      <Blog blog={blog} handleLike={handleLike} user={user} handledelete={handledelete}/>
    </div>
  )
  
 }
 

export default App