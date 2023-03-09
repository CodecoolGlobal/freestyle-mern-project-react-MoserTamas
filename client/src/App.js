import "./App.css";
import React, { useState } from "react";
import Film from "./Film.js";
import MyList from "./MyList";
import Details from "./Details";
import { Routes, Route, useNavigate, BrowserRouter } from "react-router-dom";

function App() {
  //const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [movie, setMovie] = useState([]);
  const [details, setDetails] = useState({});
  const [myList, setMyList] = useState([]);
  const [showTheList, setShowTheList] = useState(false);

  const navigateToFavourites = () => {
    // 👇️ navigate to /favourites
    // navigate("/favourites");
  };

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

  const handleShowButton = (event) => {
    console.log("somewhere we have to show the list");
    //navigateToFavourites();
    getMyList();
    setShowTheList(true);
  };

  const getMyList = () => {
    fetch("http://localhost:3001/favourites")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setMyList(data);
      })
      .catch((err) => console.log(err));
  };

  const handleBackButton = (event) => {
    //console.log("somewhere we have to show the list");
    //navigateToFavourites();
    setShowTheList(false);
  };

  const handleDeleteButton = (event) => {
    console.log(event.target.dataset.id);
    let url = "http://localhost:3001/delete/" + event.target.dataset.id;
    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application.json",
      },
    })
      .then((res) => {
        if (res.ok) {
          console.log("DELETE request was successful");
        } else {
          console.log("DEL request failed");
        }
        return res;
      })
      .then(getMyList)
      .catch((err) => console.log(err));
  };

  return (
    <div className="App">
      {showTheList ? (
        <>
          <button type="button" onClick={handleBackButton}>
            Back
          </button>
          {myList.map((film, index) => (
            <div key={index}>
              <MyList
                title={film.title}
                year={film.year}
                genre={film.genre}
                plot={film.plot}
                actors={film.actors}
                writers={film.writers}
                directors={film.directors}
                type={film.type}
                rating={film.rating}
                runtime={film.runtime}
                poster={film.poster}
              />{" "}
              <button
                type="button"
                onClick={handleDeleteButton}
                data-id={film._id}
              >
                Delete
              </button>
            </div>
          ))}
        </>
      ) : (
        <>
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
          <button type="button" onClick={handleShowButton}>
            Show my wish list
          </button>
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
                  Add to my wish list
                </button>
                <button
                  type="button"
                  onClick={getDetails}
                  data-id={film.imdbID}
                >
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
        </>
      )}
    </div>
  );
}

export default App;
