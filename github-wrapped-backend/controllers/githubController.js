const { fetchUserRepos, getLanguageStats, getRepoStats } = require('../services/githubService');

exports.getUserRepos = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized: Please log in' });
  try {
    const repos = await fetchUserRepos(req.user.accessToken);
    res.json(repos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLanguageStats = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized: Please log in' });
  try {
    const data = await getLanguageStats(req.user.accessToken);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRepoStats = async (req, res) => {
  if (!req.isAuthenticated()) return res.status(401).json({ error: 'Unauthorized: Please log in' });
  try {
    const data = await getRepoStats(req.user.accessToken);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getGithubWrapped = async (req, res) => {
  try {
    const token = req.user.accessToken;
    const repos = await fetchUserRepos(token);
    const languages = await getLanguageStats(token);
    const repoStats = await getRepoStats(token);

    const wrapped = {
      repoCount: repos.length,
      stars: repoStats.totalStars,
      commits: repoStats.totalCommits,
      topLang: languages?.[0]?.language || 'N/A',
      topLanguages: languages,
      topRepos: repoStats.topRepos,
    };

    res.json(wrapped);
  } catch (err) {
    console.error('Wrapped Error:', err.message);
    res.status(500).json({ error: `Failed to fetch wrapped data: ${err.message}` });
  }
};