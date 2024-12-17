document.addEventListener('DOMContentLoaded', () => {
  // Add smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });

  // Add active class to current nav item
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
    }
  });

  // Image modal functionality
  const modal = document.createElement('div');
  modal.className = 'image-modal';
  const modalImg = document.createElement('img');
  modalImg.className = 'modal-content';
  modal.appendChild(modalImg);
  document.body.appendChild(modal);

  document.querySelectorAll('.page-content img').forEach(img => {
    img.addEventListener('click', () => {
      modal.style.display = 'block';
      modalImg.src = img.src;
    });
  });

  modal.addEventListener('click', () => {
    modal.style.display = 'none';
  });
});