import React from 'react'
import { FaBed, FaIndianRupeeSign } from 'react-icons/fa6'
import { MdNoteAlt } from 'react-icons/md'

const Cards = ({ data }) => {
    return (
        <div className='flex flex-wrap w-full my-6 '>
            <div className='card px-5 py-6'>
                <div className='flex justify-between items-center'>
                    <div className='bg-purple-600 rounded-md shadow-xl p-2'>
                        <MdNoteAlt className='inline text-3xl text-white' />
                    </div>
                    <div className='text-center text-black'>
                        <p className='text-md '>Total Bookings</p>
                        <p className='md:text-2xl text-xl font-semibold'>{data.length && data[0].attributes.roomBookings.totalBookings}</p>
                    </div>
                </div>
                <div className='bg-slate-300 h-[.8rem] md:mt-11 mt-6'>
                    <div style={{ width: `${(data[0].attributes.roomBookings.totalBookings) * 100 / 40}%` }} className='bg-purple-600 h-full transition-all'></div>
                </div>
            </div>
            <div className='px-5 py-6 card'>
                <div className='flex justify-between items-center'>
                    <div className='bg-yellow-500 rounded-md shadow-xl p-2'>
                        <FaBed className='inline text-3xl text-white' />
                    </div>
                    <div className='text-center text-black'>
                        <p className='text-md '>Rooms Available</p>
                        <p className='md:text-2xl text-xl font-semibold'>{data.length && (40 - data[0].attributes.roomBookings.totalBookings)}</p>
                    </div>
                </div>
                <div className='bg-slate-300 h-[.8rem] md:mt-11 mt-6'>
                    <div style={{ width: `${(40 - data[0].attributes.roomBookings.totalBookings) * 100 / 40}%` }} className='bg-yellow-500 h-full transition-all'></div>
                </div>
            </div>
            <div className='px-5 py-6 card'>
                <div className='flex justify-between items-center'>
                    <div className='bg-green-600 rounded-md shadow-xl p-2'>
                        <FaIndianRupeeSign className='inline text-3xl text-white' />
                    </div>
                    <div className='text-center text-black'>
                        <p className='text-md '>Occupancy Rate</p>
                        <p className='md:text-2xl text-xl font-semibold'>{data.length && (data[0].attributes.occupancyRate)}%</p>
                    </div>
                </div>
                <div className='bg-slate-300 h-[.8rem] md:mt-11 mt-6'>
                    <div style={{ width: `${data.length && (data[0].attributes.occupancyRate)}%` }} className='bg-green-600 h-full transition-all'></div>
                </div>
            </div>
            <div className='px-5 py-6 card'>
                <div className='flex justify-between items-center'>
                    <div className='bg-blue-400 rounded-md shadow-xl p-2'>
                        <FaIndianRupeeSign className='inline text-3xl text-white' />
                    </div>
                    <div className='text-center text-black'>
                        <p className='text-md '>Toatal Revenue</p>
                        <p className='md:text-2xl text-xl font-semibold'>₹ {data.length && (data[0].attributes.totalRevenue)}</p>
                    </div>
                </div>
                <div className='bg-slate-300 h-[.8rem] md:mt-11 mt-6'>
                    <div style={{ width: `${(data[0].attributes.totalRevenue) / (129500) * 100}%` }} className='bg-blue-400 h-full transition-all'></div>
                </div>
            </div>
        </div>
    )
}

export default Cards