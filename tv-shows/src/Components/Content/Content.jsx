import "./Content.css";
import {useState, useEffect} from "react";
import { Link } from "react-router-dom";


const Content = () => {
const getShowsUrl = `https://api.tvmaze.com/shows`;
const [comedy, setComedy] = useState([]);
const [drama, setDrama] = useState([]);
const [action, setAction] = useState([]);
const [adventure, setAdventure] = useState([]);
const [scienceFiction, setScienceFiction] = useState([]);
const [horror, setHorror] = useState([]);
const [actionIndex, setActionIndex] = useState(18);
const [adventureIndex, setAdventureIndex] = useState(1);
const [scienceFictionIndex, setScienceFictionIndex] = useState(9);
const [comedyIndex, setComedyIndex] = useState(32);
const [dramaIndex, setDramaIndex] = useState(122);
const [horrorIndex, setHorrorIndex] = useState(5);



useEffect(() => {
  fetch(getShowsUrl)
    .then((response) => response.json())
    .then((shows) => {
      console.log(shows)
      const comedyShows = shows.filter((show) => show.genres.includes("Comedy"));
      setComedy(comedyShows);

      const actionShows = shows.filter((show) => show.genres.includes("Action"));
      setAction(actionShows);

      const dramaShows = shows.filter((show) => show.genres.includes("Drama"));
      setDrama(dramaShows);

      const adventureShows = shows.filter((show) => show.genres.includes("Adventure"));
      setAdventure(adventureShows);

      const scienceFictionShows = shows.filter((show) => show.genres.includes("Science-Fiction", "Fantasy"));
      setScienceFiction(scienceFictionShows);
      
      const horrorShows = shows.filter((show) => show.genres.includes("Horror"));
      setHorror(horrorShows);

    });
}, []);


const handleRightClick = (category, length) => {
  if (category === "action" && actionIndex + 6 < length) {
    setActionIndex(actionIndex + 6);
  } else if (category === "adventure" && adventureIndex + 6 < length) {
    setAdventureIndex(adventureIndex + 6);
  } else if (category === "scienceFiction" && scienceFictionIndex + 6 < length) {
    setScienceFictionIndex(scienceFictionIndex + 6);
  } else if (category === "comedy" && comedyIndex + 6 < length) {
    setComedyIndex(comedyIndex + 6);
  } else if (category === "drama" && dramaIndex + 6 < length) {
    setDramaIndex(dramaIndex + 6);
  } else if (category === "horror" && horrorIndex + 6 < length) {
    setHorrorIndex(horrorIndex + 6);
  }

};

const handleLeftClick = (category) => {
  if (category === "action" && actionIndex > 18) {
    setActionIndex(actionIndex - 6);
  } else if (category === "adventure" && adventureIndex > 1) {
    setAdventureIndex(adventureIndex - 6);
  } else if (category === "scienceFiction" && scienceFictionIndex > 9) {
    setScienceFictionIndex(scienceFictionIndex - 6);
  } else if (category === "comedy" && comedyIndex > 32) {
    setComedyIndex(comedyIndex - 6);
  } else if (category === "drama" && dramaIndex > 122) {
    setDramaIndex(dramaIndex - 6);
  } else if (category === "horror" && horrorIndex > 5) {
    setHorrorIndex(horrorIndex - 6);
  }

};

return (
  <div className="content-wrapper">
    <div className="content">
     
     {/*  ACTION */}
     <div className="base-box">
    <div className="content-title">
    <div className="category-title-div">
     <h1 className="category-title">Action</h1>
     </div>

      <div className="move-right-movie-left">
       <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("action")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("action", action.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/action">See All</Link>
       </div>
      </div>
    </div>
    <div className="shows-wrapper">
        {action.slice(actionIndex, actionIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((actionItem, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${actionItem.id}`}>
      <img src={actionItem.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{actionItem.name}</p>
            </div>
          </div>
        ))}

{actionIndex + 6 >= action.length && (
 <Link to="/action" className="show-all-link">
    <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
 </Link>
)}
      </div>
     </div>


     {/*  ADVENTURE */}
     <div className="base-box">
     <div className="content-title">
     <div className="category-title-div">
     <h1 className="category-title">Adventure</h1>
     </div>

      <div className="move-right-movie-left">
      <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("adventure")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("adventure", adventure.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/adventure">See All</Link>
       </div>
      </div>
    </div>
      <div className="shows-wrapper">
        {adventure.slice(adventureIndex, adventureIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((adventure, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${adventure.id}`}>
      <img src={adventure.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{adventure.name}</p>
            </div>
          </div>
        ))}
    {adventureIndex + 6 >= adventure.length && (
         <Link to="/adventure" className="show-all-link">
  <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
  </Link>
)}
      </div>
     </div>


    {/*  COMEDY */}
     <div className="base-box">
    <div className="content-title">
    <div className="category-title-div">
     <h1 className="category-title">Comedy</h1>
     </div>

      <div className="move-right-movie-left">
      <div className="move-right-movie-left">
      <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("comedy")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("comedy", comedy.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/comedy">See All</Link>
       </div>
      </div>
      </div>
    </div>
      <div className="shows-wrapper">
        {comedy.slice(comedyIndex, comedyIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((comedy, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${comedy.id}`}>
      <img src={comedy.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{comedy.name}</p>
            </div>
          </div>
        ))}
                 {comedyIndex + 6 >= comedy.length && (
     <Link to="/comedy" className="show-all-link">
  <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
  </Link>
)}
      </div>
    </div>


    {/*  SCIENCE-FICTION */}
    <div className="base-box">
    <div className="content-title">
      <div className="category-title-div">
     <h1 className="category-title">Science-Fiction</h1>
     </div>

      <div className="move-right-movie-left">
      <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("scienceFiction")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("scienceFiction", scienceFiction.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/science-fiction">See All</Link>
       </div>
      </div>
    </div>
      <div className="shows-wrapper">
        {scienceFiction.slice(scienceFictionIndex, scienceFictionIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((scienceFiction, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${scienceFiction.id}`}>
      <img src={scienceFiction.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{scienceFiction.name}</p>
            </div>
          </div>
        ))}
          {scienceFictionIndex + 6 >= scienceFiction.length && (
  <Link to="/science-fiction" className="show-all-link">
  <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
  </Link>
)}
      </div>
    </div>
    

  {/* DRAMA */}
  <div className="base-box">
  <div className="content-title">
  <div className="category-title-div">
     <h1 className="category-title">Drama</h1>
     </div>

      <div className="move-right-movie-left">
      <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("drama")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("drama", drama.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/drama">See All</Link>
       </div>
      </div>
    </div>
      <div className="shows-wrapper">
        {drama.slice(dramaIndex, dramaIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((drama, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${drama.id}`}>
      <img src={drama.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{drama.name}</p>
            </div>
          </div>
        ))}
       {dramaIndex + 6 >= drama.length && (
    <Link to="/drama" className="show-all-link">
  <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
  </Link>
)}
      </div>
  </div>


   {/*  HORROR */}
   <div className="base-box">
   <div className="content-title">
   <div className="category-title-div">
     <h1 className="category-title">Horror</h1>
     </div>

      <div className="move-right-movie-left">
      <div className="move-next-buttons">
       <button className="left" onClick={() => handleLeftClick("horror")}>&lt;</button>
      <button className="right" onClick={() => handleRightClick("horror", horror.length)}> &gt;</button>
       </div>
       <div className="see-all">
       <Link to="/horror">See All</Link>
       </div>
      </div>
    </div>
      <div className="shows-wrapper">
        {horror.slice(horrorIndex, horrorIndex + (window.innerWidth < 600 ? 3 : window.innerWidth < 900 ? 4 : 6)).map((horror, index) => (
          <div key={index} className="shows">
            <div className="box-image">
            <Link to={`/info/${horror.id}`}>
      <img src={horror.image.medium} alt="tv-show-image" />
    </Link>
            </div>
            <div className="tv-show-name">
              <p>{horror.name}</p>
            </div>
          </div>
        ))}
          {horrorIndex + 6 >= horror.length && (
    <Link to="/horror" className="show-all-link">
  <div className="show-all">
    <h3>Show All</h3>
    <p>from this category</p>
  </div>
  </Link>
)}
      </div>
   </div>
    </div>
  </div>
);
};

export default Content;