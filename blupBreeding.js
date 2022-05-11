function blupBreeding() {
  const names = document.getElementsByClassName('horsename');
  const namesArr = Array.from(names);

  const regexpBlupHtml = /<strong>Total : [-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong>/;
  const regexpFloat = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;

  namesArr.forEach((name) => {
    fetch(name.href)
      .then((res) => res.text())
      .then((data) => {
        const blupHtml = data.match(regexpBlupHtml);
        if (blupHtml) {
          const blupFloat = blupHtml[0].match(regexpFloat);
          name.insertAdjacentHTML('afterend', '<br><span style="color: #993322;">Blup: ' + blupFloat[0] + '</span>');
        }
      });
  });
}

const breedingsBtn = document.getElementsByClassName('tab-action-select');

Array.from(breedingsBtn).forEach((breedingBtn) => {
  breedingBtn.addEventListener('click', () => {
    setTimeout(() => {
      blupBreeding();
    }, 250);
  });
});

if (window.location.href.indexOf('elevage/chevaux') > -1) {
  setTimeout(() => {
    blupBreeding();
  }, 50);
}
