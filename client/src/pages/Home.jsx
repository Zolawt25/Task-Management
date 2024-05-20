import axios from 'axios'
import { useEffect, useState } from 'react'
import Tasks from '../components/Tasks'
import { jwtDecode } from "jwt-decode";
import Cookies from 'universal-cookie'






const Home = () => {
    const [isComplited, setIsComplited] = useState(false)
    const [tasks, setTasks] = useState([])
    const [changed, setChanged] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState("")
    const [search, setSearch] = useState("")
    const cookie = new Cookies()
    const token = cookie.get("user") 
    const decode = token ? jwtDecode(token) : ""


    const addTask = async(e)=>{
        e.preventDefault()
        try {
            if (!token) {
                return alert("you have to be login first!")
            }
            await axios.post(`http://localhost:3000/api/tasks`, {title, description, deadline, priority, userEmail: decode.email})
            setChanged(!changed)
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/api/tasks?title=${search}`)
                const filterWithUser = res.data.task.filter((item)=>{
                    if( decode.email === item.userEmail){
                        return item
                    }
                })
                const filterData = filterWithUser.filter((item)=>{
                    if (isComplited === true) {
                        if (item.complited === true) {
                            return item
                        }
                    }else{
                        if (!item.complited === true) {
                            return item
                        }
                    }
                })
                setTasks(filterData)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    },[isComplited, changed, search])
    return (
        <div>
            <div className='w-full flex justify-center'>
                <div className='flex flex-col items-center justify-center'>
                    <p className='text-gray-50 py-3 text-2xl font-semibold text-center'>search</p>
                    <input type="text" placeholder='search task...' className='px-2 py-1 rounded outline-[#02E77D]' onChange={(e)=>setSearch(e.target.value)}/>
                </div>
            </div>
        
        <div className='w-full flex justify-center mt-7'>
            <div className='bg-[#353435] px-3 py-4 shadow-lg rounded-sm w-[80%]'>
            <form className='flex flex-wrap items-center w-full' onSubmit={(e)=>addTask(e)}>
                <div className='flex-1 flex flex-col gap-1'>
                <label htmlFor="title" className='text-lg font-semibold text-gray-100'>Title:</label>
                <input type="text" name='title' id='title' placeholder='add your task title...' className=' px-2 py-1 sm:mr-7 rounded outline-[#02E77D]' required onChange={(e)=>setTitle(e.target.value)}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                <label htmlFor="description" className='text-lg font-semibold text-gray-100'>Description:</label>
                <input type="text" name='description' id='description' placeholder='add your task description...' className=' px-2 py-1 sm:mr-7 rounded outline-[#02E77D]' required onChange={(e)=>setDescription(e.target.value)}/>
                </div>
                <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="deadline" className='text-lg font-semibold text-gray-100'>Deadline:</label>
                    <input type="date" name='deadline' id='deadline'     className=' px-2 py-1 sm:mr-7 rounded outline-[#02E77D]' required onChange={(e)=>setDeadline(e.target.value)}/>
                </div>
                <div className='flex flex-col gap-1'>
                    <label htmlFor="priority" className='text-lg font-semibold text-gray-100'>Priority:</label>
                    <select name="priority" id="priority" className='px-2 py-1 sm:mr-7 rounded outline-[#02E77D]' required onChange={(e)=>setPriority(e.target.value)}>
                        <option value="">select priority</option>
                        <option value="notImportant">Not Important</option>
                        <option value="important">Important</option>
                    </select>
                </div>
                <button className='bg-[#02E77D] py-1 px-3 self-end font-semibold text-gray-50 rounded mt-3 sm:mt-0'>Add Task</button>
            </form>
            <div className='mt-6'>
                <button className={`px-2 py-1 text-gray-200  ${isComplited ? "bg-[#5D5C5D]" : "bg-[#02E77D]"} mr-3 rounded shadow`} onClick={()=>setIsComplited(false)}>Pending</button>
                <button className={`px-2 py-1 text-gray-200  ${isComplited ? "bg-[#02E77D]" : "bg-[#5D5C5D]"} rounded shadow`} onClick={()=>setIsComplited(true)}>Completed</button>
            </div>
                <div className='mt-7'>
                    {
                        tasks.map((item)=>{

                            return <Tasks {...item} setChanged={setChanged}/>
                        })
                    }
                    {tasks.length === 0 && <p className='text-center text-2xl text-gray-100'>No Taskes</p>}
                </div>
            </div>
        </div>
        </div>
    )
}

export default Home
