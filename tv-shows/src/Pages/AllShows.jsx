import "./Pages.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const AllShows = () => {
  const [allShows, setAllShows] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [page, setPage] = useState(1);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows?page=${page}`)
      .then((response) => response.json())
      .then((shows) => {
        const filteredShows = shows.filter((show) => show.image && show.image.medium);
        setAllShows(filteredShows);
        setSearchResults(filteredShows);
      });
  }, [page]);

  useEffect(() => {
    fetch(`https://api.tvmaze.com/shows`)
      .then((response) => response.json())
      .then((shows) => {
        const filteredShows = shows.filter((show) =>
          show.name.toLowerCase().includes(input.toLowerCase())
        );
        setSearchResults(filteredShows);
      });
  }, [input]);

  const goRight = () => {
    setPage(page + 1);
  };

  const goLeft = () => {
    setPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
  };

  const handleOnChange = (event) => {
    const inputValue = event.target.value;
    setInput(inputValue);
  };

  return (
    <div className="all-wrapper">
      <div className="all-content-wrapper">
        <div className="all-header">
          <div className="title-all-shows">
            <h1 className="all-shows-category">All Shows</h1>
          </div>
          <input
            type="text"
            placeholder="search series"
            value={input}
            onChange={handleOnChange}
          />
        </div>
        <div className="all-content">
          {searchResults.length === 0 ? (
           <div className="notfound-div">
             <h1 className="not-found">We couldn't find any shows with that name.</h1>
            <h1>:(</h1>
           </div>
          ) : (
            searchResults.slice(0, 36).map((show, index) => {
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
              );
            })
          )}
        </div>
        {searchResults.length === 0 ? (
          <div></div>
        ) : (

        <div className="all-left-right">
          <p>
            Currently on page (<span className="page">{page}</span>)
          </p>
          <div className="all-buttons">
            <button onClick={goLeft} className="left">
              <img src="/left.png" alt="icon" />
            </button>
            <button onClick={goRight} className="right">
              <img src="/right.png" alt="icon" />
            </button>
          </div>
        </div>
                )}
      </div>
    </div>
  );
};

export default AllShows;