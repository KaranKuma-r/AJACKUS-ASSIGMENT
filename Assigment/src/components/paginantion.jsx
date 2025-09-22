import React from "react";

function Pagination({ total, limit, page, setPage }) {
  const pages = Math.ceil(total / limit);

  return (
    <div className="pagination">
      {Array.from({ length: pages }, (_, i) => (
        <button
          key={i}
          className={`pagination-btn ${page === i + 1 ? "active" : ""}`}
          onClick={() => setPage(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

export default Pagination;
