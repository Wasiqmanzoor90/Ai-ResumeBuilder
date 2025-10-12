import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/auth/login'
import Register from './page/auth/Register'
import Resume from './page/resume/resume'
import EditResume from './page/component/editResume'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/resume' element={<Resume/>}/>
    <Route path='/edit/:userId/:resumeId' element={<EditResume />} />
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
