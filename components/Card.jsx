import React from 'react'

const Card = ({header="Card Header",filter, children}) => {
  return (
    <div className="card">
      <div className="card-header">
         {header}
         {filter??''}
      </div>
        <div className='card-body'>
           {children??'content'}
      </div>
   </div>
  )
}

export default Card