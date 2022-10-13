import React, { useEffect } from 'react'
import CardTodo from '../Molecules/CardTodo'
import TodoHeader from '../Molecules/TodoHeader'

import ImgEmptyData from '../../assets/img/activity-empty-state.svg'

import { useSelector, useDispatch } from 'react-redux'

import { getActivity } from '../../service/todoSlice'

const DashboardContent = () => {

    const {listActivity} = useSelector((state) => state.todos)

    const dispatch = useDispatch()
    
    const getListActivity = async () => {

        const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups?email=sandesta24@gmail.com"  
    
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
            
            dispatch(getActivity(result))
            
        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect(() => {      

        getListActivity()        
      
    }, [dispatch])
    


    return (
        <div data-cy="dashboard-content" className='container mx-auto lg:px-36 px-10 mt-20'>
            <TodoHeader getListActivity={()=>getListActivity()}/>
            {
                listActivity.length ? 
                    <div data-cy="activity-items" className='grid grid-cols-4 gap-4 mt-20'>
                        {
                            listActivity.map((value, i)=>(
                                <CardTodo key={i} data={value} getListActivity={()=>getListActivity()}/>
                            ))
                        }
                    </div>
                :
                    <div data-cy="activity-items-empty" className='flex justify-center items-center mt-20'>
                        <img src={ImgEmptyData} />
                    </div>
            }
        </div>
    )
}

export default DashboardContent