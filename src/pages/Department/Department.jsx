import React, { useEffect } from 'react'
import Header from '../../components/Header/Header'
import Sidebar from '../../components/Sidebar/Sidebar'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Department = () => {
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

                        </main>
                    }
                </div>
            </div >
        </>
    )
}

export default Department