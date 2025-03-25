import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import "./single.css"

export default function Single() {
  const location = useLocation();
  const { item } = location.state || {};
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [item]);

  if (!item && !loading) {
    return <h2>No data available</h2>;
  }

  if (loading) {
    return <h2>Loading data, please wait...</h2>;
  }

  return (
    <div className="strange-container">
    <div className="strange-card">
      <h2 className="strange-series">{item.series} </h2>
      <p className="strange-detail"><span>Match Type:</span> {item.matchType?.toUpperCase()}</p>
      <p className="strange-detail">
  <span>Time:</span> {new Date(item.dateTimeGMT).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
</p>
      <p className="strange-status"><span>Status:</span> {item.status}</p>

      <h3 className="strange-score-title">Scores</h3>
      <div className="strange-scores">
        <div className="strange-team">
          <img className='strange-flagImg' src={item.t1img} alt={`${item.t1} flag`} />
          <p><span>{item.t1} <br /> </span> {item.t1s || 'Not Available'}</p>
        </div>
        <div className="strange-team">
          <img className='strange-flagImg' src={item.t2img} alt={`${item.t2} flag`} />
          <p><span>{item.t2} <br /> </span> {item.t2s || 'Not Available'}</p>
        </div>
      </div>
    </div>
  </div>
  );
}
