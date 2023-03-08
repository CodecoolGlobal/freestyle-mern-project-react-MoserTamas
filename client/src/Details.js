import React from "react";

export default function Details(props) {
  return (
    <div className="details">
      Actors: {props.actors}
      <br></br>
      Director:{props.directors}
      <br></br>
      Genre:{props.genre} <br></br>
      Plot: {props.plot}
      <br></br>
      Runtime:{props.runtime}
      <br></br>
      Type: {props.type}
      <br></br>
      Writer: {props.writers}
      <br></br>
      imdb rating: {props.rating}
      <br></br>
    </div>
  );
}
