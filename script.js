const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const links = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('main section[id]');
const modal = document.querySelector('.modal');
const modalClose = document.querySelector('.modal-close');
const openModalButtons = document.querySelectorAll('[data-modal]');
const downloadBtn = document.querySelector('[data-download]');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

links.forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
  });
});

const setActiveLink = () => {
  let current = 'home';
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop) {
      current = section.id;
    }
  });

  links.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
window.addEventListener('load', setActiveLink);

openModalButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const target = button.getAttribute('data-modal');
    const template = document.getElementById(target);

    if (!template || !modal) return;

    const modalTitle = button.closest('.project-card')?.querySelector('h3')?.textContent || 'รายละเอียดผลงาน';
    const modalBody = modal.querySelector('.modal-body');

    modal.querySelector('.modal-title').textContent = modalTitle;
    modalBody.innerHTML = '';
    modalBody.appendChild(template.content.firstElementChild.cloneNode(true));
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeModal();
});

function closeModal() {
  modal?.classList.remove('open');
  document.body.style.overflow = '';
}

if (downloadBtn) {
  downloadBtn.addEventListener('click', () => {
    const link = document.createElement('a');
    link.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent('Portfolio of Food Science Student\n\nThis PDF placeholder can be replaced with a real downloadable file.');
    link.download = 'portfolio-food-science.pdf';
    link.click();
  });
}
