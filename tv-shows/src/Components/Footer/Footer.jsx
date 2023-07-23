import "./Footer.css";

const Footer = () => {
    return (
        <footer>
        <p>Design and Code by <span className="name"> <a href="https://alexanderlind.vercel.app/" target="_blank">Alexander Lind</a> </span></p>
        <div className="icons">
        <a href="https://github.com/Lindetti" target="_blank"><img src="/github.png" alt="github" /></a>
          <a href="https://www.linkedin.com/in/alexander-lind-2b2934199/" target="_blank"> <img src="/linkedin.png" alt="github" /></a>
        </div>
        <p>Made with <span className="arrow">&#10132;</span> <a href="https://www.tvmaze.com/api" target="_blank">TVMaze API</a></p>
        </footer>
    )
}

export default Footer;