import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'







const EditTask = () => {
    const [tasks, setTasks] = useState([])
    const id = useLocation().pathname.split("/")[2]
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [deadline, setDeadline] = useState("")
    const [priority, setPriority] = useState("")
    const navigate = useNavigate()
    const deadLine = new Date(tasks.deadline).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    useEffect(()=>{
        const fetchData = async()=>{
            try {
                const res = await axios.get(`http://localhost:3000/api/tasks/${id}`)
                setTasks(res.data.task)
            } catch (error) {
                console.log(error)
            }
            
        }
        fetchData()
    },[])
    const handleEdit = async(e)=>{
        e.preventDefault()
        try {
            await axios.patch(`http://localhost:3000/api/tasks/${id}`,{
                title: title? title : tasks.title,
                description: description? description : tasks.description , 
                deadline: deadline? deadline : tasks.deadline, 
                priority: priority? priority : tasks.priority
            })
        } catch (error) {
            console.log(error)
        }
        
        navigate("/")
    }
    return (
        <div className='w-full flex justify-center'>
            <div className='bg-[#353435] px-3 py-4 shadow-lg rounded-sm w-[40%]'>
                <form onSubmit={(e)=>handleEdit(e)}>
                    <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="title" className='text-lg font-semibold text-gray-100'>Title:</label>
                    <input type="text" name='title' id='title' placeholder='add your task title...' className=' px-2 py-1 mr-7 rounded outline-[#02E77D]' onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                    <label htmlFor="description" className='text-lg font-semibold text-gray-100'>Description:</label>
                    <input type="text" name='description' id='description' placeholder='add your task description...' className=' px-2 py-1 mr-7 rounded outline-[#02E77D]' onChange={(e)=>setDescription(e.target.value)}/>
                    </div>
                    <div className='flex-1 flex flex-col gap-1'>
                        <label htmlFor="deadline" className='text-lg font-semibold text-gray-100'>Deadline:</label>
                        <input type="date" name='deadline' id='deadline'     className=' px-2 py-1 mr-7 rounded outline-[#02E77D]' onChange={(e)=>setDeadline(e.target.value)}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="priority" className='text-lg font-semibold text-gray-100'>Priority:</label>
                        <select name="priority" id="priority" className='px-2 py-1 mr-7 rounded outline-[#02E77D]' onChange={(e)=>setPriority(e.target.value)}>
                            <option value="">select priority</option>
                            <option value="notImportant">Not Important</option>
                            <option value="important">Important</option>
                        </select>
                    </div>
                    <button className='bg-[#02E77D] py-1 px-3 self-end font-semibold text-gray-50 rounded mt-2'>update</button>
                </form>
                <br />
                <div>
                    <p className='text-2xl font-semibold text-gray-100'>old values</p>
                    <br />
                    <p className='text-lg font-semibold text-gray-100'>title:</p>
                    <p className='text-lg font-semibold text-gray-100'>{tasks.title}</p>
                    <br />
                    <p className='text-lg font-semibold text-gray-100'>description:</p>
                    <p className='text-lg font-semibold text-gray-100'>{tasks.description}</p>
                    <br />
                    <p className='text-lg font-semibold text-gray-100'>deadLine:</p>
                    <p className='text-lg font-semibold text-gray-100'>{deadLine}</p>
                    <br />
                    <p className='text-lg font-semibold text-gray-100'>priority:</p>
                    <p className='text-lg font-semibold text-gray-100'>{tasks.priority}</p>
                </div>
            </div>
        </div>
    )
}

export default EditTask
