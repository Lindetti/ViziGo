import "./Pages.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

const Horror = () => {
const getShowsUrl = `https://api.tvmaze.com/shows`;
const [horror, setHorror] = useState([]);

useEffect(() => {
    fetch(getShowsUrl)
      .then((response) => response.json())
      .then((shows) => {
        const horrorShows = shows.filter((show) => show.genres.includes("Horror"));
        setHorror(horrorShows);
        console.log(horrorShows)
      });
  }, []);

    return (
        <div className="all-wrapper"> 
        <div className="all-content-wrapper">
        <h1>Horror</h1>
        <div className="all-content">
        {horror.slice(1, 19).map((show, index) => {
            return (
                <div key={index} className="all-shows">
                  <div className="all-shows-image">
                  <Link to={`/info/${show.id}`}>
      <img src={show.image.medium} alt="tv-show-image" />
    </Link>
                  </div>
                  <div className="all-shows-title">
                    <p>{show.name}</p>
                  </div>
                </div>
            )
        })}
        </div>
        </div>
        
        </div>
    )
}

export default Horror;