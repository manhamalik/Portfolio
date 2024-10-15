document.addEventListener('DOMContentLoaded', function() {
  const navLinks = document.querySelectorAll('nav a[data-section]');
  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault();
      const targetSection = document.getElementById(this.dataset.section);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
