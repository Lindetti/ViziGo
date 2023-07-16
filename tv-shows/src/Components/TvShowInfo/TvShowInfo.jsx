import "./TvShowInfo.css";
import React, { useEffect, useState, useRef} from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";


const TvShowInfo = () => {
  const { id } = useParams();
  const [showInfo, setShowInfo] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const getShowsUrl = `https://api.tvmaze.com/shows`;

  useEffect(() => {
    const fetchShowInfo = () => {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setShowInfo(data);
          fetchRelatedShows(data.genres);
        })
        .catch((error) => {
          console.error("Error fetching show information:", error);
        });
    };

    const fetchRelatedShows = () => {
      fetch(getShowsUrl)
        .then((response) => response.json())
        .then((data) => {
          const showsWithImage = data
            .filter((show) => show.image && show.image.medium) // Filter shows with image
            .sort(() => 0.5 - Math.random()); // Shuffle shows randomly
        
          const randomShows = showsWithImage.slice(0, 5); // Select first 5 random shows
          setRelatedShows(randomShows);
        })
        .catch((error) => {
          console.error("Error fetching related shows:", error);
        });
    };

    fetchShowInfo();
  }, [id]);


  if (showInfo.length === 0) {
    return <div>Loading...</div>;
  }

  const backgroundImage = {
    backgroundImage: showInfo.image && showInfo.image.original ? `url(${showInfo.image.original})` : "",
  };


  const sanitizedSummary = showInfo.summary ? showInfo.summary.replace(/<[^>]+>/g, '') : '';


  return (
    <div className="tvshowinfo-wrapper" style={backgroundImage}>
    <div className="tvShow-content">
    <div className="base-content">

    <div className="tvshowinfo-image-div">
    <div className="tvShow-image">
    {showInfo.image && showInfo.image.original && (
                <img src={showInfo.image.original} alt="image" />
              )}
    </div>
  <button className="playNow">Play now</button>
  <button className="trailer">Watch Trailer</button>
    </div>
    
    <div className="tvShow-info-div">
    <div className="title-info-div">
    <h1 className="show-name">{showInfo.name || "Unknown"}</h1>

     <div className="title-info">
        <div className="title-movie-info">
        <div className="genres">
    {showInfo.genres.map((genre, index) => {
      return <p className="show-genres" key={index}>{genre}</p>;
    })}
  </div>
        <div className="show-first-info">
        <p className="first-line">|</p>
        <p>{showInfo.premiered.split("-")[0]}</p>
        <p>|</p>
        <p>{showInfo.runtime === null ? "Runtime no info" : `${showInfo.runtime} min`}</p>
        </div>
        </div>

        <div className="title-buttons">
        <a href="#">Watch Later</a>
        <a href="#">Share</a>
        </div>
     </div>

    </div>
    <div className="story">
    <p className="info-title">The Story</p>
    <hr className="story-hr" />
    <p>{sanitizedSummary}</p>
    </div>

    <div className="information-div">
     <div className="information">
    <p className="info-title">Information</p>
    <hr className="information-hr" />
    <p className="information-class"> Production Company: {showInfo.network?.name || "Unknown"} </p>
    <p className="information-class">Rating: {showInfo.rating?.average} </p>
    <p className="information-class">Released: {showInfo.premiered}</p>
    <p className="information-class">Status: {showInfo.status || "Unknown"}</p>
    {showInfo.webChannel !== null ? (
      <p className="information-class">Watch on: {showInfo.webChannel?.name} </p>
    ) : (
      <p></p>
    )}
     </div>

     <div className="languages">
      <p className="info-title">Languages</p>
      <hr className="language-hr" />
      <p className="language-class">{showInfo.language}</p>
     </div>
    </div>

    <div className="related-shows">
     <p className="info-title">Other shows</p>
     <hr className="other-hr" />
     <div className="related-shows-content">

              {relatedShows.slice(0, (window.innerWidth < 600 ? 4 : 5)).map((show) => (
                <div className="related-show-div" key={show.id}>
          <div className="related-show-image">
          <Link to={`/info/${show.id}`}>
                       {show.image && (
          <img src={show.image.medium || show.image.original} alt="image" />
        )}
    </Link>
          </div>
    <p className="tvShow-info-name">{show.name}</p>
                </div>
              ))}
                   </div>
     </div>
    </div>

    </div>

    </div>
    </div>
  );
};

export default TvShowInfo;