import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function House() {
  const { id } = useParams();

  const [house, setHouse] = useState(null);

  useEffect(() => {
    // Make an API call to fetch house data using the 'id' parameter
    const fetchHouse = async () => {
      try {
        const response = await fetch(`https://anapioficeandfire.com/api/houses/${id}`);
        const data = await response.json();
        setHouse(data);
      } catch (error) {
        console.error('Error fetching house data', error);
      }
    };

    fetchHouse();
  }, [id]);

  return (
    <div>
      {house ? (
        <div>
          <h1>{house.name || 'Unknown'}</h1>
          <p>Region: {house.region || 'Unknown'}</p>
          <p>Coat of Arms: {house.coatOfArms || 'Unknown'}</p>
          {/* Display other house-specific information */}
        </div>
      ) : (
        <p>Loading house data...</p>
      )}
    </div>
  );
}

export default House;

// // src/pages/House.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './House.css';

// function House({ match }) {
//   const [house, setHouse] = useState({});
//   const [swornMembers, setSwornMembers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchHouse = async () => {
//       const response = await axios.get(match.params.id);
//       setHouse(response.data);
//       const swornMemberResponses = await Promise.all(
//         response.data.swornMembers.map((swornMemberUrl) =>
//           axios.get(swornMemberUrl)
//         )
//       );
//       setSwornMembers(swornMemberResponses.map((response) => response.data));
//       setLoading(false);
//     };

//     fetchHouse();
//   }, [match.params.id]);

//   return (
//     <div className="house">
//       <h1>{house.name}</h1>
//       <p>Titles: {house.titles?.join(', ')}</p>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <div>
//           <h2>Sworn Members:</h2>
//           <ul>
//             {swornMembers.map((swornMember) => (
//               <li key={swornMember.url}>{swornMember.name}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }

// export default House;
