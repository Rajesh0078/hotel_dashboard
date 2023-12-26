import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/Sidebar/Sidebar'
import Header from '../../components/Header/Header'
import { FaSearch } from 'react-icons/fa'
import axios from 'axios'
import { MdDelete, MdEditSquare } from 'react-icons/md'

const Booking = () => {
    const navigate = useNavigate()
    const { user } = useSelector((user) => user.userReducer)
    const { decision } = useSelector((user) => user.sidebarReducer)
    const [data, setData] = useState([])
    const [searchedData, setSearchedData] = useState([])
    const [date, setDate] = useState(new Date(2023, 10, 10))

    const navigation = () => {
        if (!user) {
            navigate('/auth/login')
        }
    }

    const gettingData = async () => {
        const response = await axios.get('https://hotel-dashboard-w4kx.onrender.com/api/hotels')
        let arr = []
        if (response.data) {
            const result = response.data.data
            result.forEach((res) => {
                const next = res.attributes.usersData
                next.forEach((i) => {
                    arr.push(i)
                })
            })
        }
        setData(arr)
    }



    useEffect(() => {
        navigation()
        gettingData()
    }, [user])

    const searchhandler = (e) => {
        const { value } = e.target
        const res = data.filter((i) => i.name.toLowerCase().includes(value.toLowerCase()))
        if (value.length >= 1) {
            setSearchedData(res)
        }
        else {
            setSearchedData([])
        }
    }


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
                                                <input type="text" className='outline-none ' onChange={searchhandler} />
                                            </div>
                                        </div>
                                        <div className='bg-white py-2 px-4'>
                                            <div className='w-full overflow-x-auto flow bg-white'>
                                                <h2 className='text-gray-700 font-medium'>Booking Details</h2>
                                                <div className='h-[30rem] overflow-y-scroll min-w-[55rem] flow'>
                                                    <table className='w-full mt-5'>
                                                        <tbody>
                                                            <tr>
                                                                <th>S.No</th>
                                                                <th>Name</th>
                                                                <th>Check In</th>
                                                                <th>Check Out</th>
                                                                <th>Status</th>
                                                                <th>Phone Number</th>
                                                                <th>Room Type</th>
                                                                <th>Actions</th>
                                                            </tr>
                                                            {
                                                                searchedData.length ? searchedData && searchedData.map((i, index) => {
                                                                    return <tr key={index}>
                                                                        <td>{index + 1}</td>
                                                                        <td>{i.name}</td>
                                                                        <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                                                                        <td>{`${date.getDate() + Math.floor(Math.random() * 3)}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                                                                        <td>{i.paidStatus ? <span className='text-green-700 border p-1 rounded-md border-green-700 text-sm'>Paid</span> : <span className='text-red-600 border p-1 rounded-md border-red-600 text-xs'>Not Paid</span>}</td>
                                                                        <td>{i.phoneNumber}</td>
                                                                        <td>{i.roomType}</td>
                                                                        <td className='text-xl'>
                                                                            <MdEditSquare className='inline me-4 text-blue-500' />
                                                                            <MdDelete className='inline text-red-700 cursor-pointer' />
                                                                        </td>
                                                                    </tr>
                                                                }) :
                                                                    data && data.map((i, index) => {
                                                                        return <tr key={index}>
                                                                            <td>{index + 1}</td>
                                                                            <td>{i.name}</td>
                                                                            <td>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                                                                            <td>{`${date.getDate() + Math.floor(Math.random() * 3)}-${date.getMonth() + 1}-${date.getFullYear()}`}</td>
                                                                            <td>{i.paidStatus ? <span className='text-green-700 border p-1 rounded-md border-green-700 text-sm'>Paid</span> : <span className='text-red-600 border p-1 rounded-md border-red-600 text-xs'>Not Paid</span>}</td>
                                                                            <td>{i.phoneNumber}</td>
                                                                            <td>{i.roomType}</td>
                                                                            <td className='text-xl'>
                                                                                <MdEditSquare className='inline me-4 text-blue-500' />
                                                                                <MdDelete className='inline text-red-700 cursor-pointer' />
                                                                            </td>
                                                                        </tr>
                                                                    })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
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