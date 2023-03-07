import './App.css';
import React, { useState } from 'react';
import Film from './Film.js';

function App() {

  const [title, setTitle] = useState('');
  const [movie, setMovie] = useState([])

  function handleSubmit(event) {
    event.preventDefault();
    // console.log(event.target.value);
    // console.log(event.target);
    console.log(title);
    fetch('http://www.omdbapi.com/?apikey=d9870200&s=' + title)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setMovie(data.Search);
      })
      .catch(error => {
        console.log(error);
      })

  }



  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <label>Search for this movie:

          <input type="text" value={title} onChange={event => setTitle(event.target.value)} />
        </label>
        <button type='submit'>Search!</button>
      </form>
      {movie &&
      (
        movie.map((film, index) => (
          <div key={index}>
            <Film
              title={film.Title} />
          </div>
        ))
        )}
    </div>
  );
}

export default App;
