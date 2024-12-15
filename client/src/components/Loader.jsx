import React, { useState, useEffect } from 'react';

const Loader = ({isActive}) => {
  return (
    <div>
      {isActive && (
        <div className="loader-container">
          <div className="loader"></div>
          <p>Fetching data, please wait...</p>
        </div>
      )}
    </div>
  );
};

export default Loader;