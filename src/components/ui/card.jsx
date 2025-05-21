// src/components/ui/card.jsx
import React from 'react';
import './card.css'; // Optional: create this for styling

export const Card = ({ title, children }) => {
  return (
    <div className="card">
      <h2 className="card-title">{title}</h2>
      <div className="card-content">{children}</div>
    </div>
  );
};
