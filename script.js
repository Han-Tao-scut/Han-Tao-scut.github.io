// 获取GitHub profile信息和提交数据
const username = 'Han-Tao-scut';
const profileUrl = `https://api.github.com/users/${username}`;
const commitsUrl = `https://api.github.com/users/${username}/events/public`;

// 获取profile信息
fetch(profileUrl)
  .then(response => response.json())
  .then(data => {
    document.getElementById('profile').innerHTML = `
      <h2>${data.name}</h2>
      <p>${data.bio}</p>
      <p>Followers: ${data.followers}</p>
      <p>Following: ${data.following}</p>
    `;
  });

// 获取提交数据并生成热图
fetch(commitsUrl)
  .then(response => response.json())
  .then(events => {
    const commits = events.filter(event => event.type === 'PushEvent');
    const commitDates = commits.map(commit => new Date(commit.created_at).toDateString());
    const commitCounts = {};
    commitDates.forEach(date => {
      commitCounts[date] = (commitCounts[date] || 0) + 1;
    });

    const ctx = document.getElementById('commitChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: Object.keys(commitCounts),
        datasets: [{
          label: 'Commits',
          data: Object.values(commitCounts),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  });