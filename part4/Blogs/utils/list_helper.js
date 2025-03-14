export const totalLikes=(blogs)=>{
    return blogs.reduce((sum , blogs)=> sum + blogs.likes , 0)
}

