import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieCard from "../components/MovieCard";

const searchURL = import.meta.env.VITE_SEARCH;
const apiKEY = import.meta.env.VITE_API_KEY;

import "./MoviesGrid.css";

const Search = () => {
  const [searchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const query = searchParams.get("q");

  const getSearchedMovies = async (url) => {
    const response = await fetch(url)
    const data = await response.json(); 

    setMovies(data.results);
};

  useEffect(() => {
      const searchQueryURL = `${searchURL}?${apiKEY}&query=${query}&language=pt-BR`;
      getSearchedMovies(searchQueryURL);
  }, [query]);
    return (
      <div className="container">
        <h2 className="title">
          Resultados para: <span className="query-text">{query}</span>
        </h2>
        <div className="movies-container">
            {movies.length === 0 && <p>Crregando...</p>}
            {movies.length > 0 && 
                movies.map((movie) => 
                <MovieCard key={movie.id} movie={movie}/>
            )}
        </div>
    </div>
    )
  }
  
  export default Search