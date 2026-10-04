const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);

const ADMIN_PASSWORD = 'Ankit@1107'; // 🔑 Change this to your preferred password

const allowedOrigins = ['https://live-cric-score.vercel.app', 'http://localhost:5173'];

app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

// ✅ Configure Socket.IO with CORS
const io = socketIo(server, {
  cors: {
    origin: allowedOrigins,
    methods: ['GET', 'POST'],
    credentials: true
  }
});

// ─── In-memory match config (resets on server restart) ───────────────────────
let matchConfig = {
  matchTitle: 'India Vs Windies',
  matchSubtitle: '2nd ODI',
  streams: [
    { label: 'TNT 3',             quality: 'All Quality',          url: 'https://dekhobhai.pages.dev/TNT3',   icon: '📡' },
    { label: 'Willow By Cricbuzz', quality: 'All Quality',          url: 'https://dekhobhai.pages.dev/Willow', icon: '🌿' },
    { label: 'HIN',               quality: 'All Quality',          url: 'https://dekhobhai.pages.dev/HIN',    icon: '🇮🇳' },
    { label: 'ENG',               quality: 'All Quality',          url: 'https://dekhobhai.pages.dev/ENG',    icon: '🏴󠁧󠁢󠁥󠁮󠁧󠁿' },
    { label: 'All Devices',       quality: 'Best for Mobile & PC', url: 'https://newball.pages.dev/All',      icon: '📱' },
  ],
};

// ─── REST: Public — get current config ───────────────────────────────────────
app.get('/match-config', (req, res) => {
  res.json(matchConfig);
});

// ─── REST: Admin — update config ─────────────────────────────────────────────
app.post('/match-config', (req, res) => {
  const password = req.headers['x-admin-password'];
  if (password !== ADMIN_PASSWORD) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const { matchTitle, matchSubtitle, streams } = req.body;
  if (!matchTitle || !matchSubtitle || !Array.isArray(streams)) {
    return res.status(400).json({ error: 'Invalid payload' });
  }

  matchConfig = { matchTitle, matchSubtitle, streams };

  // Broadcast to all connected clients so WatchLive updates live
  io.emit('match-config-updated', matchConfig);

  res.json({ success: true, matchConfig });
});

// ─── Socket.IO: active users tracking ────────────────────────────────────────
let activeUsers = 0;

io.on('connection', (socket) => {
  activeUsers++;
  io.emit('active-users', activeUsers);

  socket.on('disconnect', () => {
    activeUsers--;
    io.emit('active-users', activeUsers);
  });
});

server.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
