import React from 'react'

function Film(props) {
    console.log(props);
  return (
    <div>
      {props.title}
    </div>
  )
}

export default Film
