import React from 'react'
import Loading from '../loading'

const Description = ({description}) => {
  return (
    <div>
      <p> {description?.detail_description || <Loading /> } </p>
    </div>
  )
}

export default Description