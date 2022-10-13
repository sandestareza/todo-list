import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDetailActivity, getListTodos } from '../../service/todoSlice'
import TodoListHeader from '../Molecules/TodoListHeader'
import ImgEmptyData from '../../assets/img/activity-empty-state.svg'
import CardList from '../Molecules/CardList'


const DetailContent = ({id}) => {

    const { listTodos } = useSelector((state) => state.todos)
    const dispatch = useDispatch()

    const getDetail = async () => {

        const baseUrl = "https://todo.api.devcode.gethired.id/activity-groups/"+id  
    
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
            dispatch(getDetailActivity(result))
            
        } catch (error) {
            console.log(error)
        }

    }

    const getListTodoItems = async () => {
        
        const baseUrl = "https://todo.api.devcode.gethired.id/todo-items?activity_group_id="+id

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
                
            dispatch(getListTodos(result))
            
        } catch (error) {
            console.log(error)
        }

    }
    
    useEffect(() => {      

        getDetail()          
        getListTodoItems()
      
    }, [])

    return (
        <div data-cy="activity-item" className='container mx-auto lg:px-36 px-10 mt-20'>
            <TodoListHeader getListTodoItems={()=>getListTodoItems()} />
            {
                listTodos.length ? 
                    <div data-cy="todo-items" className='flex flex-col gap-y-4 justify-center items-center- mt-20'>
                        {
                            listTodos.map(val=>(
                                <CardList key={val.id} data={val} getListTodoItems={()=>getListTodoItems()} />
                            ))
                        }
                    </div>
                :
                    <div data-cy="todo-items-empty" className='flex justify-center items-center mt-20'>
                        <img src={ImgEmptyData} />
                    </div>
            }
        </div>
    )
}

export default DetailContent