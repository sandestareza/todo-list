import ButtonModal from "../Atoms/ButtonModal";
import { TitleModal } from "../Atoms/TitleModal";

import indikatorRed from '../../assets/icons/indicator-red.svg'
import indikatorBlue from '../../assets/icons/indicator-blue.svg'
import indikatorGreen from '../../assets/icons/indicator-green.svg'
import indikatorPurple from '../../assets/icons/indicator-purple.svg'
import indikatorYellow from '../../assets/icons/indicator-yellow.svg'

import { useEffect, useState } from "react";
import Select from 'react-select';
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";


export default function Modal({setShowModal, getListTodoItems, isedit}) {

    const { id } = useParams();

    const { listDetailodos } = useSelector((state) => state.todos)

    const [values, setValues] = useState(listDetailodos.title)
    const [isDisbledBtn, setIsDisbledBtn] = useState(true)

    useEffect(() => {

        if (isedit) {
            
            setValues(listDetailodos.title)  
            setIsDisbledBtn(false)
            
            let icon = ''
            let text = ''
            if (listDetailodos.priority === 'very-high') {
    
                icon = indikatorRed
                text = 'Very Heigh'
    
            } else if (listDetailodos.priority === 'high') {
    
                icon = indikatorYellow
                text = 'High'
    
            } else if (listDetailodos.priority === 'normal') {
    
                icon = indikatorGreen
                text = 'Medium'
    
            } else if (listDetailodos.priority === 'low') {
    
                icon = indikatorBlue
                text = 'Low'
    
            } else {
    
                icon = indikatorPurple
                text = 'Very Low'
            }
            
            setSelectedOption({
                value : listDetailodos.priority, 
                icon,
                text
            })               
        } else {

            setValues("") 
            setSelectedOption({
                value : 'very-high',
                icon : indikatorRed,
                text : 'Very Heigh'
            })
        }

    }, [listDetailodos, isedit])
    

    const data = [
        {
            value : 'very-high',
            icon : indikatorRed,
            text : 'Very Heigh'
        },
        {
            value : 'high',
            icon : indikatorYellow,
            text : 'High'
        },
        {
            value : 'normal',
            icon : indikatorGreen,
            text : 'Medium'
        },
        {
            value : 'low',
            icon : indikatorBlue,
            text : 'Low'
        },
        {
            value : 'very-low',
            icon : indikatorPurple,
            text : 'Very Low'
        },
    ]

    const [selectedOption, setSelectedOption] = useState({
        value : 'very-high',
        icon : indikatorRed,
        text : 'Very Heigh'
    })

 
    const handleChangeSelect = e => {
        setSelectedOption(e);
    }

    const handleChangeInput = e => {
        if (e.target.value) {
            setValues(e.target.value)
            setIsDisbledBtn(false)
        } else {
            setValues("")
            setIsDisbledBtn(true)
        }
    }

    const handleSubmit = async () => {
        
        const data = {
            activity_group_id: id,
            priority: selectedOption.value,
            title: values
        }

        if (isedit) {
            
            handleEditTodos(data)

        } else {

            handleAddTodos(data)
        }

        

    }

    const handleAddTodos = async (data) => {

        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items"

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
            setShowModal(false)
            getListTodoItems()
            
        } catch (error) {
            console.log(error)
        }
    }

    const handleEditTodos = async (data) => {

        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items/"+listDetailodos.id

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
            setShowModal(false)
            getListTodoItems()
            
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <>
            <div data-cy="modal-add-edit" className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative my-6 mx-auto w-2/4">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                            <TitleModal setShowModal={setShowModal} isedit={isedit}/>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <div>
                                <label className="text-sm">NAMA LIST ITEM</label>
                                <input 
                                    type="text" 
                                    placeholder="Tambahkan nama Activity" 
                                    className="mt-3 block w-full p-2 text-base text-slate-500 bg-white bg-clip-padding border border-slate-400 rounded focus:outline-none focus:border-blue-300 focus:shadow-sm"
                                    value={values || ""}
                                    onChange={handleChangeInput} 
                                    data-cy="modal-add-name-input"                                   
                                />
                            </div>
                            <div className="mt-5">
                                <label className="text-sm">PRIORITY</label>
                                <Select 
                                    isSearchable={true}
                                    className="mt-3 w-56 text-base font-medium text-slate-500 bg-white bg-clip-padding rounded focus:outline-none focus:border-blue-300 focus:shadow-sm"
                                    value={selectedOption || ""}
                                    options={data}
                                    onChange={handleChangeSelect}
                                    getOptionLabel={e => (
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            <img src={e.icon} alt="indikator" />
                                            <span style={{ marginLeft:8 }}>{e.text}</span>
                                        </div>
                                    )}        
                                    data-cy="modal-add-priority-dropdown"                            
                                />
                            </div>
                        </div>
                        <div>
                            <ButtonModal data-cy="modal-add-save-button" handleSubmit={()=>handleSubmit()} isDisbledBtn={isDisbledBtn}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
  );
}