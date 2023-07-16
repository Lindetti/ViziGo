import "./Pages.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

const Adventure = () => {
const getShowsUrl = `https://api.tvmaze.com/shows`;
const [adventure, setAdventure] = useState([]);

useEffect(() => {
    fetch(getShowsUrl)
      .then((response) => response.json())
      .then((shows) => {
        const adventureShows = shows.filter((show) => show.genres.includes("Adventure"));
        setAdventure(adventureShows);
      });
  }, []);

    return (
        <div className="all-wrapper"> 
        <div className="all-content-wrapper">
        <div className="all-title">
       <h1>Adventure</h1>
       </div>
        <div className="all-content">
        {adventure.slice(0, 48).map((show, index) => {
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

export default Adventure;