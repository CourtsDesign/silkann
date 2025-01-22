// Import our custom CSS
import '../scss/styles.scss';

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap';

const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
const tooltipList = [...tooltipTriggerList].map(
  (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl),
);

// onload ensure tooltip always visible
window.onload = function () {
  tooltipList.forEach((tooltip) => tooltip.show());
};

// get height of .header then if scrollY is greater than that height, add .scrolled class to .header
const header = document.querySelector('.header');
const headerHeight = header.clientHeight;
window.addEventListener('scroll', () => {
  if (window.scrollY > headerHeight) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});
