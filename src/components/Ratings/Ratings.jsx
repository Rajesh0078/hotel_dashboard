import React from 'react'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'
import { FaRegStar } from 'react-icons/fa6'

const Ratings = ({ data }) => {

    const averageRating = data.attributes.usersData.reduce((i, next) => i + next.rating, 0) / data.attributes.usersData.length


    const renderstars = () => {
        const fullStars = Math.floor(averageRating)
        const hasHalfStars = averageRating % 1 !== 0;

        const stars = [];

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={i} fill='#000011' className='text-[1.2rem]' />)
        }
        if (hasHalfStars) {
            stars.push(<FaStarHalfAlt key="half" fill='black' className=" text-[1.1rem]" />);
            const val = fullStars + 1
            if (val < 5) {
                let index = 5 - val
                for (let i = 0; i < index; i++) {
                    stars.push(<FaRegStar key={val + 1} fill='black' className='text-[1.17rem]' />)
                }
            }
        }
        return stars
    }
    return (
        <p className='flex gap-1 items-center lg:pt-2 pt-1'>
            {renderstars()}
            {`(${data.attributes.usersData.length})`}
        </p>
    )
}

export default Ratings