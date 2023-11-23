// src/pages/Characters.js
import React, { useState, useEffect } from 'react';
import CharacterCard from '../components/CharacterCard';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Characters.css';
import Pagination from '../components/Pagination';

function Characters() {
  const [characters, setCharacters] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        // Set loading state
        setPageSize(5);
        const response = await axios.get(
          `https://anapioficeandfire.com/api/characters?page=${page}&pageSize=${pageSize}`
        );
        setCharacters((prevCharacters) => [...prevCharacters, ...response.data]);
      } catch (error) {
        console.error('Error fetching character data', error);
      }
    };

    fetchCharacters();
  }, [page, pageSize]); // Include pageSize in the dependency array

  const handleLoadMore = () => {
    setPage(page + 1);
  };

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
      <div className='pagination-container'>
        <Pagination
          currentPage={page}
          pageSize={pageSize}
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newSize) => setPageSize(newSize)}
        />
      </div>
      <div className='pageSize'>
        {pageSize && <p>pageSize...</p>}
        {!pageSize && <button onClick={handleLoadMore}>Load More</button>}
      </div>
    </div>
  );
}

export default Characters;