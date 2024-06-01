import React from 'react'

const ItemCard = ({title, icon, content, ...otherProps}) => {
  return (
    <div className='item-card-area bg-shadow df-radius px-3 py-4 mb-4 text-center' {...otherProps}>
      <h4>{content}</h4>
      <div className='item-card-title-area d-flex align-items-center justify-content-center gap-2'>
         {icon} <span className='item-card-title'>{title}</span>
      </div>
    </div>
  )
}

export default ItemCard