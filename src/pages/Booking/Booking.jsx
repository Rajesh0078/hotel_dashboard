import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import { FaSearch } from 'react-icons/fa'

const Booking = () => {
    const navigate = useNavigate()
    const { user } = useSelector((user) => user.userReducer)
    const { decision } = useSelector((user) => user.sidebarReducer)


    const navigation = () => {
        if (!user) {
            navigate('/auth/login')
        }
    }

    useEffect(() => {
        navigation()
    }, [user])

    return (
        <>
            <div className='grid grid-cols-12 min-h-screen'>
                <div className='sidebar lg:col-span-2 h-full hidden lg:block'>
                    {
                        user && <Sidebar user={JSON.parse(user)} />
                    }
                </div>
                <div className={`sidebar shadowy lg:col-span-2 h-full block min-w-[12rem] ${decision ? "not" : "there"} lg:hidden`} style={{ transformOrigin: 'left', transition: 'all ease 300ms' }}>
                    {
                        user && <Sidebar user={JSON.parse(user)} />
                    }
                </div>

                <div className='lg:col-span-10 col-span-12'>
                    <header className={`fixed z-10 top-0 lg:left-[17%] left-0 right-0 `}>
                        <Header />
                    </header>
                    {

                        <main className='bg-[#f0f3fb] h-full w-full lg:ms-[20%] px-3 py-7'>
                            <div className='pt-12 px-4 mt-2'>
                                <div>
                                    <span className='text-xl font-semibold'>All Booking &gt;</span>
                                    <Link to={'/'} className='mx-2'>Home &gt;</Link>
                                    <span className='m'>Bookings &gt;</span>
                                    <span className='ms-2'>all</span>
                                </div>
                                <div className=' w-full bg-white mt-6 rounded shadowx'>
                                    <section className='bg-slate-400 '>
                                        <div className='flex items-center gap-5 px-4 py-2'>
                                            <span className='text-gray-800'>All Booking</span>
                                            <div className='bg-white p-2 flex items-center gap-2 text-gray-800'>
                                                <FaSearch className='' />
                                                <input type="text" className='outline-none ' />
                                            </div>
                                        </div>
                                        <div className='bg-white py-2 px-4'>
                                            hi
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </main>
                    }
                </div>
            </div >
        </>
    )
}

export default Booking