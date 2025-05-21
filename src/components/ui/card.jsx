// src/components/ui/card.jsx
import React from 'react';
import './card.css'; // Ensure this file exists for styling

export const Card = ({ title, children }) => {
  return (
    <div className="card">
      {title && <h2 className="card-title">{title}</h2>}
      <div className="card-content">{children}</div>
    </div>
  );
};

export const CardContent = ({ children }) => {
  return <div className="card-content">{children}</div>;
};
