import React from 'react'

const Card = ({header,filter, children}) => {
  return (
    <div className="card">
      {header || filter ? <div className="card-header">
         {header}
         {filter??''}
      </div>: ''}
        <div className='card-body'>
           {children??'content'}
      </div>
   </div>
  )
}

export default Card