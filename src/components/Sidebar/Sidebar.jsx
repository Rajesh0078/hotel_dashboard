import React from 'react'
import "./sidebar.css"
import { MdBorderColor } from "react-icons/md";
import { FaCalendar, FaDoorOpen, FaEnvelopeOpenText, FaGear, FaHouse, FaRegCircleUser, FaUserTie } from "react-icons/fa6";
import { GiCrossedBones } from "react-icons/gi";
import { BsIntersect } from "react-icons/bs";
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { sideBarAction } from '../../store/actions/sidebarAction';

const Sidebar = ({ user }) => {

    const { decision } = useSelector((user) => user.sidebarReducer)
    const dispatch = useDispatch()

    const sideBarHandler = () => {
        if (decision) {
            dispatch(sideBarAction(false))
        } else {
            dispatch(sideBarAction(true))
        }
    }

    return (
        <>
            {
                <div className='flex items-center flex-col h-full '>
                    <div className='lg:block hidden'>
                        <img src="/assets/logo.png" alt="logo" className='w-[8rem] ' />
                    </div>
                    <div className='flex lg:hidden items-center gap-9 pt-3'>
                        <img src="/assets/logo.png" alt="logo" className='w-[6rem] ' />
                        <GiCrossedBones className='text-blue-400 text-xl cursor-pointer' onClick={sideBarHandler} />
                    </div>
                    <div className='shadowy w-full h-full pt-5 text-center'>
                        <div>
                            <div className='w-[6rem] h-[6rem] mx-auto overflow-hidden shadowx rounded-xl'>
                                {
                                    user.image && <img src={`https://hotel-dashboard-w4kx.onrender.com${user.image.url}`} alt="rajesh" className='profile_img object-center object-cover mt-[-.4rem]' />
                                }
                            </div>
                            <p className='my-2 text-gray-900'> {user && user.username}</p>
                            <div className='flex justify-center lg:gap-5 gap-4 my-4 lg:text-xl text-md text-gray-600'>
                                <FaRegCircleUser />
                                <FaEnvelopeOpenText />
                                <FaCalendar />
                                <FaGear />
                            </div>
                        </div>
                        <nav className='flex flex-col text-left text-sm lg:text-md'>
                            <NavLink to={'/'} className='mx-3 rounded-xl text-gray-700 p-2'>
                                <FaHouse className='inline me-3' />
                                <span>Home</span>
                            </NavLink>
                            <NavLink to={'/bookings'} className='mx-3 rounded-xl text-gray-700 p-2'>
                                <MdBorderColor className='inline me-3' />
                                <span>Booking</span>
                            </NavLink>
                            <NavLink to={'/rooms'} className='mx-3 rounded-xl text-gray-700 p-2'>
                                <FaDoorOpen className='inline me-3' />
                                <span>Rooms</span>
                            </NavLink>
                            <NavLink to={'/departments'} className='mx-3 rounded-xl text-gray-700 p-2'>
                                <BsIntersect className='inline me-3' />
                                <span>Departments</span>
                            </NavLink>
                            <NavLink to={'/staff'} className='mx-3 rounded-xl text-gray-700 p-2'>
                                <FaUserTie className='inline me-3' />
                                <span>Staff</span>
                            </NavLink>
                        </nav>
                    </div>
                </div>
            }
        </>
    )
}

export default Sidebar