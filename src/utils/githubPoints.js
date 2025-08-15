const GITHUB_REPO = "Premkolte/AnimateHub";
const TOKEN = "YOUR_PERSONAL_ACCESS_TOKEN"; // Replace with your token

const POINTS = {
  level1: 3,
  level2: 7,
  level3: 10
};

export const fetchContributorsWithPoints = async () => {
  let contributorsMap = {};
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/pulls?state=closed&per_page=100&page=${page}`,
      {
        headers: {
          Authorization: `token ${TOKEN}`
        }
      }
    );
    const prs = await res.json();
    if (prs.length === 0) {
      hasMore = false;
      break;
    }

    prs.forEach(pr => {
      if (!pr.merged_at) return;

      const author = pr.user.login;
      const labels = pr.labels.map(l => l.name.toLowerCase());
      let points = 0;

      labels.forEach(label => {
        if (POINTS[label]) points += POINTS[label];
      });

      if (!contributorsMap[author]) {
        contributorsMap[author] = {
          username: author,
          avatar: pr.user.avatar_url,
          profile: pr.user.html_url,
          points: 0,
          prs: 0
        };
      }

      contributorsMap[author].points += points;
      contributorsMap[author].prs += 1;
    });

    page++;
  }

  return Object.values(contributorsMap).sort((a, b) => b.points - a.points);
};
