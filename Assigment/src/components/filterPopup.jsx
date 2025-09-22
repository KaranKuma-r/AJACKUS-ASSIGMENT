import React, { useState } from "react";


function FilterPopup({ onFilter }) {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    department: "",
  });

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const applyFilter = () => {
    onFilter(filters);
  };

  return (
    <div className="filter-popup">
      <input
        name="name"
        placeholder="First or Last Name"
        value={filters.name}
        onChange={handleChange}
        className="filter-input"
      />
      <input
        name="email"
        placeholder="Email"
        value={filters.email}
        onChange={handleChange}
        className="filter-input"
      />
      <input
        name="department"
        placeholder="Department"
        value={filters.department}
        onChange={handleChange}
        className="filter-input"
      />
      <button onClick={applyFilter} className="filter-btn">
        Search
      </button>
    </div>
  );
}

export default FilterPopup;
