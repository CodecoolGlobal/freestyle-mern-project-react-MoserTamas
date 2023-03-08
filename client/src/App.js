import "./App.css";
import React, { useState } from "react";
import Film from "./Film.js";
import Details from "./Details";

function App() {
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState([]);
  const [details, setDetails] = useState({});

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.value);
    // console.log(event.target);
    console.log(title);
    fetch("http://www.omdbapi.com/?apikey=d9870200&s=" + title) // --> films
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        setMovie(data.Search);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleFavourites = () => {
    //add to the Mongo DB collection
    // console.log("We have to do something with this stuff");
    // console.log(details);
    fetch("http://localhost:3001/favourites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(details),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDetails = (e) => {
    let url = `https://www.omdbapi.com/?apikey=d9870200&i=${e.target.dataset.id}`;

    fetch(url) // --> film details
      .then((res) => {
        if (res.ok) {
          console.log("successful get");
        } else {
          console.log("failed");
        }
        return res;
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setDetails(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>
          Search for this movie:
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <button type="submit">Search!</button>
      </form>
      <hr></hr>
      {movie &&
        movie.map((film, index) => (
          <div key={index}>
            <Film
              title={film.Title}
              year={film.Year}
              poster={film.Poster}
              type={film.Type}
            />
            <button
              type="button"
              className="favButton"
              onClick={handleFavourites}
            >
              Add to favourites
            </button>
            <button type="button" onClick={getDetails} data-id={film.imdbID}>
              Details
            </button>
            {details.imdbID === film.imdbID ? (
              <Details
                actors={details.Actors}
                genre={details.Genre}
                plot={details.Plot}
                writers={details.Writer}
                directors={details.Director}
                type={details.Type}
                rating={details.imdbRating}
                runtime={details.Runtime}
              />
            ) : null}
            <hr></hr>
          </div>
        ))}
    </div>
  );
}

export default App;
