import React from "react";

function MyList(props) {
  return (
    <>
      <h1>title: {props.title}</h1>
      <p>year of release: {props.year}</p>
      <p>genre: {props.genre}</p>
      <p>story: {props.plot}</p>
      <p>actors: {props.actors}</p>
      <p>writers: {props.writers}</p>
      <p>directors: {props.directors}</p>
      <p>type: {props.type}</p>
      <p>rating: {props.rating}</p>
      <p>runtime: {props.runtime}</p>
      <img src={props.poster} alt="poster" />
      <p>seen: {props.seen}</p>
    </>
  );
}

export default MyList;
