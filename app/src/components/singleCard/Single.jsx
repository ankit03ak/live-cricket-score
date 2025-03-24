import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../navbar/Navbar';

export default function Single() {
  const location = useLocation();
  const item = location.state?.item;

  if (!item) {
    return <h2>No data available</h2>;
  }

  return (
    <>
      <Navbar />
      <div>
        <h2>{item.series}</h2>
        <p>Match Type: {item.matchType?.toUpperCase()}</p>
        <p>Date: {item.dateTimeGMT.split('T')[0]}</p>
        <p>Time: {item.dateTimeGMT.split('T')[1]}</p>
        <p>Status: {item.status}</p>
        <h3>Scores</h3>
        <p>
          {item.t1}: {item.t1s}
        </p>
        <p>
          {item.t2}: {item.t2s}
        </p>
      </div>
    </>
  );
}
