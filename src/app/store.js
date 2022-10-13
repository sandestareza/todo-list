import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../service/todoSlice';

export const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});