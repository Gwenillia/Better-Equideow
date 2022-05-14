/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const regexpBlupHtml = /<td class="last align-right" width="15%" dir="ltr"><strong class="nowrap">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong><\/td>/;
const regexpPGHtml = /<strong>Total.+[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?<\/strong>/;
const regexpSkillsHtml = /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/;

const regexpFloat = /[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?/;


function parseHTML(infoDiv, html) {

  const parsedInfoDivHTML = parser.parseFromString(html, `text/html`);
  const infoDivTags = parsedInfoDivHTML.getElementsByTagName(`span`);

  for (const tag of infoDivTags) {
    infoDiv.appendChild(tag);
  }
}

let locationAllowed;
if (window.location.href.indexOf('elevage/chevaux/?elevage') > -1 || window.location.href.indexOf('marche/vente') > -1 || window.location.href.indexOf('centre/box') > -1) {
  locationAllowed = true;
}

function moreInfos() {
  const isDetailedView = document.getElementById('detail-chevaux');
  const names = document.getElementsByClassName('horsename');
  const namesArr = Array.from(names);

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
            parseHTML(infoDiv, `<span><span style="font-weight: bold;">${isFrenchApp ? 'Compétences: ' : 'Skills: '}</span>${skillsFloat[0]}</span>`);
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
