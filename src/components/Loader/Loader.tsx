import React from 'react';
import './Loader.css';

const Loading = () => {
  return (
    <div className="loading">
      <div className="loading__loader"></div>
      <p className="loading__text">Загрузка...</p>
    </div>
  );
};

export default Loading;
