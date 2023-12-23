import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home/Home'
import Login from './Authentication/Login/Login'
import Register from './Authentication/Register/Register'
import { Booking, Departments, Rooms, Staff } from "../pages/index"

const Navigations = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/rooms' element={<Rooms />} />
            <Route path='/bookings' element={<Booking />} />
            <Route path='/staff' element={<Staff />} />
            <Route path='/departments' element={<Departments />} />
            <Route path='/auth/login' element={<Login />} />
            <Route path='/auth/signup' element={<Register />} />
            <Route path='*' element={<center><h2>Page Not Found</h2></center>} />
        </Routes>
    )
}

export default Navigations