function moreInfos() {
  const names = document.getElementsByClassName('horsename');
  const namesArr = Array.from(names);

  const regexpBlupHtml = /<td class="last align-right" width="15%" dir="ltr"><strong class="nowrap">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong><\/td>/;
  const regexpPGHtml = /<strong>Total.+[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?<\/strong>/;
  const regexpSkillsHtml = /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/;

  const regexpFloat = /[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?/;

  let isFrenchApp;

  const parser = new DOMParser();

  if (window.location.host.match(/.+equideow.+/)) {
    isFrenchApp = true;
  }

  const isDetailedView = document.getElementById('detail-chevaux');

  let locationAllowed;
  if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 || window.location.href.indexOf('marche/vente') > -1 || window.location.href.indexOf('centre/box') > -1) {
    locationAllowed = true;
  }

  function parseHTML(infoDiv, html) {

    const parsedInfoDivHTML = parser.parseFromString(html, `text/html`);
    const infoDivTags = parsedInfoDivHTML.getElementsByTagName(`span`);

    for (const tag of infoDivTags) {
      infoDiv.appendChild(tag);
    }
  }


  namesArr.forEach((name) => {
    fetch(name.href)
      .then((res) => res.text())
      .then((data) => {

        const infoDiv = document.createElement('div');
        infoDiv.style.display = 'flex';
        infoDiv.style.flexFlow = 'column nowrap';
        infoDiv.style.margin = '.25em 0';
        infoDiv.style.color = '#993322';

        if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 || window.location.href.indexOf('marche/vente') > -1) {
          const blupHtml = data.match(regexpBlupHtml);
          if (blupHtml) {
            const blupFloat = blupHtml[0].match(regexpFloat);
            parseHTML(infoDiv, '<span><span style="font-weight: bold;">Blup: </span>' + blupFloat[0] + '</span>');
          }

          if (!isDetailedView && !(window.location.href.indexOf('marche/vente') > -1)) {
            const PGHtml = data.match(regexpPGHtml);
            if (PGHtml) {
              const PGFloat = PGHtml[0].match(regexpFloat);
              parseHTML(infoDiv, `<span><span style="font-weight: bold;">${isFrenchApp ? 'PG: ' : 'GP: '}</span>${PGFloat[0]}</span>`);
            }
          }
        }

        if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 && !isDetailedView || window.location.href.indexOf('centre/box') > -1) {
          const skillsHtml = data.match(regexpSkillsHtml);
          if (skillsHtml) {
            const skillsFloat = skillsHtml[0].match(regexpFloat);
            parseHTML(infoDiv,`<span><span style="font-weight: bold;">${isFrenchApp ? 'Compétences: ' : 'Skills: '}</span>${skillsFloat[0]}</span>`);
          }
        }

        if (locationAllowed) {
          name.parentNode.insertBefore(infoDiv, name.nextSibling);
          let br;
          if (name.parentNode.children.length === 5) {
            br = name.parentNode.children[3];
          } else {
            br = name.parentNode.children[2];
          }
          br && name.parentNode.removeChild(br);
        }
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
