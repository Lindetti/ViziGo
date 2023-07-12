import "./Pages.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

const Comedy = () => {
const getShowsUrl = `https://api.tvmaze.com/shows`;
const [comedy, setComedy] = useState([]);

useEffect(() => {
    fetch(getShowsUrl)
      .then((response) => response.json())
      .then((shows) => {
        const comedyShows = shows.filter((show) => show.genres.includes("Comedy"));
        setComedy(comedyShows);
        console.log(comedyShows)
      });
  }, []);

    return (
        <div className="all-wrapper"> 
        <div className="all-content-wrapper">
        <h1>Comedy</h1>
        <div className="all-content">
        {comedy.slice(0, 66).map((show, index) => {
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

export default Comedy;