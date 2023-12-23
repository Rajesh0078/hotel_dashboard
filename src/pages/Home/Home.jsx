import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from "react-redux"
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { SlCalender } from "react-icons/sl";
import Calender from "react-calendar"
import axios from "axios"
import "./home.css"
import Cards from '../../components/Home_Cards/Cards'
import 'react-calendar/dist/Calendar.css';
import Ratings from '../../components/Ratings/Ratings'
import IncomeGraph from '../../components/Graphs/IncomeGraph'
import UserdataHome from '../../components/Home_Cards/UserdataHome'


const Home = () => {

    const navigate = useNavigate()
    const { user } = useSelector((user) => user.userReducer)
    const { decision } = useSelector((user) => user.sidebarReducer)
    const [date, setDate] = useState(new Date(2023, 10, 10))
    const [data, setData] = useState([])
    const [isDateVisible, setIsDateVisible] = useState(false)
    const [isLoading, setIsLoading] = useState(false)


    const navigation = () => {
        if (!user) {
            navigate('/auth/login')
        }
    }

    const changeHandler = (e) => {
        setDate(e)
        setIsDateVisible(false)
    }


    const calenderHandler = () => {
        if (isDateVisible) {
            setIsDateVisible(false)
        } else {
            setIsDateVisible(true)
        }
    }


    const getDatabyDate = async () => {
        if (date.getMonth() === 10) {
            setIsLoading(true)
            const { data } = await axios.get(`https://hotel-dashboard-w4kx.onrender.com/api/hotels/${date.getDate()}`)
            if (data.data) {
                setData(data)
                setIsLoading(false)
            }
            else {
                setData([])
            }
        } else {
            setData([])
        }
    }

    useEffect(() => {
        navigation()
        getDatabyDate()
    }, [user, date])

    return (
        <>
            {
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
                            !isLoading ?
                                <main className='bg-[#f0f3fb] h-full w-full lg:ms-[20%] px-3 py-7'>
                                    <div className='pt-12 px-4'>
                                        <div className='sm:flex justify-between px-3 '>
                                            <div className='sm:block flex justify-between sm:pb-0 pb-3'>
                                                <h2 className='lg:text-2xl md:text-xl font-semibold text-blue-600 mb-1'>Hi, Welcome Back!</h2>
                                                <p className='md:text-xl text-md text-gray-600'>Spark Dashboard</p>
                                            </div>
                                            <div className='flex lg:gap-7 flex-wrap justify-between sm:gap-3  text-gray-600 md:text-md'>
                                                <div className='me-6 relative z-0'>
                                                    <div onClick={calenderHandler} className=' cursor-pointer'>
                                                        <h2>Choose date <SlCalender className='sm:inline ms-3 hidden' /></h2>
                                                        <p className='lg:pt-2 pt-1'>{`${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`}</p>
                                                    </div>
                                                    {
                                                        isDateVisible &&
                                                        <div className='absolute top-15 left-[-10%] w-[22rem]'>
                                                            <Calender onChange={changeHandler} value={date} />
                                                        </div>
                                                    }
                                                </div>
                                                <div className=''>
                                                    <h2>Customer Ratings</h2>
                                                    {
                                                        data.data && <Ratings data={data.data} />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        {data.data ? <Cards data={data.data} /> : <center className='mt-12 text-2xl '>Choose Date only in the november month</center>}
                                    </div>
                                    {data.data &&
                                        <div className='flex px-5 gap-5'>
                                            <div className='h-[20rem] basis-2/3 bg-white rounded-xl sm:block hidden shadowx'></div>
                                            <div className='sm:basis-1/3 w-full bg-white h-[20rem] shadowx rounded-xl py-2 flex justify-center'>
                                                {data.data && <IncomeGraph data={data.data} />}
                                            </div>
                                        </div>
                                    }
                                    {data.data && <UserdataHome data={data.data.attributes.usersData} date={date} />}
                                </main> : <div className='flex justify-center h-full w-full items-center lg:ms-[20%]'>
                                    <div className='loader-x'></div>
                                </div>
                        }
                    </div>
                </div >
            }
        </>
    )
}

export default Home