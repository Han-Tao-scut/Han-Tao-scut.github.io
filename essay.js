// 随笔功能实现
const essayForm = document.getElementById('essayForm');
const essayList = document.getElementById('essayList');

// 从本地存储加载随笔
function loadEssays() {
  const essays = JSON.parse(localStorage.getItem('essays')) || [];
  essayList.innerHTML = essays.map(essay => `
    <div class="essay-item">
      <p>${essay.content}</p>
      <small>${new Date(essay.date).toLocaleString()}</small>
      <button onclick="editEssay('${essay.id}')">编辑</button>
      <button onclick="deleteEssay('${essay.id}')">删除</button>
    </div>
  `).join('');
}

// 添加新随笔
function addEssay(event) {
  event.preventDefault();
  const content = document.getElementById('essayContent').value;
  if (!content) return;

  const newEssay = {
    id: Date.now().toString(),
    content: content,
    date: new Date().toISOString()
  };

  const essays = JSON.parse(localStorage.getItem('essays')) || [];
  essays.push(newEssay);
  localStorage.setItem('essays', JSON.stringify(essays));

  loadEssays();
  essayForm.reset();
}

// 编辑随笔
function editEssay(id) {
  const essays = JSON.parse(localStorage.getItem('essays'));
  const essay = essays.find(e => e.id === id);
  const newContent = prompt('编辑您的随笔', essay.content);
  if (newContent) {
    essay.content = newContent;
    localStorage.setItem('essays', JSON.stringify(essays));
    loadEssays();
  }
}

// 删除随笔
function deleteEssay(id) {
  if (confirm('确定要删除这篇随笔吗？')) {
    let essays = JSON.parse(localStorage.getItem('essays'));
    essays = essays.filter(e => e.id !== id);
    localStorage.setItem('essays', JSON.stringify(essays));
    loadEssays();
  }
}

// 初始化
loadEssays();
essayForm.addEventListener('submit', addEssay);