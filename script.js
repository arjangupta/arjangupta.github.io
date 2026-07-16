document.getElementById('year').textContent = new Date().getFullYear();

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

document.querySelectorAll('.role, .project, .focus-grid article').forEach((el) => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .6s ease, transform .6s ease, border-color .25s ease';
  observer.observe(el);
});

const style = document.createElement('style');
style.textContent = '.revealed{opacity:1!important;transform:translateY(0)!important}';
document.head.appendChild(style);
