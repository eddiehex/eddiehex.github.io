document.addEventListener('DOMContentLoaded', function() {
  const toc = document.querySelector('.toc-content');
  if (!toc) return;

  const tocLinks = toc.querySelectorAll('a');
  const sections = [];

  // 收集所有文章内容中的标题元素
  const articleContent = document.querySelector('.page-body');
  if (!articleContent) return;

  const headings = articleContent.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // 确保标题有 id
  headings.forEach((heading, index) => {
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }
    
    // 查找对应的 TOC 链接
    const link = toc.querySelector(`a[href="#${heading.id}"]`);
    if (link) {
      sections.push({
        id: heading.id,
        element: heading,
        link: link
      });
    }
  });

  // 添加平滑滚动
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        // 考虑固定导航栏的高度
        const navHeight = 80; // 根据实际导航栏高度调整
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  function findHeadlineId(headline) {
    // 将标题文本转换为 id
    return headline.trim()
        // 先处理英文和数字
        .toLowerCase()
        // 处理各种标点符号和空格
        .replace(/[\s\(\)（）\[\]【】\{\}""''：:,，.。！!？?]/g, '-')
        // 移除非法字符（只保留英文、数字、中文、连字符）
        .replace(/[^a-z0-9\u4e00-\u9fa5-]/g, '')
        // 移除首尾的连字符
        .replace(/^-+|-+$/g, '')
        // 将多个连字符替换为单个连字符
        .replace(/-+/g, '-');
  }

  function updateTocHighlight() {
    const headlines = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocLinks = document.querySelectorAll('.toc-link');
    
    const scrollPosition = window.scrollY;
    
    let currentHeadline = null;
    for (const headline of headlines) {
        const headlineTop = headline.offsetTop - 100;
        if (scrollPosition >= headlineTop) {
            currentHeadline = headline;
        } else {
            break;
        }
    }
    
    if (currentHeadline) {
        // 移除所有高亮
        tocLinks.forEach(link => {
            link.classList.remove('active');
        });
        
        // 获取当前标题的ID
        const headlineId = findHeadlineId(currentHeadline.textContent.trim());
        
        // 添加新的高亮
        tocLinks.forEach(link => {
            const href = decodeURIComponent(link.getAttribute('href').substring(1));
            // 同时检查原始ID和生成的ID
            if (href === headlineId || href === currentHeadline.id) {
                link.classList.add('active');
            }
        });
    }
  }

  // 添加滚动事件监听器
  window.addEventListener('scroll', updateTocHighlight);
  // 页面加载完成后初始化高亮
  document.addEventListener('DOMContentLoaded', updateTocHighlight);
}); 