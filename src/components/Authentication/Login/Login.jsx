import React, { useEffect, useState } from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { FaFacebookSquare, FaGoogle, FaLinkedin, FaTwitter } from "react-icons/fa"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { fetchUserSuccess } from '../../../store/actions/userAction'
import { toast } from "react-toastify"
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [isValid, setIsValid] = useState({
        email: false,
        password: false
    })
    const [isThere, setIsThere] = useState({
        email: true,
        password: true
    })
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    const blurHandler = (e) => {
        const { value, name } = e.target
        if (!value) {
            setIsValid({ ...isValid, [name]: false });
            setIsThere({ ...isThere, [name]: false })
        }
    }
    const focusHandler = (e) => {
        const { name } = e.target
        setIsValid({ ...isValid, [name]: true })
        setIsThere({ ...isThere, [name]: true })
    }

    const changeHandler = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const getUser = async (token) => {
        const { data } = await axios.get("https://hotel-dashboard-w4kx.onrender.com/api/users/me?populate=*", {
            headers: {
                Authorization: `bearer ${token}`
            }
        })
        if (data) {
            toast.success("Logged in successfully!")
            const userx = JSON.stringify(data)
            console.log(data)
            dispatch(fetchUserSuccess(userx))
            localStorage.setItem('user', userx)
            navigate('/')
        }
    }

    const loginHandler = async (e) => {
        e.preventDefault()
        if (formData.email.length) {
            try {
                const { data } = await axios.post('https://hotel-dashboard-w4kx.onrender.com/api/auth/local', { identifier: formData.email, password: formData.password })
                if (data.jwt) {
                    getUser(data.jwt)
                }
            } catch (error) {
                if (error.response) {
                    toast.error(error.response.data.error.message)
                }
            }
        }
    }

    return (
        <div className='login_container'>
            <div className='img_container hidden md:block'>
                <img src="/assets/4433257_2352520.jpg" alt="pic-1" />
            </div>
            <div className='login_content my-auto'>
                <b className='text-3xl'>Welcome to Spark Hotels</b>
                <p className='text-[#96a2b4] mt-2 mb-6 text-md'>Need an account? <Link to={'/auth/signup'} className=" text-purple-600 text-xl font-medium">Sign Up</Link></p>
                <h2 className='text-3xl font-semibold'>Sign in</h2>
                <form className='mt-6'>
                    <div className='relative mb-3 h-[5rem] '>
                        <label htmlFor="email" className={`${isValid.email ? "activex" : ""} label-x`}>Email*</label>
                        <input type="text" id='email' name='email' className='border border-gray-500 outline-none w-full p-4 bg-transparent rounded-md'
                            onBlur={blurHandler}
                            onFocus={focusHandler}
                            onChange={changeHandler}
                            autoComplete='off'
                        />
                        {!isThere.email && <p className='text-red-600 text-xs ps-2 pt-1'>Email is required</p>}
                    </div>
                    <div className='relative mb-3 h-[5rem]'>
                        <label htmlFor="password" className={`${isValid.password ? "activex" : ""} label-x`}>Password*</label>
                        <input type="password" id='password' name='password' className='border border-gray-500 outline-none w-full p-4 bg-transparent rounded-md'
                            onFocus={focusHandler}
                            onBlur={blurHandler}
                            onChange={changeHandler}
                            autoComplete='off'
                        />
                        {!isThere.password && <p className='text-red-600 text-xs ps-2 pt-1'>Password is required</p>}
                    </div>
                    <div className='flex relative justify-between'>
                        <div className='flex items-center'>
                            <input type="checkbox" name="remember" id="remember" className='me-1 ' />
                            <label htmlFor="remember" className='text-md '>Remember</label>
                        </div>
                        <p>Forgot Password?</p>

                    </div>
                    <button className='btn mt-10' disabled={!formData.email || !formData.password} onClick={loginHandler}>Login</button>
                </form>
                <p className='text-center my-5'>or</p>
                <div className='flex gap-8 justify-center text-gray-500'>
                    <FaGoogle className='cursor-pointer' />
                    <FaTwitter className='cursor-pointer' />
                    <FaFacebookSquare className='cursor-pointer' />
                    <FaLinkedin className='cursor-pointer' />
                </div>
            </div>
        </div>
    )
}

export default Login