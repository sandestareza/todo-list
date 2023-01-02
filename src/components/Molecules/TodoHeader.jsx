import React, { useState } from 'react'
import Button from '../Atoms/Button'
import Title from '../Atoms/Title'

import SwalConfirm from '../Molecules/SwalConfirm'

const TodoHeader = ({getListActivity}) => {

    const [showAlert, setShowAlert] = useState(false)

    const handleAddActivty = async () => {
        const email = localStorage.getItem('email')
        if (!email) {
            setShowAlert(true)
            return false
        }
        const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups"  
        
        const data = {
            email : email,
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
            {
                showAlert ?
                <SwalConfirm data-cy="modal-delete" aletInfo={true} setShowSwal={setShowAlert} textConfirm={`Belum ada email ditambahkan`} url="/auth"/>
                :
                null
            }
        </div>        
    )
}

export default TodoHeader