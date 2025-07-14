const axios = require('axios');

exports.fetchUserRepos = async (token) => {
  let repos = [];
  let page = 1;
  const perPage = 100;

  try {
    while (true) {
      const response = await axios.get(`https://api.github.com/user/repos?per_page=${perPage}&page=${page}`, {
        headers: { Authorization: `token ${token}` },
      });

      const fetchedRepos = response.data.map(repo => ({
        name: repo.name,
        stars: repo.stargazers_count,
        forks: repo.forks_count,
        language: repo.language,
        description: repo.description || 'No description',
        owner: repo.owner,
      }));

      repos = [...repos, ...fetchedRepos];
      if (fetchedRepos.length < perPage) break;
      page++;
    }
    console.log('Fetched repos:', repos.map(r => ({ name: r.name, language: r.language }))); // Debug log
    return repos;
  } catch (err) {
    if (err.response?.status === 403 || err.response?.status === 429) {
      throw new Error('GitHub API rate limit exceeded. Please try again later.');
    }
    throw new Error(`Failed to fetch repos: ${err.message}`);
  }
};

exports.getLanguageStats = async (token) => {
  const repos = await exports.fetchUserRepos(token);
  const languageCount = {};
  const totalRepos = repos.length;

  repos.forEach(repo => {
    const lang = repo.language || 'Unknown'; // Handle null languages
    languageCount[lang] = (languageCount[lang] || 0) + 1;
  });

  const languageStats = Object.entries(languageCount)
    .map(([language, value]) => ({
      language,
      value: totalRepos ? Number(((value / totalRepos) * 100).toFixed(1)) : 0, // Ensure number
    }))
    .sort((a, b) => b.value - a.value);

  console.log('Language stats:', languageStats); // Debug log
  return languageStats.length ? languageStats : [{ language: 'N/A', value: 0 }];
};

exports.getRepoStats = async (token) => {
  const repos = await exports.fetchUserRepos(token);
  const totalStars = repos.reduce((acc, repo) => acc + repo.stars, 0);
  const totalForks = repos.reduce((acc, repo) => acc + repo.forks, 0);
  let totalCommits = 0;

  for (const repo of repos) {
    let commitCount = 0;
    let page = 1;
    try {
      while (true) {
        const commitResponse = await axios.get(
          `https://api.github.com/repos/${repo.owner?.login || 'user'}/${repo.name}/commits?per_page=100&page=${page}`,
          { headers: { Authorization: `token ${token}` } }
        );
        commitCount += commitResponse.data.length;
        if (commitResponse.data.length < 100) break;
        page++;
      }
      repo.commits = commitCount;
    } catch (err) {
      console.warn(`Failed to fetch commits for ${repo.name}: ${err.message}`);
      repo.commits = 0;
    }
    totalCommits += commitCount;
  }

  const mostUsedLanguage = Object.entries(repos.reduce((acc, repo) => {
    const lang = repo.language || 'Unknown';
    acc[lang] = (acc[lang] || 0) + 1;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1])[0]?.[0] || 'N/A';

  const topRepos = repos
    .sort((a, b) => {
      if (b.commits !== a.commits) return b.commits - a.commits;
      if (b.stars !== a.stars) return b.stars - a.stars;
      return b.forks - a.forks;
    })
    .slice(0, 5)
    .map(repo => ({
      name: repo.name,
      stars: repo.stars,
      description: repo.description,
      language: repo.language || 'N/A',
      commits: repo.commits || 0,
      forks: repo.forks,
    }));

  console.log('Top repos:', topRepos); // Debug log
  return {
    totalRepos: repos.length,
    totalStars,
    totalForks,
    totalCommits,
    mostUsedLanguage,
    topRepos,
  };
};