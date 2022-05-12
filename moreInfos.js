function moreInfos() {
  const names = document.getElementsByClassName('horsename');
  const namesArr = Array.from(names);
  // const affixes = document.getElementsByClassName('affixe');

  // Array.from(affixes).forEach((affixe) => {
  //   const parentNode = affixe.parentNode;
  //   const br = parentNode.children[1];

  // parentNode.removeChild(br);
  // })

  const regexpBlupHtml = /<td class="last align-right" width="15%" dir="ltr"><strong class="nowrap">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong><\/td>/;
  const regexpPGHtml = /<strong>Total.+[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?<\/strong>/;
  const regexpSkillsHtml = /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/;

  const regexpFloat = /[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?/;

  let isFrenchApp;

  if (window.location.host.match(/.+equideow.+/)) {
    isFrenchApp = true;
  }

  const isDetailedView = document.getElementById('detail-chevaux');

  namesArr.forEach((name) => {
    fetch(name.href)
      .then((res) => res.text())
      .then((data) => {
        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.flexFlow = 'column nowrap';
        infoDiv.style.margin = '.5em 0';
        infoDiv.style.color = '#993322';

        if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 || window.location.href.indexOf('marche/vente') > -1) {
          const blupHtml = data.match(regexpBlupHtml);
          if (blupHtml) {
            const blupFloat = blupHtml[0].match(regexpFloat);
            infoDiv.innerHTML += '<span><span style="font-weight: bold;">Blup: </span>' + blupFloat[0] + '</span>';
          }

          if (!isDetailedView && !(window.location.href.indexOf('marche/vente') > -1)) {
            const PGHtml = data.match(regexpPGHtml);
            console.log(!(window.location.href.indexOf('marche/vente') > -1));
            if (PGHtml) {
              const PGFloat = PGHtml[0].match(regexpFloat);
              infoDiv.innerHTML += `<span><span style="font-weight: bold;">${isFrenchApp ? 'PG: ' : 'GP: '}</span>${PGFloat[0]}</span>`;
            }
          }
        }

        if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 && !isDetailedView || window.location.href.indexOf('centre/box') > -1) {
          const skillsHtml = data.match(regexpSkillsHtml);
          if (skillsHtml) {
            const skillsFloat = skillsHtml[0].match(regexpFloat);
            infoDiv.innerHTML += `<span><span style="font-weight: bold;">${isFrenchApp ? 'Compétences: ' : 'Skills: '}</span>${skillsFloat[0]}</span>`;
          }
        }
        name.parentNode.insertBefore(infoDiv, name.nextSibling);
        const br = name.parentNode.children[2]
        name.parentNode.removeChild(br);
      });
  });
}

const breedingsBtn = document.getElementsByClassName('tab-action-select');

Array.from(breedingsBtn).forEach((breedingBtn) => {
  breedingBtn.addEventListener('click', () => {
    setTimeout(() => {
      moreInfos();
    }, 250);
  });
});

setTimeout(() => {
  moreInfos();
}, 250);
