document.addEventListener('DOMContentLoaded', function() {
    // 获取所有筛选按钮和文章项
    const filterButtons = document.querySelectorAll('.filter-button');
    const publicationItems = document.querySelectorAll('.publication-item');
    
    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 为当前点击的按钮添加active类
            this.classList.add('active');
            
            // 获取筛选条件
            const filter = this.getAttribute('data-filter');
            
            // 显示或隐藏文章项
            publicationItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-type') === filter) {
                    item.style.display = 'block';
                } else if (item.getAttribute('data-year') === filter) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});