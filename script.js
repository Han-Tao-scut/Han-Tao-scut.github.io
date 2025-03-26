// 获取GitHub profile信息和提交数据
const username = 'Han-Tao-scut';
const profileUrl = `https://api.github.com/users/${username}`;
const commitsUrl = `https://api.github.com/users/${username}/events/public`;

// 获取profile信息
fetch(profileUrl)
  .then(response => response.json())
  .then(data => {
    // 保留原有的h2标题
    const h2Element = document.querySelector('#profile h2');
    
    // 创建个人资料信息容器
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    
    // 添加个人简介
    const bio = document.createElement('p');
    bio.className = 'bio';
    bio.textContent = data.bio || '热爱编程和生物信息学的研究者';
    profileInfo.appendChild(bio);
    
    // 添加统计信息
    const stats = document.createElement('div');
    stats.className = 'stats';
    
    // 添加关注者统计
    const followersItem = document.createElement('div');
    followersItem.className = 'stat-item';
    const followersValue = document.createElement('span');
    followersValue.className = 'stat-value';
    followersValue.textContent = data.followers || 0;
    const followersLabel = document.createElement('span');
    followersLabel.className = 'stat-label';
    followersLabel.textContent = '关注者';
    followersItem.appendChild(followersValue);
    followersItem.appendChild(followersLabel);
    stats.appendChild(followersItem);
    
    // 添加正在关注统计
    const followingItem = document.createElement('div');
    followingItem.className = 'stat-item';
    const followingValue = document.createElement('span');
    followingValue.className = 'stat-value';
    followingValue.textContent = data.following || 0;
    const followingLabel = document.createElement('span');
    followingLabel.className = 'stat-label';
    followingLabel.textContent = '正在关注';
    followingItem.appendChild(followingValue);
    followingItem.appendChild(followingLabel);
    stats.appendChild(followingItem);
    
    // 添加仓库统计
    const reposItem = document.createElement('div');
    reposItem.className = 'stat-item';
    const reposValue = document.createElement('span');
    reposValue.className = 'stat-value';
    reposValue.textContent = data.public_repos || 0;
    const reposLabel = document.createElement('span');
    reposLabel.className = 'stat-label';
    reposLabel.textContent = '仓库';
    reposItem.appendChild(reposValue);
    reposItem.appendChild(reposLabel);
    stats.appendChild(reposItem);
    
    profileInfo.appendChild(stats);
    
    // 将个人资料信息插入到h2和canvas之间
    const canvas = document.querySelector('#profile canvas');
    h2Element.parentNode.insertBefore(profileInfo, canvas);
  })
  .catch(error => {
    console.error('获取GitHub个人资料失败:', error);
    const profileInfo = document.createElement('div');
    profileInfo.className = 'profile-info';
    profileInfo.innerHTML = '<p class="bio">热爱编程和生物信息学的研究者</p>';
    
    const h2Element = document.querySelector('#profile h2');
    const canvas = document.querySelector('#profile canvas');
    h2Element.parentNode.insertBefore(profileInfo, canvas);
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