import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from '../pages/Dashboard';
import Detail from '../pages/Dashboard/detail';


const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route 
            path='/' 
            element={
                 <Dashboard />
          }
        >
        </Route>
        <Route 
            path='/detail/:id' 
            element={
                 <Detail />
          }
        >
        </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default Router