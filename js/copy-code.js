document.addEventListener('DOMContentLoaded', () => {
  console.log('Copy code script loaded');
  const codeBlocks = document.querySelectorAll('pre');
  console.log('Found code blocks:', codeBlocks.length);
  
  codeBlocks.forEach(pre => {
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
    
    pre.appendChild(copyButton);
    console.log('Added copy button to code block');
  });
}); 