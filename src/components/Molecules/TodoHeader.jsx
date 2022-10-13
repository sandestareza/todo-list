import React from 'react'
import Button from '../Atoms/Button'
import Title from '../Atoms/Title'

const TodoHeader = ({getListActivity}) => {

    const handleAddActivty = async () => {
        const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups"  
        
        const data = {
            email : "sandesta24@gmail.com",
            title : "New Activity"
        }

        try {

            const response = await fetch(
                baseUrl,
                {
                    method : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )
            const result = await response.json()
            
            getListActivity()
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div data-cy="activity-items-title" className='flex flex-row justify-between'> 
            <Title name='Activity' className='text-4xl text-slate-800 font-bold'/>
            <Button type="button" name="Tambah" icon="icon-plus mr-3" onClick={handleAddActivty}/>
        </div>        
    )
}

export default TodoHeader