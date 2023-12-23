import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Department = () => {
    const navigate = useNavigate()
    const { user } = useSelector((user) => user.userReducer)


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
                <div className='sidebar col-span-2 h-full'>
                    {
                        user && <Sidebar user={JSON.parse(user)} />
                    }
                </div>
                <div className='col-span-10 '>
                    <header className='fixed top-0 left-[17%] right-0 '>
                        <Header />
                    </header>
                    <main className='bg-[#f0f3fb] h-[50rem] w-full ms-[20%] px-3 py-7'>
                        hi
                    </main>
                </div>
            </div>
        </>
    )
}

export default Department