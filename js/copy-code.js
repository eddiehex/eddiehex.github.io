document.addEventListener('DOMContentLoaded', () => {
  console.log('Copy code script loaded');
  const codeBlocks = document.querySelectorAll('pre');
  console.log('Found code blocks:', codeBlocks.length);
  
  codeBlocks.forEach(pre => {
    // 创建容器
    const container = document.createElement('div');
    container.className = 'code-block-container';
    
    // 将 pre 元素包裹在容器中
    pre.parentNode.insertBefore(container, pre);
    container.appendChild(pre);
    
    // 创建复制按钮
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.textContent = 'Copy';
    
    // 添加点击事件
    copyButton.addEventListener('click', async () => {
      const code = pre.querySelector('code') || pre;
      try {
        await navigator.clipboard.writeText(code.textContent);
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
          copyButton.textContent = 'Copy';
        }, 2000);
      } catch (err) {
        console.error('Copy failed:', err);
        copyButton.textContent = 'Copy failed';
      }
    });
    
    // 将复制按钮添加到容器中
    container.appendChild(copyButton);
    console.log('Added copy button to code block');
  });
}); 