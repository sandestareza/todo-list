import React, { useState } from 'react'
import SortLatest from '../../assets/icons/sort-latest.svg'
import Sortoldest from '../../assets/icons/sort-oldest.svg'
import Sortunfinished from '../../assets/icons/sort-undfinished.svg'
import Sortaz from '../../assets/icons/sort-az.svg'
import Sortza from '../../assets/icons/sort-za.svg'
import SortChecked from '../../assets/icons/sort-checked.svg'
import { useSelector, useDispatch } from 'react-redux'
import {sortAzListTodos, sortDescListTodos, sortLastListTodos, sortUnfinisListTodos, sortZaListTodos} from '../../service/todoSlice'

const ListGroup = () => {

    const [checkedSortLast, setCheckedSortLast] = useState(true)
    const [checkedSortDesc, setCheckedSortDesc] = useState(false)
    const [checkedSortAz, setCheckedSortAz] = useState(false)
    const [checkedSortZa, setCheckedSortZa] = useState(false)
    const [checkedSortUnfinished, setCheckedSortUnfinished] = useState(false)
    const [showSort, setShowSort] = useState(false)


    const { listTodos } = useSelector((state) => state.todos)

    const dispatch = useDispatch()

    const handleSelectSort = (type) => {
        
        switch (type) {
            case "sort-last":
                dispatch(sortLastListTodos(listTodos))
                setCheckedSortLast(true)
                setCheckedSortDesc(false)                
                setCheckedSortAz(false)                
                setCheckedSortZa(false)                
                setCheckedSortUnfinished(false)                
                break;

            case "sort-desc":
                dispatch(sortDescListTodos(listTodos))
                setCheckedSortLast(false)
                setCheckedSortDesc(true)                
                setCheckedSortAz(false)                
                setCheckedSortZa(false)                
                setCheckedSortUnfinished(false)               
                break;
            case "sort-az":
                dispatch(sortAzListTodos(listTodos))
                setCheckedSortLast(false)
                setCheckedSortDesc(false)                
                setCheckedSortAz(true)                
                setCheckedSortZa(false)                
                setCheckedSortUnfinished(false)               
                break;
            case "sort-za":
                dispatch(sortZaListTodos(listTodos))
                setCheckedSortLast(false)
                setCheckedSortDesc(false)                
                setCheckedSortAz(false)                
                setCheckedSortZa(true)                
                setCheckedSortUnfinished(false)               
                break;
        
            default:
                dispatch(sortUnfinisListTodos(listTodos))
                setCheckedSortLast(false)
                setCheckedSortDesc(false)                
                setCheckedSortAz(false)                
                setCheckedSortZa(false)                
                setCheckedSortUnfinished(true)
                break;
        }

        setShowSort(false)

    }

    return (     
        <div className='relative'>
                    <button className='rounded-full p-4 mr-3 flex items-center border' data-cy="todo-sort" onClick={()=>setShowSort(!showSort)}>
                        <i className='icon-sort'></i>
                    </button>
                    {
                        showSort &&
                        <div className='absolute top-16 left-0'>
                            <ul className="w-56 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200">
                                <li onClick={()=>handleSelectSort('sort-last')} className="flex gap-x-2 hover:bg-slate-100 cursor-pointer py-3 px-4 w-full rounded-t-lg border-b border-gray-200">
                                    <img src={SortLatest} alt='sort-latest'/>
                                    Terbaru
                                    {
                                        checkedSortLast &&
                                        <img src={SortChecked} alt='sort-checked' className='ml-auto'/>
                                    }
                                </li>
                                <li onClick={()=>handleSelectSort('sort-desc')} className="flex gap-x-2 hover:bg-slate-100 cursor-pointer py-3 px-4 w-full border-b border-gray-200">
                                    <img src={Sortoldest} alt='sort-oldest'/>
                                    Terlama
                                    {
                                        checkedSortDesc &&
                                        <img src={SortChecked} alt='sort-checked' className='ml-auto'/>
                                    }
                                </li>
                                <li onClick={()=>handleSelectSort('sort-az')} className="flex gap-x-2 hover:bg-slate-100 cursor-pointer py-3 px-4 w-full border-b border-gray-200">
                                    <img src={Sortaz} alt='sort-az'/>
                                    A-Z
                                    {
                                        checkedSortAz &&
                                        <img src={SortChecked} alt='sort-checked' className='ml-auto'/>
                                    }
                                </li>
                                <li onClick={()=>handleSelectSort('sort-za')} className="flex gap-x-2 hover:bg-slate-100 cursor-pointer py-3 px-4 w-full rounded-b-lg">
                                    <img src={Sortza} alt='sort-za'/>
                                    Z-A
                                    {
                                        checkedSortZa &&
                                        <img src={SortChecked} alt='sort-checked' className='ml-auto'/>
                                    }
                                </li>
                                <li onClick={()=>handleSelectSort('sort-unfinished')} className="flex gap-x-2 hover:bg-slate-100 cursor-pointer py-3 px-4 w-full rounded-b-lg">
                                    <img src={Sortunfinished} alt='sort-unfinished'/>
                                    Belum Selesai
                                    {
                                        checkedSortUnfinished &&
                                        <img src={SortChecked} alt='sort-checked' className='ml-auto'/>
                                    }
                                </li>
                            </ul>
                        </div>
                    }
                </div>   

    )
}

export default ListGroup