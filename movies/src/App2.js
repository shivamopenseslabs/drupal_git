import React, { useEffect, useState } from "react";
import axios from "axios";

function App2() {
  const [movies, setMovies] = useState([]);
  const [searchMovie, setSearchMovie] = useState("");
  let [filteredMovies , setFilteredMovies] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8081/jsonapi/node/movies").then((res) => {
      setMovies(res.data.data);
    });
    setFilteredMovies();
  }, []);

  // Filter movies based on the entered searchMovie text.
  function searchedMovie() {
    const filteredMovies = movies.filter((item) =>
     console.log(item)
    );
    console.log("filteredMovies"  ,filteredMovies)
    // return filteredMovies;
  }

  return (
    <div>
      <h1>Movies Dashboard</h1>
      <header>
        <div>
          <input
            type="text"
            placeholder="Search the movie"
            onChange={(e) => setSearchMovie(e.target.value)}
            value={searchMovie}
          />
        </div>
      </header>

      <div className="movies">
        {movies.map((item, index) => (
          <div className="movie" key={index}>
            <h1>Movie name: {item.attributes.field_movie_name}</h1>
            <h2>Cost: {item.attributes.field_cost}</h2>
            <h1>Category: {item.attributes.field_category}</h1>
            <h1>Total Seats: {item.attributes.field_total_seats}</h1>
            <h1>Seats Booked: {item.attributes.field_seats_booked}</h1>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App2;
