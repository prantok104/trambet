import React from 'react'

const ContactCard = ({icon, title, content}) => {
  return (
    <div className='contact-card d-flex align-items-center gap-2 df-radius p-3'>
      <div className='contact-card-icon'>
         {icon}
      </div>
      <div className="contact-card-conent">
         <h6>{title}</h6>
         <div>{content}</div>
      </div>
    </div>
  )
}

export default ContactCard