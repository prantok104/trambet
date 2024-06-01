import React from 'react'

const Card = ({header,filter, children, ...otherProps}) => {
  return (
    <div className="card" style={{ background: otherProps?.bg, marginTop: otherProps?.mt }} >
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