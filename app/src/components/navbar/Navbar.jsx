import React from "react";
import "./navbar.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate("/watch-live");
    };


    return (
        <>
            <div className="nav">
                <div className="part1">
                    <img
                        className="logo"
                        src="https://marketplace.canva.com/EAFzNP09R9c/1/0/1600w/canva-colorful-abstract-illustrative-cricket-club-sports-logo-HPTinIp3XS8.jpg"
                        alt="Logo"
                        
                    />

                    <div className="logoName">
                        Falcons<span className="logoSpan">Cricket</span>
                    </div>
                </div>

                <div className="part2">
                    <div>All Matches Live Score Here</div>
                </div>

            <div className="watch-live" onClick={handleClick}>
                Watch Live
            </div>
            </div>

        </>
    );
};

export default Navbar;