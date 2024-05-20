import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'





const Navbar = () => {
    const cookie = new Cookies()
    const token = cookie.get("user") 
    const decode = token ? jwtDecode(token) : ""
    const name = token && decode.name.slice(0,2)

    const handleLogout = ()=>{
        cookie.remove("user")
        window.location.reload()
    }
    return (
        <div className='flex justify-between px-24 py-4 flex-col sm:flex-row gap-2 items-center sm:items-start'>
        <div>
            <a href="/" className=' text-gray-100 font-semibold text-lg'>Task Management</a>
        </div>
        { token ? <div className="flex gap-4">
            <p className="bg-[#02E77D] rounded-full py-[6px] px-3 text-gray-100 text-lg font-semibold">{name}</p> <button onClick={()=>handleLogout()} className='bg-[#02E77D] font-semibold py-1 px-3 text-gray-100 rounded'>Logout</button>
        </div> :
           <div>
            <a href="/login" className='bg-[#02E77D] font-semibold py-1 px-3 text-gray-100 rounded'>Login</a>
        </div> 
        }
        
        </div>
    )
}

export default Navbar
