import "./TvShowInfo.css";
import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

const TvShowInfo = () => {
  const { id } = useParams();
  const [showInfo, setShowInfo] = useState([]);
  const [relatedShows, setRelatedShows] = useState([]);
  const [seasons, setSeasons] = useState([]);
  const getShowsUrl = `https://api.tvmaze.com/shows`;
  const Ended = "#f5424b";
  const running = "#47d677";

  useEffect(() => {
    window.scrollTo(0, 0);

    // Fetch Show Information
    const fetchShowInfo = () => {
      fetch(`https://api.tvmaze.com/shows/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setShowInfo(data);
          console.log(data);
          fetchRelatedShows(data.genres);
        })
        .catch((error) => {
          console.error("Error fetching show information:", error);
        });
    };

    // Fetch Related Shows
    const fetchRelatedShows = () => {
      fetch(getShowsUrl)
        .then((response) => response.json())
        .then((data) => {
          const showsWithImage = data
            .filter((show) => show.image && show.image.medium)
            .sort(() => 0.5 - Math.random());

          const randomShows = showsWithImage.slice(0, 5);
          setRelatedShows(randomShows);
        })
        .catch((error) => {
          console.error("Error fetching related shows: ", error);
        });
    };

    // Fetch Seasons
    const fetchSeasons = () => {
      fetch(`https://api.tvmaze.com/shows/${id}/seasons`)
        .then((response) => response.json())
        .then((data) => {
          setSeasons(data);
          console.log(data);
        })
        .catch((error) => {
          console.log("Error fetching seasons: ", error);
        });
    };

    // Call the fetch functions
    fetchShowInfo();
    fetchSeasons();
  }, [id]);

  if (showInfo.length === 0) {
    return <div>Loading...</div>;
  }

  const backgroundImage = {
    backgroundImage:
      showInfo.image && showInfo.image.original
        ? `url(${showInfo.image.original})`
        : "",
  };

  const sanitizedSummary = showInfo.summary
    ? showInfo.summary.replace(/<[^>]+>/g, "")
    : "";

  return (
    <div className="tvshowinfo-wrapper" style={backgroundImage}>
      <div className="tvShow-content">
        <div className="base-content">
          <div className="tvshowinfo-image-div">
            <div className="tvShow-image">
              {showInfo.image && showInfo.image.original ? (
                <img src={showInfo.image.original} alt="tv-show-image" />
              ) : (
                <p>No Image found</p>
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
                      return (
                        <p className="show-genres" key={index}>
                          {genre}
                        </p>
                      );
                    })}
                  </div>
                  <div className="show-first-info">
                    <p className="first-line">|</p>
                    <p>{showInfo.premiered.split("-")[0]}</p>
                    <p>|</p>
                    <p>
                      {showInfo.runtime === null
                        ? "Runtime no info"
                        : `${showInfo.runtime} min`}
                    </p>
                  </div>
                </div>

                <div className="title-buttons">
                  <div className="watch-later">
                    <img src="/watch-later.png" alt="icon" />
                    <a href="#">Watch Later</a>
                  </div>
                  <div className="share">
                    <img src="/share.png" alt="icon" />
                    <a href="#">Share</a>
                  </div>
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
                <div className="information-class">
                  <p>Production Company:</p>
                  <b> {showInfo.network?.name || "N/A"}</b>
                </div>
                <div className="information-class">
                  <p>Rating:</p>
                  <img src="/star.png" alt="rating-icon" />
                  <b>{showInfo.rating?.average}</b>
                </div>
                <div className="information-class">
                  <p>Seasons:</p>
                  <b>{seasons.length}</b>
                </div>
                <div className="information-class">
                  <p> Status:</p>
                  <b
                    style={{
                      color:
                        showInfo.status === "Ended" ? `${Ended}` : `${running}`,
                    }}
                  >
                    {showInfo.status || "Unknown"}
                  </b>
                </div>
                {showInfo.network.name !== null ? (
                  <div className="information-class">
                    <p>Watch on:</p>
                    <a href={showInfo.officialSite} target="_blank">
                      {showInfo.network.name}
                    </a>
                  </div>
                ) : (
                  <div className="information-class">
                    <p>Watch on:</p>
                    <b>Unavailable</b>
                  </div>
                )}
              </div>

              <div className="languages-other">
                <div className="languages">
                  <p className="info-title">Languages</p>
                  <hr className="language-hr" />
                  <p className="language-class">{showInfo.language}</p>
                </div>

                <div className="other-info">
                  <p className="info-title">Other</p>
                  <hr className="other-hr" />
                  <div className="other-info-div">
                    <div className="information-class">
                      <p>Ended:</p>
                      <b>
                        {showInfo.ended
                          ? showInfo.ended.substring(0, 4)
                          : "N/A"}
                      </b>
                    </div>
                    <div className="information-class">
                      <p>Type:</p>
                      <b> {showInfo.type || "N/A"}</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="related-shows">
              <p className="info-title">More shows</p>
              <hr className="more-hr" />
              <div className="related-shows-content">
                {relatedShows
                  .slice(0, window.innerWidth < 600 ? 4 : 5)
                  .map((show) => (
                    <div className="related-show-div" key={show.id}>
                      <div className="related-show-image">
                        <Link to={`/info/${show.id}`}>
                          {show.image && (
                            <img
                              src={show.image.medium || show.image.original}
                              alt="image"
                            />
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
