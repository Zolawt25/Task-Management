import { Delete, Done, Edit } from '@mui/icons-material'
import axios from 'axios';
import React from 'react'







const Tasks = ({title, description, deadline, priority, complited, _id, setChanged}) => {
    const daedLine = new Date(deadline).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    
    const handleComplite = async(id)=>{
        await axios.patch(`http://localhost:3000/api/tasks/${id}`,{complited: true})
        setChanged(prev => !prev)
    }
    const handleDelete = async(id)=>{
        await axios.delete(`http://localhost:3000/api/tasks/${id}`)
        setChanged(prev => !prev)
    }

    return (
        <div className='w-full bg-[#3E3D3E] flex justify-between sm:items-center flex-col sm:flex-row shadow-xl py-2 px-3 mt-4'>
            <div>
                <h2 className='text-2xl text-[#02E77D] font-semibold'>{title}</h2>
                <p className='mt-1 text-gray-200 font-semibold text-sm'>{description}</p>
                <p className={`py-1 px-3 ${priority === "important"? "bg-red-600" : "bg-[#02E77D]"} text-gray-100 font-semibold my-2 inline-block rounded`}>{priority}</p>
                <p className=' text-xs font-semibold text-gray-100'>Your deadline is : {daedLine}</p>
            </div>
            <div className='flex justify-between sm:justify-start mt-4 sm:mt-0'>
                
                <button className=' text-[#20E77D]' onClick={()=>handleComplite(_id)}><Done/></button>
                <a href={`/edit/${_id}`} className=' text-yellow-300'><Edit/></a>
                <button className=' text-red-600' onClick={()=>handleDelete(_id)}><Delete/></button>
            </div>
        </div>
    )
}

export default Tasks
