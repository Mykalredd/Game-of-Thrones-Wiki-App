import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Character() {
  const { id } = useParams();
  console.log('Character ID:', id);

  const [character, setCharacter] = useState(null);

  useEffect(() => {
    console.log('Fetching character data for ID:', id);
    // Make an API call to fetch character data using the 'id' parameter
    const fetchCharacter = async () => {
      try {
        const response = await fetch(`https://anapioficeandfire.com/api/characters/${id}`);
        const data = await response.json();
        setCharacter(data);
      } catch (error) {
        console.error('Error fetching character data', error);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <div>
      {character ? (
        <div>
          <h1>{character.name || 'Unknown'}</h1>
          <p>Culture: {character.culture || 'Unknown'}</p>
          <p>Gender: {character.gender || 'Unknown'}</p>
          {/* Display other character-specific information */}
        </div>
      ) : (
        <p>Loading character data...</p>
      )}
    </div>
  );
}

export default Character;


// // src/pages/Character.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './Character.css';

// function Character({ match }) {
//   const [character, setCharacter] = useState({});
//   const [father, setFather] = useState('');
//   const [mother, setMother] = useState('');
//   const [spouse, setSpouse] = useState('');
//   const [allegiances, setAllegiances] = useState([]);

//   useEffect(() => {
//     const fetchCharacter = async () => {
//       const response = await axios.get(match.params.id);
//       setCharacter(response.data);
//       if (response.data.father) {
//         const fatherResponse = await axios.get(response.data.father);
//         setFather(fatherResponse.data.name);
//       }
//       if (response.data.mother) {
//         const motherResponse = await axios.get(response.data.mother);
//         setMother(motherResponse.data.name);
//       }
//       if (response.data.spouse) {
//         const spouseResponse = await axios.get(response.data.spouse);
//         setSpouse(spouseResponse.data.name);
//       }
//       const allegianceResponses = await Promise.all(
//         response.data.allegiances.map((allegianceUrl) =>
//           axios.get(allegianceUrl)
//         )
//       );
//       setAllegiances(allegianceResponses.map((response) => response.data.name));
//     };

//     fetchCharacter();
//   }, [match.params.id]);

//   return (
//     <div className="character">
//       <h1>{character.name}</h1>
//       <p>Born: {character.born}</p>
//       <p>Died: {character.died}</p>
//       <p>Titles: {character.titles?.join(', ')}</p>
//       <p>Father: {father}</p>
//       <p>Mother: {mother}</p>
//       <p>Spouse: {spouse}</p>
//       <p>Allegiances: {allegiances.join(', ')}</p>
//     </div>
//   );
// }

// export default Character;
