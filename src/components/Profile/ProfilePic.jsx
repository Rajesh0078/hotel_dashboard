import React from 'react'
import { FaUser } from 'react-icons/fa6'
import axios from "axios"
import { useSelector } from 'react-redux'

const ProfilePic = () => {
    const { user } = useSelector((user) => user.userReducer)
    const userx = JSON.parse(user)

    const upateUserAvatarId = async (avatarId, avatarUrl) => {
        try {
            const token = localStorage.getItem('jwt');
            await axios.put(
                `http://localhost:1337/api/users/${userx.id}`,
                { avatarId, avatarUrl },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.log({ error });
        }
    };


    const profileUpadate = async (files) => {
        const token = localStorage.getItem('jwt')
        const { data: [{ id, url }] } = await axios.post(`http://localhost:1337/api/upload`, files, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `bearer ${token}`,
            },
        });
        upateUserAvatarId(id, url);
        console.log(url)
    }

    const profileUploadhandler = (e) => {
        const { type } = e.target.files[0]
        const file = e.target.files[0]
        const files = new FormData()
        files.append('files', file)

        if (type === 'image/png') {
            profileUpadate(files)
        }
    }

    return (
        <div className='flex flex-col items-center justify-center h-full gap-2'>
            <FaUser className='text-4xl' />
            <input type="file" name="file" id="file" accept='image/*' className='w-full text-xs overflow-hidden hidden' onChange={profileUploadhandler} />
            <label htmlFor="file" className='text-xs px-1 py-1 border border-gray-400 rounded-md'>select profile</label>
        </div>
    )
}

export default ProfilePic