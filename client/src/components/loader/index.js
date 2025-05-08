import React from 'react';
import './index.css';

const Loader = ({ loadingText}) => {
  return (
    <div className="loader-container">
      <div className="loader-spinner"></div>
      <p className="loader-text">{loadingText}</p>
    </div>
  );
};

export default Loader;