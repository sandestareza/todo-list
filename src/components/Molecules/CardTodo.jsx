import React, { useState } from 'react'
import Title from '../Atoms/Title'
import IconDelete from '../../assets/icons/activity-item-delete-button.svg'

import { Link } from 'react-router-dom';
import SwalConfirm from './SwalConfirm';
import AlertInfo from './AlertInfo';

const CardTodo = ({data, getListActivity}) => {

    const [showSwal, setShowSwal] = useState(false)
    const [showAlert, setShowAlert] = useState(false)


    const formatDate = (date) => {
        let arrbulan = ["Januari","Februari","Maret","April","Mei","Juni","Juli","Agustus","September","Oktober","November","Desember"];
        let d = new Date(date),
            month = '' + d.getMonth(),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) month = arrbulan[month];
        if (day.length < 2) day = '0' + day;

        return [day, month, year].join(' ');
    }

  const handleDeleteActivity = async () => {
    const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups/"+data.id  

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
                getListActivity()

            },1000)
            
        } catch (error) {
            console.log(error)
        }
  }

  return (
    <div data-cy="activity-item" className='h-56 bg-white rounded-xl p-5 shadow relative'>
        <Link to={`/detail/${data.id}`}>
            <div  data-cy="activity-item-title" className='cursor-pointer h-56'>
                <Title name={data.title} className="text-slate-800 text-xl font-bold"/>            
            </div>
        </Link>
        <div className='absolute z-10 w-full left-0 bottom-6 flex justify-between border-none px-5'>
            <span data-cy="activity-item-date" className='text-[#888]'>{formatDate(data.created_at)}</span>
            <button data-cy="activity-item-delete-button" onClick={()=>setShowSwal(true)}>
              <img src={IconDelete} alt="icon-delete" />
            </button>
        </div>

        {/* Swal Confirm */}
        {
            showSwal ?
                <SwalConfirm 
                    setShowSwal={setShowSwal} 
                    data={data} 
                    handleDeleteTodo={()=>handleDeleteActivity()} 
                    textConfirm="Apakah anda yakin menghapus activity"
                />
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

export default CardTodo