import React, { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate from react-router-dom
import './Houses.module.css';
import Pagination from '../components/Pagination';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        // Set loading state
        const response = await axios.get(
          `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`
        );
        // Use setHouses without previous state to avoid duplicates
        setHouses([...response.data]);
      } catch (error) {
        console.error('Error fetching house data', error);
      }
    };

    fetchHouses();
  }, [page, pageSize]); // Include pageSize in the dependency array

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleHouseClick = (houseId) => {
    navigate(`/houses/${houseId}`);
  };

  return (
    <div className="houses">
      <h1>Houses</h1>
      <div className="house-list">
        {houses.map((house) => (
          // Use the Link component to wrap the HouseCard
          <Link
            key={`${house.name}-${house.region}`}
            to={`/houses/${house.url.match(/\d+/)[0]}`} // Extract the numeric ID from the house.url
          >
            <HouseCard house={house} onClick={() => handleHouseClick(house.url.match(/\d+/)[0])} />
          </Link>
        ))}
      </div>
      <div className="pagination-container">
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
      <div className="pageSize">
        {/* {pageSize && <p>pageSize: {pageSize}</p>} */}
        {!pageSize && <button onClick={handleLoadMore}>Load More</button>}
      </div>
    </div>
  );
}

export default Houses;