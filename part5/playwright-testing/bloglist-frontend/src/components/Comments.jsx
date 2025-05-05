import React, { useState } from "react"
import Commentservice from '../services/addcomments'
const Comments = ({blog ,user})=>{
    const [text , setText]=useState('')
    const [message ,setMessage]=useState('')
    const handleComment = async()=>{
        if(!user){
            return setMessage('You should first login then comment')
        }
        try {
            const comment = await Commentservice.addcomment(blog._id ,text)
            setMessage(comment.message)
        } catch (error) {
            setMessage(error.response?.data?.message || "Server Issue")
        }
    }
    return(
     <div>
        {message && message}
        <textarea placeholder='Write your comments' value={text} onChange={({target})=>setText(target.value)} required/>
        <button onClick={handleComment}>Comment</button>
     </div>
    )
}

export default Comments