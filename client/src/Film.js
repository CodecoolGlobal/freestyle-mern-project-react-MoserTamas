import React from 'react'

function Film(props) {
    //console.log(props);
  return (
    <div className='movie'>
        Title: {props.title}
        Year of release: {props.year}
        Type: {props.type}

        <img src={props.poster} alt="poster"/>
    </div>
  )
}

export default Film
