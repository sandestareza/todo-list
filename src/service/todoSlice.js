import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    listActivity : [],
    listDetailActivty : {},
    listTodos : [],
    listDetailodos : {}
}

export const todoSlice = createSlice({
    name: "todos",
    initialState,
    reducers: {
        getActivity: (state, action) => {
            const data = action.payload.data.sort((a,b)=>b.id - a.id)
            state.listActivity = data
        },   
        
        getDetailActivity : (state, action) => {
            state.listDetailActivty = action.payload
        },

        getListTodos : (state, action) => {
            state.listTodos = action.payload.data
        },

        getDetailEdit : (state, action) => {
            state.listDetailodos = action.payload
        },

        sortLastListTodos : (state, action) => {
            const sort = action.payload.slice().sort((a,b)=>b.id - a.id)
            state.listTodos = sort
        },

        sortDescListTodos : (state, action) => {
            const sort = action.payload.slice().sort((a,b)=>a.id - b.id)
            state.listTodos = sort
        },

        sortAzListTodos : (state, action) => {
            const sort = action.payload.slice().sort((a,b)=>{
                if(a.title < b.title) { return -1 }
                return 0;
            })
            state.listTodos = sort
        },

        sortZaListTodos : (state, action) => {
            const sort = action.payload.slice().sort((a,b)=>{
                if(a.title > b.title) { return -1 }
                return 0;
            })
            state.listTodos = sort
        },

        sortUnfinisListTodos : (state, action) => {
            const sort = action.payload.slice().sort((a)=>{
                if(a.is_active === 1) { return -1 }
                return 0;
            })
            state.listTodos = sort
        },
    }
})

export const { 
    getActivity,
    getDetailActivity,
    getListTodos,
    getDetailEdit,
    sortLastListTodos,
    sortDescListTodos,
    sortAzListTodos,
    sortZaListTodos,
    sortUnfinisListTodos
} = todoSlice.actions

export default todoSlice.reducer