import React , {useRef, useState} from 'react'


const Newblog =({handleNewBlog , user})=>{
     const[title ,setTitle] = useState('')
     const[content , setContent]= useState('')
     const[image , setImage]=useState('')
     const[message , setmessage]=useState('')
     const fileInput=useRef(null)
     const handleSubmit =async(e)=>{
       e.preventDefault()
       setmessage('')

       if(!user){
        setmessage('Please login to post blog.')
        return
       }
       try {
        const response = await handleNewBlog(title,content,image)
        console.log("Response from blog post:", response);

        if (response?.message) {
          setmessage(response.message)
        }
        else{
          setmessage('Blog post successfully')
        }
        setTitle('')
        setContent('')
        setImage('')
        fileInput.current.value=null
       } catch (error) {
         setmessage(error.response?.data?.message || "Your request is denied")
       }
     }
    return (
    <div className="blog">
      {message && <p> {message} </p>}
      <form onSubmit={handleSubmit}>
       Title :<input type ="text" id='title' placeholder='Title' value={title} onChange={({target})=>setTitle(target.value)} required/> 
       Content :<textarea  id='content' placeholder='Write your content' value={content} onChange={({target})=>setContent(target.value)} required/>
       Image :<input type ="file" id='image' aria-label="upload image" accept='image/*,video/*' onChange={({target})=>setImage(target.files[0])} ref={fileInput}required/> 
       <button id='postblog' type="submit">Post Blog</button>
      </form>
    </div>
  )
}

export default Newblog
