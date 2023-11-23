// src/pages/Houses.js
import React, { useState, useEffect } from 'react';
import HouseCard from '../components/HouseCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Houses.css';
import Pagination from '../components/Pagination';

function Houses() {
  const [houses, setHouses] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        // Set loading state
        const response = await axios.get(
          `https://anapioficeandfire.com/api/houses?page=${page}&pageSize=${pageSize}`
        );
        setHouses((prevHouses) => [...prevHouses, ...response.data]);
      } catch (error) {
        console.error('Error fetching house data', error);
      }
    };

    fetchHouses();
  }, [page, pageSize]); // Include pageSize in the dependency array

  const handleLoadMore = () => {
    setPage(page + 1);
  };

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
      <div className="pagination-container">
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
      <div className="pageSize">
        {pageSize && <p>pageSize...</p>}
        {!pageSize && <button onClick={handleLoadMore}>Load More</button>}
      </div>
    </div>
  );
}

export default Houses;