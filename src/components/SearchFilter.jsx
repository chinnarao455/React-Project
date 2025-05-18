import React from "react";

export default function SearchFilter({ value, onChange }) {
  return (
    <input
      className="search-input"
      type="text"
      placeholder="Search profiles by name or location..."
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
