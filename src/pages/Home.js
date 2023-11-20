import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  const imageAlt = "GoT Logo";

  return (
    <div className="container">
      <div className="text">
        <h1>Game of Thrones</h1>
        <ul>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/houses">Houses</Link>
          </li>
          <li>
            <Link to="/charactersandhouses">Characters & Houses</Link>
          </li>
        </ul>
        {/* <p>Are you interested in the Characters and Houses of the Game of Thrones series?</p> */}
        <p>Do You Love The World of Westeros?</p>
        <p>Explore & Enjoy My Wiki App!</p>
      </div>
      <div className="image">
        {/* Update the image source */}
        <img src="./GoTCharacters.jpeg" alt={imageAlt} />
      </div>
    </div>
  );
};

export default Home;