import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClock
} from "@fortawesome/free-solid-svg-icons";
const NewsCard = ({image="/placeholder.jpeg", time="2024-04-16 12:24 am", title="title", content="content", link="/"}) => {
  return (
    <div className='news-card-area'>
      <Image src={image} alt={title} width="300" height="180" style={{ width: '100%'}} quality="100" />
      <div className="p-3">
         <div className='news-time'>
         <FontAwesomeIcon icon={faClock} /> {time}
      </div>
      <div className="news-content">
         <Link className='news-title' href={link}>{title}</Link>
         <div className='news-just-content'>
            {content}
         </div>
            <Link className="news-read-more" href={link}>Read More</Link>
      </div>
      </div>
    </div>
  )
}

export default NewsCard