import "./Pages.css";
import {Link} from "react-router-dom";
import {useState, useEffect} from "react";

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

const goRight = () => {
  setPage(page + 1);
}

const goLeft = () => {
  setPage((prevPage) => (prevPage === 1 ? 1 : prevPage - 1));
};

const handleOnChange = (event) => {
  const inputValue = event.target.value;
  setInput(inputValue);
  if (inputValue === "") {
    setSearchResults(allShows);
  } else {
    const filteredShows = allShows.filter(
      (show) => show.name.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSearchResults(filteredShows);
  }
};

    return (
        <div className="all-wrapper"> 
        <div className="all-content-wrapper">
        <div className="all-header">
        <div className="title-all-shows">
       <h1 className="all-shows-category">All Shows</h1>
       </div>
        <input type="text" 
        placeholder="search series" 
        value={input}
        onChange={handleOnChange}
        />
        </div>
        <div className="all-content">
        {searchResults.slice(0, 36).map((show, index) => {
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
        <div className="all-left-right">
        <p>Currently on page (<span className="page">{page}</span>)</p>
        <div className="all-buttons">
        <button onClick={goLeft} className="left">&lt;</button>
        <button onClick={goRight} className="right">&gt;</button>
        </div>
        </div>
        </div>
        
        </div>
    )
}

export default AllShows;