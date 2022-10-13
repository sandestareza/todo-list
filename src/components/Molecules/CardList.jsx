import React, { useState } from 'react'
import indikatorRed from '../../assets/icons/indicator-red.svg'
import indikatorBlue from '../../assets/icons/indicator-blue.svg'
import indikatorGreen from '../../assets/icons/indicator-green.svg'
import indikatorPurple from '../../assets/icons/indicator-purple.svg'
import indikatorYellow from '../../assets/icons/indicator-yellow.svg'
import Modal from './Modal'
import { useDispatch } from 'react-redux'
import { getDetailEdit } from '../../service/todoSlice'
import SwalConfirm from './SwalConfirm'
import AlertInfo from './AlertInfo'

const CardList = ({data, getListTodoItems}) => {

    const [showModal, setShowModal] = useState(false);
    const [isedit, setIsedit] = useState(false);

    const [showSwal, setShowSwal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    
    const dispatch = useDispatch()

    const handleDeleteTodo = async () => {

        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items/"+data.id

        try {

            const response = await fetch(
                baseUrl,
                {
                    method : 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )
            const result = await response.json()

            setShowAlert(true)
            setShowSwal(false)
            setTimeout(()=>{
                getListTodoItems()

            },1000)
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleChekedTodo = async (e) => {
        
        const cheked = e.target.checked

        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items/"+data.id

        const body = {
            is_active : cheked ? 0 : 1
        }

        try {

            const response = await fetch(
                baseUrl,
                {
                    method : 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body)
                }
            )
            const result = await response.json()
                
            getListTodoItems()

        } catch (error) {
            console.log(error)
        }
    }

    const handleDetailEdit = async () => {

        setShowModal(true)

        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items/"+data.id

        try {

            const response = await fetch(
                baseUrl,
                {
                    method : 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                }
            )

            const result = await response.json()
            
            dispatch(getDetailEdit(result))
            setIsedit(true)
            
        } catch (error) {
            console.log(error)
        }

    }
   
    return (
        <div data-cy="todo-items" className='w-full bg-white rounded-lg shadow py-7 px-5'>
            <div className='flex flex-row items-center justify-between'>
                <div className='flex flex-row items-center'>
                    <input data-cy="todo-items-checkbox" type="checkbox" className='w-5 h-5' onChange={handleChekedTodo} checked={data.is_active === 0 ? true : false}/>
                    {
                        data.priority === 'very-high' ?
                            <img src={indikatorRed} alt="indikatorRed" className='mx-5' data-cy="todo-items-priority" />
                        :
                        data.priority === 'high' ?
                            <img src={indikatorYellow} alt="indikatorRed" className='mx-5' data-cy="todo-items-priority" />
                        :
                        data.priority === 'normal' ?
                            <img src={indikatorGreen} alt="indikatorRed" className='mx-5' data-cy="todo-items-priority" />
                        :
                        data.priority === 'low' ?
                            <img src={indikatorBlue} alt="indikatorRed" className='mx-5' data-cy="todo-items-priority" />
                        :
                            <img src={indikatorPurple} alt="indikatorRed" className='mx-5' data-cy="todo-items-priority" />
                    }
                    <h6 data-cy="todo-items-title" className={`font-semibold text-xl mr-5 ${data.is_active === 0 ? 'text-slate-500 line-through' : ''}`}>{data.title}</h6>
                    <button  data-cy="todo-items-button-edit" type='button' onClick={handleDetailEdit}>                    
                        <i className='icon-pencil w-5 h-5'></i>
                    </button>
                </div>
                <div>
                    <button  data-cy="todo-items-button-delete" type='button' onClick={()=>{
                        setShowSwal(true)

                    }}>                    
                        <i className='icon-trash'></i>
                    </button>
                </div>
            </div>
            {/* Modal edit */}
            {
                showModal ? 
                <Modal setShowModal={setShowModal} getListTodoItems={()=>getListTodoItems()} isedit={isedit}/>
                :
                null
            }
            {/* Swal Confirm */}
            {
                showSwal ?
                <SwalConfirm setShowSwal={setShowSwal} data={data} handleDeleteTodo={()=>handleDeleteTodo()} textConfirm="Apakah anda yakin menghapus List Item"/>
                :
                null
            }
            {/* Alert Info */}
            {
                showAlert ?
                <AlertInfo />
                :
                null
            }
        </div>
    )
}

export default CardList