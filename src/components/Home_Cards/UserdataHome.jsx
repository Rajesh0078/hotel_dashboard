import React from 'react'
import './userdata.css'
import { MdDelete, MdEditSquare } from 'react-icons/md'

const UserdataHome = ({ data, date }) => {
    return (
        <div className='w-full px-5 mt-5'>
            <div className='w-full overflow-x-auto flow bg-white  shadowx rounded-xl p-4'>
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
    )
}

export default UserdataHome