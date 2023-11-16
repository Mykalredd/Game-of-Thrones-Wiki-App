import React, { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Houses.css';

function Houses() {
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    const fetchHouses = async () => {
      const response = await axios.get(
        `https://anapioficeandfire.com/api/houses?page=1&pageSize=10`
      );
      setHouses(response.data);
    };

    fetchHouses();
  }, []);

  return (
    <div className="houses">
      <h1>Houses</h1>
      <div className="house-list">
        {houses.map((house) => (
          <Link to={`/houses/${house.id}`} key={house.id}>
            <HouseCard house={house} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Houses;


// // src/pages/Houses.js
// import React, { useState, useEffect } from 'react';
// import HouseCard from '../components/HouseCard';
// import axios from 'axios';
// import './Houses.css';

// function Houses() {
//   const [houses, setHouses] = useState([]);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     const fetchHouses = async () => {
//       setLoading(true);
//       const response = await axios.get(
//         `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=10`
//       );
//       setHouses((prevHouses) => [...prevHouses, ...response.data]);
//       setLoading(false);
//     };

//     fetchHouses();
//   }, [page]);

//   const handleLoadMore = () => {
//     setPage(page + 1);
//   };

//   return (
//     <div className="houses">
//       <h1>Houses</h1>
//       <div className="house-list">
//         {houses.map((house) => (
//           <HouseCard key={house.url} house={house} />
//         ))}
//       </div>
//       {loading && <p>Loading...</p>}
//       {!loading && (
//         <button onClick={handleLoadMore}>Load More</button>
//       )}
//     </div>
//   );
// }

// export default Houses;