import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // to store the movies
  const [movies, setMovies] = useState([]);
  // for the filter the movies
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [categoryFilter, setCategoryFilter] = useState("");
  const [page , setPage] = useState(0);
  // for the filter by name
  const [nameFilter, setNameFilter] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/movies?page=${page}`)
      .then((response) => {
        console.log("data" ,response.data);
        setMovies(response.data);
        setFilteredMovies(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    // Apply filters whenever categoryFilter or nameFilter changes
    const filtered = movies.filter((movie) => {
      const categoryMatch =
        !categoryFilter || movie.field_category === categoryFilter;
      const nameMatch =
        !nameFilter ||
        movie.field_movie_nam
          .toLowerCase()
          .includes(nameFilter.toLowerCase());
      return categoryMatch && nameMatch;
    });
    setFilteredMovies(filtered);
  }, [categoryFilter, nameFilter, movies]);

  return (
    <div className="movie-dashboard">
      <div className="header">
        <h1>Movie Dashboard</h1>
      </div>
      <div className="filters">
        <input
          type="text"
          className="filter-input"
          placeholder="Filter by Movie Name"
          value={nameFilter}
          onChange={(e) => setNameFilter(e.target.value)}
        />
        <select
          className="filter-select"
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
        >
          <option value="" selected disabled>
            All Categories
          </option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Paterotic">Paterotic</option>
        </select>
      </div>
      <div className="movie-list">
        {filteredMovies.map((movie, index) => (
          <div key={index} className="movie-item">
            <h2 className="movie-name">
              Movie Name: {movie.field_movie_nam}
            </h2>
            <p>Movie Price: {movie.field_movie_cos}</p>
            <p>Genre: {movie.field_category}</p>
            <p>Seats Booked: {movie.field_seats_booked}</p>
            <p>Total Seats: {movie.field_t}</p>
          </div>
        ))}
      </div>
      <div className="footer">
        <button onClick={() => setPage(page - 1)}>Pre</button>
        <p>{page}</p>
        <button onClick={() => setPage(page - 1)}>Next</button>
      </div>
    </div>
  );
}

export default App;
