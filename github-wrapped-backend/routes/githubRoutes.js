const express = require('express');
const router = express.Router();
const { getUserRepos, getLanguageStats, getRepoStats, getGithubWrapped } = require('../controllers/githubController');

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: 'Unauthorized: Please log in via GitHub' });
}

router.get('/repos', ensureAuthenticated, getUserRepos);
router.get('/languages', ensureAuthenticated, getLanguageStats);
router.get('/stats', ensureAuthenticated, getRepoStats);
router.get('/wrapped', ensureAuthenticated, getGithubWrapped);

module.exports = router;