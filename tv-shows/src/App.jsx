import {Routes, Route} from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Content from "./Components/Content/Content";
import TvShowInfo from "./Components/TvShowInfo/TvShowInfo";
import Action from "./Pages/Action/";
import Adventure from "./Pages/Adventure";
import Comedy from "./Pages/Comedy";
import ScienceFiction from "./Pages/Sciencefiction";
import Drama from "./Pages/Drama";
import Horror from "./Pages/Horror";
import AllShows from "./Pages/AllShows";
import Footer from "./Components/Footer/Footer";
import './App.css'

function App() {

  return (
   <div className="wrapper">
   <Navbar />
   <Routes>
  <Route path="/" element={<Content />} />
  <Route path="/info/:id" element={<TvShowInfo />} />
  <Route path="/allshows" element={<AllShows />} />
  <Route path="/action" element={<Action />} />
  <Route path="/adventure" element={<Adventure />} />
  <Route path="/comedy" element={<Comedy />} />
  <Route path="/science-fiction" element={<ScienceFiction />} />
  <Route path="/drama" element={<Drama />} />
  <Route path="/horror" element={<Horror />} />
   </Routes>
   <Footer />
   </div>
  )
}

export default App;
