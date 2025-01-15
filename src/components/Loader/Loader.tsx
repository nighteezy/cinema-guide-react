import React from 'react';
import './Loader.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loader"></div>
      <p>Загрузка...</p>
    </div>
  );
};

export default Loading;
