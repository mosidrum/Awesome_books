const activePage = window.location.pathname;
const navlinks = document.querySelectorAll('.nav-links a');
navlinks.forEach((link) => {
  if (link.href.includes(`${activePage}`)) {
    link.classList.add('active');
  }
});

const date = document.querySelector('.date');
date.innerHTML = Date();