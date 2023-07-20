import "./Pages.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

const Action = () => {
const getShowsUrl = `https://api.tvmaze.com/shows`;
const [action, setAction] = useState([]);

useEffect(() => {
    fetch(getShowsUrl)
      .then((response) => response.json())
      .then((shows) => {
        const actionShows = shows.filter((show) => show.genres.includes("Action"));
        setAction(actionShows);
  
      });
  }, []);

    return (
        <div className="all-wrapper"> 
        <div className="all-content-wrapper">
          <div className="title-wrapper">
       <div className="all-title">
       <h1>Action</h1>
       </div>
       </div>
        <div className="all-content">
        {action.slice(0, 48).map((show, index) => {
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

export default Action;