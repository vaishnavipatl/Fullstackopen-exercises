import logoutService from '../services/logout'
const Logout = ({setUser})=>{
   const handleLogout=async()=>{ 
    try {
       await logoutService.logout()
       setUser(null)
       alert('Logged out Successfully')
    } catch (error) {
        console.error('Logout Failed' ,error)
    }}
    return <button onClick={handleLogout}>Logout</button>
}

export default Logout