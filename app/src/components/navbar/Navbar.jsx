import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import "./navbar.css";

const Navbar = () => {
  const [activeUsers, setActiveUsers] = useState(0);

  useEffect(() => {
    const socket = io('https://live-watch-api.onrender.com', {
      withCredentials: true
    });

    socket.on('active-users', (count) => {
      setActiveUsers(count);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.disconnect(); // Clean up on unmount
    };
  }, []);

  return (
    <div className="nav">
      <div className="part1">
        <img className="logo"
          src="https://marketplace.canva.com/EAFzNP09R9c/1/0/1600w/canva-colorful-abstract-illustrative-cricket-club-sports-logo-HPTinIp3XS8.jpg"
          alt="Logo"
        />
        <div className="logoName">Falcons<span className="logoSpan">Cricket</span></div>
      </div>
      <div className="part2">
        <div>All Matches Live Score Here</div>
      </div>
      <div className="part3">
      <span className="blinking-dot">🔴</span> Watching: {activeUsers}
      </div>
    </div>
  );
};

export default Navbar;
