const links = document.getElementsByTagName('a');

Array.from(links).forEach((a) => {
  a.addEventListener('click', () => {
    window.close();
  });
});
