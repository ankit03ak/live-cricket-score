import React, { useState, useEffect } from "react";
import "./watchLive.css";
import matchConfig from "../../config/matchConfig";
import io from "socket.io-client";

const BACKEND = "https://live-watch-api.onrender.com";

const WatchLive = () => {
    const [config, setConfig] = useState(matchConfig); // fallback = local config

    useEffect(() => {
        // Fetch latest config from backend
        fetch(`${BACKEND}/match-config`)
            .then((r) => r.json())
            .then((data) => setConfig(data))
            .catch(() => {/* silently fall back to matchConfig.js */})

        // Listen for live updates when admin saves
        const socket = io(BACKEND, { withCredentials: true });
        socket.on("match-config-updated", (newConfig) => setConfig(newConfig));
        return () => socket.disconnect();
    }, []);

    const { matchTitle, matchSubtitle, streams } = config;
    const handleStream = (url) => {
        window.open(url, "_blank");
    };

    return (
        <div className="wl-page">
            {/* Header */}
            <div className="wl-header">
                <span className="wl-live-badge">🔴 LIVE</span>
                <h1 className="wl-match-title">{matchTitle}</h1>
                <p className="wl-match-subtitle">{matchSubtitle}</p>
                <p className="wl-tip">
                    💡 Use in <strong>Chrome Browser</strong> for best experience
                </p>
            </div>

            {/* Stream buttons */}
            <div className="wl-grid">
                {streams.map((s, i) => (
                    <button
                        key={i}
                        className="wl-card"
                        onClick={() => handleStream(s.url)}
                    >
                        <span className="wl-card-icon">{s.icon}</span>
                        <div className="wl-card-info">
                            <span className="wl-card-label">{s.label}</span>
                            <span className="wl-card-quality">{s.quality}</span>
                        </div>
                        <span className="wl-card-arrow">▶</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default WatchLive;
