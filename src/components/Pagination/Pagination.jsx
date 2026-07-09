'use client';

import './Pagination.css';

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  const pages = [];

  // Always show first page
  pages.push(1);

  // Left dots
  if (currentPage > 4) {
    pages.push('left-dots');
  }

  // Middle pages
  for (
    let i = Math.max(2, currentPage - 2);
    i <= Math.min(totalPages - 1, currentPage + 2);
    i++
  ) {
    pages.push(i);
  }

  // Right dots
  if (currentPage < totalPages - 3) {
    pages.push('right-dots');
  }

  // Always show last page
  if (totalPages > 1) {
    pages.push(totalPages);
  }

  return (
    <div className="pagination">

      <button
        className="pageBtn"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ← Previous
      </button>

      {pages.map((page, index) => {

        if (page === 'left-dots' || page === 'right-dots') {
          return (
            <span
              key={index}
              className="dots"
            >
              ...
            </span>
          );
        }

        return (
          <button
            key={page}
            className={
              currentPage === page
                ? 'pageNumber active'
                : 'pageNumber'
            }
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        );

      })}

      <button
        className="pageBtn"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next →
      </button>

    </div>
  );
}