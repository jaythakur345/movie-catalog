import React from 'react'

const Heading = (props) => {
  return (
    <div className='col my-3'>
        <h1>{props.heading}</h1>
    </div>
  )
}

export default Heading