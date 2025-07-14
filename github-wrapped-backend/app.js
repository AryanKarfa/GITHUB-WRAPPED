const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('./config/githubOAuth');
require('dotenv').config();

const githubRoutes = require('./routes/githubRoutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'https://github-wrapped-frontend-chi.vercel.app', credentials: true }));
app.use(express.json());

// Session setup
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Secure cookies in production
    sameSite: 'lax',
  },
}));

// Passport setup
app.use(passport.initialize());
app.use(passport.session());

// OAuth Routes
app.get('/auth/github', passport.authenticate('github', { scope: ['user', 'repo'] }));

app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect(process.env.FRONTEND_URL ? `${process.env.FRONTEND_URL}/dashboard` : 'http://localhost:5173/dashboard');
  }
);

// Mount API Routes
app.use('/api/github', githubRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});