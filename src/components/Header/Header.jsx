import React, { useState } from 'react'
import { FaBars, FaRegUser } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";
import { BsEnvelope } from "react-icons/bs";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FiBell } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import './header.css'
import { fetchUserSuccess } from '../../store/actions/userAction';
import { sideBarAction } from '../../store/actions/sidebarAction';


const Header = () => {

    const dispatch = useDispatch()

    const { user } = useSelector((user) => user.userReducer)
    const { decision } = useSelector((user) => user.sidebarReducer)

    var userx;
    if (user) {
        userx = JSON.parse(user)
    }

    const [isProfileBlockOpen, setIsProfileBlockOpen] = useState(false)

    const profileBlockHandler = () => {
        if (isProfileBlockOpen) {
            setIsProfileBlockOpen(false)
        } else {
            setIsProfileBlockOpen(true)
        }
    }

    const logoutHandler = () => {
        dispatch(fetchUserSuccess())
        localStorage.clear()
    }

    const sideBarHandler = () => {
        if (decision) {
            dispatch(sideBarAction(false))
        } else {
            dispatch(sideBarAction(true))
        }
    }

    return (
        <header className='shadow-xl bg-white flex justify-between items-center px-6 py-2 '>
            <div className='flex items-center gap-3'>
                <FaBars className='text-2xl cursor-pointer lg:hidden' onClick={sideBarHandler} />
                <h1 className='font-bold hidden lg:block'>Dashboard</h1>
                <img src="/assets/logo.png" alt="logo" className='w-[6rem] lg:hidden ' />
            </div>
            <div className='flex items-center gap-2 relative'>
                <FiBell className='mt-1 text-3xl rounded-full hover:bg-gray-100 p-1' />
                <div className='flex items-center gap-2 hover:bg-gray-100 p-1 rounded cursor-pointer' onClick={profileBlockHandler}>
                    <span className="font-medium text-[1.1rem] sm:text-sm">
                        {
                            userx && userx.username
                        }
                    </span>
                    {
                        userx.image ? <div className='h-10 w-[2.5rem] overflow-hidden rounded-full'><img src={`https://hotel-dashboard-w4kx.onrender.com${userx.image.url}`} alt="" className='scale-[2] mt-4 object-cover object-center' /></div> : <FaUserCircle className='sm:text-2xl text-3xl' />
                    }
                </div>
                {
                    isProfileBlockOpen &&
                    <div className='p-2 account_info'>
                        <div className='p-2'><FaRegUser className='inline me-2 text-xl' />Account</div>
                        <div className='p-2'><BsEnvelope className='inline me-2 text-xl ' />Inbox</div>
                        <div className='p-2'><IoSettingsOutline className='inline me-2 text-xl' />Settings</div>
                        <div className='p-2 cursor-pointer' onClick={logoutHandler} ><IoIosLogOut className='inline me-2 text-xl' />Logout</div>
                    </div>
                }
            </div>
        </header>
    )
}

export default Header