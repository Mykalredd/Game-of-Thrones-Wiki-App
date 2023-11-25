import React from 'react';
// import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import './Home.module.css'; 
import GotHDImage from '../GoTHDImage.jpeg'; 

const Home = () => {
  const imageAlt = "GoT Logo";

  return (
    <div className={styles.container}>
      <div className={styles.text}>
        <h1>Game of Thrones</h1>
        {/* <ul>
          <li>
            <Link to="/characters">Characters</Link>
          </li>
          <li>
            <Link to="/houses">Houses</Link>
          </li>
          <li>
            <Link to="/charactersandhouses">Characters & Houses</Link>
          </li>
        </ul> */}
        <p>Are You a Fan of the Game of Thrones series?</p>
        <p>If You Love The World of Westeros, Explore and Enjoy My Wiki App!</p>
      </div>
      <div className={styles.image}>
        {/* Update the image source */}
        <img src={GotHDImage} alt={imageAlt} />
      </div>
    </div>
  );
};

export default Home;