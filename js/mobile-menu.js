// 等待 DOM 完全加载后再执行
document.addEventListener('DOMContentLoaded', function() {
  // 获取元素
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  // 移动端菜单切换
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', function(e) {
      e.stopPropagation(); // 阻止事件冒泡
      navLinks.classList.toggle('active');
    });
  }

  // 点击外部关闭菜单
  document.addEventListener('click', function(e) {
    // 导航菜单关闭逻辑
    if (navLinks && navLinks.classList.contains('active')) {
      if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
      }
    }
  });

  // 添加触摸事件支持
  document.addEventListener('touchstart', function(e) {
    // 导航菜单关闭逻辑
    if (navLinks && navLinks.classList.contains('active')) {
      if (!e.target.closest('.nav-links') && !e.target.closest('.menu-toggle')) {
        navLinks.classList.remove('active');
      }
    }
  });
}); 