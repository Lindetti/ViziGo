import "./Navbar.css";
import {useState, useRef } from "react";
import {NavLink} from "react-router-dom";
import HamburgerMenu from 'react-hamburger-menu';
import Modal from "../Modal/Modal";

const Navbar = () => {
const [showDropDown, setShowDropDown] = useState(false);
const dropdownRef = useRef(null);
const [isModalOpen, setIsModalOpen] = useState(false);

const showDropdownFunc = () => {
    setShowDropDown(true);
}

const closeDropdownFunc = () => {
    setShowDropDown(false);
}

const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropDown(false);
    }
  };

  window.onclick = handleClickOutside;

  const openModal = () => {
    setIsModalOpen(true);
  }
  
  const closeModal = () => {
    setIsModalOpen(false);
  }

    return (
        <nav>
         <div className="logo">
         <div className="dropdown" ref={dropdownRef}>
         <HamburgerMenu
   className="mobile-menu-icon"
   menuClicked={showDropdownFunc}
   color="white"
   width={25}
   height={15}
   strokeWidth={2}
   rotate={0}
   borderRadius={0}
   animationDuration={0.5}
   isOpen={false} // Set isOpen prop to false by default
      />
            <div className={`dropdown-content ${showDropDown ? "show-dropdown" : ""}`}>
             <div className="dropdown-title">
             <p>Categories </p>
            <hr />
             </div>
            <div className="dropdown-links">
            <NavLink to="/allshows" className="dropdown-categorie" onClick={closeDropdownFunc}>All Shows</NavLink>
            <NavLink to="/action" className="dropdown-categorie" onClick={closeDropdownFunc}>Action</NavLink>
            <NavLink to="/adventure" className="dropdown-categorie" onClick={closeDropdownFunc}>Adventure</NavLink>
            <NavLink to="/comedy" className="dropdown-categorie" onClick={closeDropdownFunc}>Comedy</NavLink>
            <NavLink to="/science-fiction" className="dropdown-categorie" onClick={closeDropdownFunc}>Sci-Fi</NavLink>
            <NavLink to="/drama" className="dropdown-categorie" onClick={closeDropdownFunc}>Drama</NavLink>
            <NavLink to="/horror" className="dropdown-categorie" onClick={closeDropdownFunc}>Horror</NavLink>
            </div>
            </div>
         </div>
        <NavLink className="site-name" to="/">ViziGo</NavLink>
         </div>

         <div className="mobile-app">
        <button onClick={openModal}>Join today</button>
         </div>
         {isModalOpen && <Modal isModalOpen={isModalOpen} closeModal={closeModal}/>}
        </nav>
    )
}

export default Navbar;