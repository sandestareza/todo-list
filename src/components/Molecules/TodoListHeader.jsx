import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailActivity } from '../../service/todoSlice'
import Button from '../Atoms/Button'
import Title from '../Atoms/Title'
import Modal from './Modal'
import ListGroup from './ListGroup'

import { useNavigate } from 'react-router-dom';

const TodoListHeader = ({getListTodoItems}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { listDetailActivty } = useSelector((state) => state.todos)

    const [isEdit, setIsEdit] = useState(false)
    const [values, setValues] = useState("")

    const [showModal, setShowModal] = useState(false);

    const handleBtnEditTitle = () => {
        
        setIsEdit(true)
        setValues(listDetailActivty.title)                  

    }

    const handleEditTitle = async () => {

        const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups/"+listDetailActivty.id  

        const data = {
            title : values
        }
    
        try {

            const response = await fetch(
                baseUrl,
                {
                    method : 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                }
            )

            const result = await response.json()

            dispatch(getDetailActivity(result))
            setValues(result.title)
            setIsEdit(false)
            
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='flex flex-row justify-between'> 
            <div className='flex flex-row items-center'>
                <button data-cy="todo-back-button" type='button' onClick={()=>navigate(-1)}>
                    <i className='icon-back mr-5 mt-2'></i>
                </button>
                {
                    !isEdit ?
                        <>
                            <Title 
                                name={listDetailActivty.title} 
                                className='text-4xl text-slate-800 font-bold'
                                data-cy="todo-title"
                            />
                            <buttons type='button' onClick={handleBtnEditTitle}>                    
                                <i className='icon-pencil ml-10 mt-2'></i>
                            </buttons>
                        </>
                    :
                        <>
                            <input 
                                autoFocus={true} 
                                type="text" 
                                className='py-2 border-b-2 border-black text-slate-800 font-bold focus:outline-none text-4xl' 
                                value={values}
                                onChange={(e)=>setValues(e.target.value)}
                                onKeyPress={e => {
                                    if (e.key === 'Enter') {
                                        handleEditTitle()
                                    }
                                }}
                                onBlur={()=>setIsEdit(false)}
                                data-cy="todo-input-title"
                            />
                            <button data-cy="todo-edit-title-button" type='button' onClick={handleEditTitle}>                    
                                <i className='icon-pencil ml-10 mt-2'></i>
                            </button>
                        </>
                }
            </div>
            <div className='flex flex-row'>
                <ListGroup data-cy="todo-sort-button" />   
                <div>
                    <Button data-cy="todo-add-button" type="button" name="Tambah" icon="icon-plus mr-3" onClick={() => setShowModal(true)}/>
                </div>             
            </div>

            {/* Modal */}
            {
                showModal ? 
                <Modal setShowModal={setShowModal} getListTodoItems={()=>getListTodoItems()} isedit={false}/>
                :
                null
            }
        </div>
    )
}

export default TodoListHeader