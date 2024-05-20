import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "universal-cookie"
import axios from "axios"






const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailErr, setEmailErr] = useState("")
    const navigate = useNavigate()
    const cookie = new Cookies()

    const handleRegister = async (e)=>{
        e.preventDefault()
        try {
            const res = await axios.post("http://localhost:3000/user/register", { name, email, password })
            cookie.set("user", res.data.token)
            navigate("/")
            window.location.reload()
        } catch (error) {
            console.log(error)
            error.response.data.email && setEmailErr(error.response.data.email) 
        }
        
      }
    return (
        <div>
        <div className='w-full flex justify-center mt-7'>
            <div className='bg-[#353435] px-3 py-4 shadow-lg rounded-sm w-[40%]'>
                <h2 className='text-center text-gray-50 py-3 text-2xl font-semibold'>Register</h2>
                <form className='flex flex-col gap-4' onSubmit={(e)=>handleRegister(e)}>
                    <input type="text" required placeholder='enter name...' className='px-2 py-1 rounded outline-[#02E77D]' onChange={(e)=>setName(e.target.value)}/>
                    <input type="email" required placeholder='enter email...' className='px-2 py-1 rounded outline-[#02E77D]' onChange={(e)=>setEmail(e.target.value)}/>
                    {emailErr && <p style={{color: "red", fontSize: "12px", marginBottom: "10px"}}>{emailErr} </p>}
                    <input type="password" required placeholder='enter password...' className='px-2 py-1 rounded outline-[#02E77D]' onChange={(e)=>setPassword(e.target.value)}/>
                    <button className='py-1 text-gray-200 bg-[#02E77D]'>Register</button>
                </form>
                <p className='mt-4 text-gray-200'>Already have an account? <a href="/register" className=' text-[#02E77D] font-semibold'>login</a></p>
            </div>
        </div>
        </div>
    )
}

export default Register
