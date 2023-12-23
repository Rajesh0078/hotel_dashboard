import React, { useState } from 'react'
import './register.css'
import { FaEye, FaEyeSlash, FaFacebookSquare, FaGoogle, FaLinkedin, FaTwitter, FaUserAlt } from "react-icons/fa"
import { MdEmail } from "react-icons/md"
import { Link } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from "react-router-dom"

const Register = () => {

    const navigate = useNavigate()

    const [isValid, setIsValid] = useState({
        username: false,
        email: false,
        password: false,
        cpassword: false
    })
    const [isThere, setIsThere] = useState({
        username: true,
        email: true,
        password: true,
        cpassword: true
    })
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        cpassword: ''
    })
    const [isPasswordVisible, setIsPasswordVisible] = useState({
        password: false,
        cpassword: false
    })

    const blurHandler = (e) => {
        const { value, name } = e.target
        if (!value) {
            setIsValid({ ...isValid, [name]: false });
            setIsThere({ ...isThere, [name]: false })
        }
    }

    const focushandler = (e) => {
        const { name } = e.target
        setIsValid({ ...isValid, [name]: true })
        setIsThere({ ...isThere, [name]: true })
    }

    const changeHandler = (e) => {
        const { value, name } = e.target
        setFormData({ ...formData, [name]: value })
    }

    const seenHandler = (e) => {
        const { parentElement } = e.target
        var name;
        if (parentElement.tagName === "DIV") {
            parentElement.childNodes[0].type = "text"
            name = parentElement.childNodes[0].name
        } else {
            const parent = parentElement.parentElement
            parent.childNodes[0].type = "text"
            name = parent.childNodes[0].name
        }
        setIsPasswordVisible({ ...isPasswordVisible, [name]: true })
    }

    const closeHandler = (e) => {
        const { parentElement } = e.target
        var name;
        if (parentElement.tagName === "DIV") {
            parentElement.childNodes[0].type = "password"
            name = parentElement.childNodes[0].name
        } else {
            const parent = parentElement.parentElement
            parent.childNodes[0].type = "password"
            name = parent.childNodes[0].name
        }
        setIsPasswordVisible({ ...isPasswordVisible, [name]: false })
    }

    const userCreate = async () => {
        try {
            if (formData.password.length >= 6) {
                await axios.post('https://hotel-dashboard-w4kx.onrender.com/api/auth/local/register', formData)
                toast.success("User created Successfully")
                setFormData({
                    username: '',
                    email: '',
                    password: '',
                    cpassword: ''
                })
                navigate('/auth/login')
            }
            else {
                toast.info("Password must have 6 characters")
            }
        } catch (error) {
            console.log(error)
        }
    }

    const checkUserIfExists = (data) => {
        const matchEmail = data.filter((email) => email.email === formData.email)
        const matchUserName = data.filter((username) => username.username === formData.username)
        if (matchUserName.length) {
            toast.warn("UserName already exists")
        }
        if (matchEmail.length) {
            toast.warn("Email already exists")
        }
        if (!matchEmail.length && !matchUserName.length) {
            userCreate()
        }
    }

    const clickHandler = async (e) => {
        e.preventDefault()
        const response = await axios.get('https://hotel-dashboard-w4kx.onrender.com/api/users')
        checkUserIfExists(response.data)
    }


    return (
        <div className='flex min-h-screen justify-center'>
            <div className='basis-1/2 bg-slate-100 md:block hidden px-2'>
                <img src="/assets/2331283.jpg" alt="register_img" className=' object-cover object-center h-full image' />
            </div>
            <div className='basis-1/2 form_section my-auto'>
                <div className="auth_wrapper">
                    <h2 className='text-3xl font-[500]'>Sign Up</h2>
                    <p className='text-[#96a2b4] text-xl mt-2 mb-8'>Enter details to create your account</p>
                    <form className='flex flex-col gap-3'>
                        <div className='h-[5rem]'>
                            <div className='relative border_x p-4 rounded-md'>
                                <input type="text" id='username' name='username' autoComplete='off'
                                    onBlur={blurHandler}
                                    onFocus={focushandler}
                                    onChange={changeHandler}
                                />
                                <label className={`absolute left-3 cursor-text ${isValid.username ? "active_x" : ""}`} htmlFor="username">Username*</label>
                                <FaUserAlt className='inline text-xl' />
                            </div>
                            {!isThere.username && <p className='ms-2 text-xs mt-1 text-red-600'>Username is required*</p>}
                        </div>

                        <div className='h-[5rem]'>
                            <div className='relative border_x p-4 rounded-md'>
                                <input type="email" id='email' name='email' autoComplete='off'
                                    onBlur={blurHandler}
                                    onFocus={focushandler}
                                    onChange={changeHandler}
                                />
                                <label className={`absolute left-3 cursor-text ${isValid.email ? "active_x" : ""}`} htmlFor="email">Email*</label>
                                <MdEmail className='inline text-xl' />
                            </div>
                            {!isThere.email && <p className='ms-2 text-xs mt-1 text-red-600'>Email is required*</p>}
                        </div>
                        <div className='h-[5rem]'>
                            <div className='relative border_x p-4 rounded-md'>
                                <input type="password" id='password' name='password' autoComplete='off'
                                    onBlur={blurHandler}
                                    onFocus={focushandler}
                                    onChange={changeHandler}
                                />
                                <label className={`absolute left-3 cursor-text ${isValid.password ? "active_x" : ""}`} htmlFor="password">Password*</label>
                                {!isPasswordVisible.password && <FaEyeSlash className='inline text-xl' onClick={seenHandler} />}
                                {isPasswordVisible.password && <FaEye className='inline text-xl' onClick={closeHandler} />}
                            </div>
                            {!isThere.password && <p className='ms-2 text-xs mt-1 text-red-600'>Password is required*</p>}
                        </div>
                        <div className='h-[5rem]'>
                            <div className='relative border_x p-4 rounded-md'>
                                <input type="password" id='cpassword' name='cpassword' autoComplete='off'
                                    onBlur={blurHandler}
                                    onFocus={focushandler}
                                    onChange={changeHandler}
                                />
                                <label className={`absolute left-3 cursor-text ${isValid.cpassword ? "active_x" : ""}`} htmlFor="cpassword">Confirm Password*</label>
                                {!isPasswordVisible.cpassword && <FaEyeSlash className='inline text-xl' onClick={seenHandler} />}
                                {isPasswordVisible.cpassword && <FaEye className='inline text-xl' onClick={closeHandler} />}
                            </div>
                            {!isThere.cpassword && <p className='ms-2 text-xs mt-1 text-red-600'>Confirm Password is required*</p>}
                        </div>
                        <p className='text-sm mb-2'>Already Registered? <Link to={'/auth/login'} className='text-blue-600 ms-1'>Login</Link></p>
                        <button className='btn' disabled={!formData.username || !formData.password || !formData.email || !formData.cpassword} onClick={clickHandler}>Register</button>
                    </form>
                    <p className='text-center my-4'>OR</p>
                    <div className='flex gap-8 justify-center text-gray-500'>
                        <FaGoogle className='cursor-pointer' />
                        <FaTwitter className='cursor-pointer' />
                        <FaFacebookSquare className='cursor-pointer' />
                        <FaLinkedin className='cursor-pointer' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register