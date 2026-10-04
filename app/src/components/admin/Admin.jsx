import React, { useState, useEffect } from "react";
import "./admin.css";

const BACKEND = "https://live-watch-api.onrender.com"; // your Render backend
const ADMIN_PASSWORD = "Ankit@1107"; // 🔑 Must match server.js

const defaultStream = { label: "", quality: "All Quality", url: "", icon: "📡" };

const Admin = () => {
    const [authed, setAuthed] = useState(false);
    const [passwordInput, setPasswordInput] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const [matchTitle, setMatchTitle] = useState("");
    const [matchSubtitle, setMatchSubtitle] = useState("");
    const [streams, setStreams] = useState([]);

    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(false);
    const [toast, setToast] = useState(null); // { type: 'success'|'error', msg }

    // Load current config from backend once authenticated
    useEffect(() => {
        if (!authed) return;
        setFetchLoading(true);
        fetch(`${BACKEND}/match-config`)
            .then((r) => r.json())
            .then((data) => {
                setMatchTitle(data.matchTitle);
                setMatchSubtitle(data.matchSubtitle);
                setStreams(data.streams);
            })
            .catch(() => showToast("error", "Could not load current config from backend."))
            .finally(() => setFetchLoading(false));
    }, [authed]);

    const showToast = (type, msg) => {
        setToast({ type, msg });
        setTimeout(() => setToast(null), 3500);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        if (passwordInput === ADMIN_PASSWORD) {
            setAuthed(true);
            setPasswordError("");
        } else {
            setPasswordError("❌ Wrong password. Try again.");
        }
    };

    const handleStreamChange = (i, field, value) => {
        setStreams((prev) => prev.map((s, idx) => (idx === i ? { ...s, [field]: value } : s)));
    };

    const addStream = () => setStreams((prev) => [...prev, { ...defaultStream }]);

    const removeStream = (i) => setStreams((prev) => prev.filter((_, idx) => idx !== i));

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch(`${BACKEND}/match-config`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-admin-password": ADMIN_PASSWORD,
                },
                body: JSON.stringify({ matchTitle, matchSubtitle, streams }),
            });
            if (res.ok) {
                showToast("success", "✅ Match config updated! Watch Live page is now live.");
            } else {
                const err = await res.json();
                showToast("error", `❌ ${err.error || "Failed to update."}`);
            }
        } catch {
            showToast("error", "❌ Network error. Is the backend running?");
        } finally {
            setLoading(false);
        }
    };

    // ── Password gate ──────────────────────────────────────────────────────────
    if (!authed) {
        return (
            <div className="admin-gate">
                <form className="admin-gate-box" onSubmit={handleLogin}>
                    <span className="admin-gate-icon">🔐</span>
                    <h2>Admin Login</h2>
                    <p>Enter your admin password to manage match config</p>
                    <input
                        type="password"
                        placeholder="Admin password"
                        value={passwordInput}
                        onChange={(e) => setPasswordInput(e.target.value)}
                        autoFocus
                    />
                    {passwordError && <span className="admin-error">{passwordError}</span>}
                    <button type="submit">Unlock Dashboard</button>
                </form>
            </div>
        );
    }

    // ── Dashboard ──────────────────────────────────────────────────────────────
    return (
        <div className="admin-page">
            {toast && <div className={`admin-toast admin-toast--${toast.type}`}>{toast.msg}</div>}

            <div className="admin-header">
                <h1>⚙️ Match Config Dashboard</h1>
                <p>Changes go live instantly for all viewers on the Watch Live page.</p>
            </div>

            {fetchLoading ? (
                <div className="admin-spinner">Loading current config…</div>
            ) : (
                <form className="admin-form" onSubmit={handleSave}>
                    {/* Match Info */}
                    <section className="admin-section">
                        <h2>Match Info</h2>
                        <div className="admin-row">
                            <label>Match Title</label>
                            <input
                                type="text"
                                value={matchTitle}
                                onChange={(e) => setMatchTitle(e.target.value)}
                                placeholder="e.g. India Vs Afghanistan"
                                required
                            />
                        </div>
                        <div className="admin-row">
                            <label>Match Subtitle</label>
                            <input
                                type="text"
                                value={matchSubtitle}
                                onChange={(e) => setMatchSubtitle(e.target.value)}
                                placeholder="e.g. 3rd ODI"
                                required
                            />
                        </div>
                    </section>

                    {/* Streams */}
                    <section className="admin-section">
                        <h2>Stream Links</h2>
                        {streams.map((s, i) => (
                            <div className="admin-stream-row" key={i}>
                                <div className="admin-stream-fields">
                                    <input
                                        type="text"
                                        placeholder="Icon (emoji)"
                                        value={s.icon}
                                        onChange={(e) => handleStreamChange(i, "icon", e.target.value)}
                                        className="admin-icon-input"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Label (e.g. TNT 3)"
                                        value={s.label}
                                        onChange={(e) => handleStreamChange(i, "label", e.target.value)}
                                        required
                                    />
                                    <input
                                        type="text"
                                        placeholder="Quality (e.g. All Quality)"
                                        value={s.quality}
                                        onChange={(e) => handleStreamChange(i, "quality", e.target.value)}
                                    />
                                    <input
                                        type="url"
                                        placeholder="Stream URL"
                                        value={s.url}
                                        onChange={(e) => handleStreamChange(i, "url", e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="admin-remove-btn"
                                    onClick={() => removeStream(i)}
                                    title="Remove stream"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button type="button" className="admin-add-btn" onClick={addStream}>
                            + Add Stream
                        </button>
                    </section>

                    <button type="submit" className="admin-save-btn" disabled={loading}>
                        {loading ? "Saving…" : "💾 Save & Go Live"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default Admin;
