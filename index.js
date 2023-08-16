document.addEventListener('scroll', _ev => {
  const body = document.querySelector('body');
  const scrolledClassName = 'scrolled';

  if (window.scrollY === 0) {
    body.classList.remove(scrolledClassName);
  } else {
    body.classList.add(scrolledClassName);
  }
});