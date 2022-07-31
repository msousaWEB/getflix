import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";
import "./MoviesGrid.css";

const moviesURL = import.meta.env.VITE_API;
const apiKEY = import.meta.env.VITE_API_KEY;


const Home = () => {
    const [topMovies, setTopMovies] = useState([])
    const getTopRatedMovies = async (url) => {
        const response = await fetch(url)
        const data = await response.json(); 

        setTopMovies(data.results);
    };

    useEffect(() => {
        const topRatedUrl = `${moviesURL}top_rated?${apiKEY}&language=pt-BR`;
        getTopRatedMovies(topRatedUrl);
    }, []);
  return (
    <div className="container">
        <h2 className="title">Melhores filmes</h2>
        <div className="movies-container">
            {topMovies.length === 0 && <p>Crregando...</p>}
            {topMovies.length > 0 && 
                topMovies.map((movie) => 
                <MovieCard key={movie.id} movie={movie}/>
            )}
        </div>
    </div>
  )
}

export default Home