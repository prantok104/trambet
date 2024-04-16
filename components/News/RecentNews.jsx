import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const RecentNews = ({image, title, time}) => {
  return (
    <div className='recent-news-area d-flex align-items-center gap-3 '>
      <Image src={image} alt={title} width={100} height={70} />
      <div className="recent-news-right-content">
         <Link href={'/'}>{title}</Link>
         <span>{time}</span>
      </div>
    </div>
  )
}

export default RecentNews