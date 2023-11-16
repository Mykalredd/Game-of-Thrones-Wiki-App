import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Characters.css';

function Characters() {
  const [characters, setCharacters] = useState([]);

  useEffect(() => {
    const fetchCharacters = async () => {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/characters?page=1&pageSize=10`
      );
      setCharacters(response.data);
    };

    fetchCharacters();
  }, []);

  return (
    <div className="characters">
      <h1>Characters</h1>
      <div className="character-list">
        {characters.map((character) => (
          <Link to={`/characters/${character.id}`} key={character.id}>
            <CharacterCard character={character} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Characters;


// // src/pages/Characters.js
// import React, { useState, useEffect } from 'react';
// import CharacterCard from '../components/CharacterCard';
// import axios from 'axios';
// import './Characters.css';

// function Characters() {
//   const [characters, setCharacters] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchCharacters = async () => {
//       setLoading(true);
//       const response = await axios.get(
//         `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=10`
//       );
//       setCharacters((prevCharacters) => [...prevCharacters, ...response.data]);
//       setLoading(false);
//     };

//     fetchCharacters();
//   }, [page]);

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div className="characters">
//       <h1>Characters</h1>
//       <div className="character-list">
//         {characters.map((character) => (
//           <CharacterCard key={character.url} character={character} />
//         ))}
//       </div>
//       {loading && <p>Loading...</p>}
//       {!loading && (
//         <button onClick={handleLoadMore}>Load More</button>
//       )}
//     </div>
//   );
// }

// export default Characters;
