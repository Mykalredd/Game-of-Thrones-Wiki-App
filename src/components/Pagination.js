// Pagination.js
import React from 'react';

const Pagination = ({ currentPage, pageSize, onPageChange, onPageSizeChange }) => {
  return (
    <div>
      <span>
        Page {currentPage}
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          {'<'}
        </button>
        <button onClick={() => onPageChange(currentPage + 1)}>{'>'}</button>
      </span>
      <select value={pageSize} onChange={(e) => onPageSizeChange(Number(e.target.value))}>
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
      </select>
    </div>
  );
};

export default Pagination;