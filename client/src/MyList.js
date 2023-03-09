import React from "react";

function MyList(props) {
  return (
    <>
      <p>{props.title}</p>
      <p>{props.year}</p>
      <p>{props.genre}</p>
      <p>{props.plot}</p>
      <p>{props.actors}</p>
      <p>{props.writers}</p>
      <p>{props.directors}</p>
      <p>{props.type}</p>
      <p>{props.rating}</p>
      <p>{props.runtime}</p>
      <p>{props.poster}</p>
    </>
  );
}

export default MyList;
