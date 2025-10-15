import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './page/auth/login'
import Register from './page/auth/Register'
import Resume from './page/resume/resume'
import EditResume from './page/component/editResume'
import CreateResume from './page/component/CreateResume'

function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/resume' element={<Resume/>}/>
    <Route path='/edit/:userId/:resumeId' element={<EditResume />} />
    <Route path='/create' element={<CreateResume/>}/>
   </Routes>
   
   </BrowserRouter>
  )
}

export default App
