/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const regexpBlupHtml =
  /<td class="last align-right" width="15%" dir="ltr"><strong class="nowrap">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong><\/td>/;
const regexpPGHtml =
  /<strong>Total.+[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?<\/strong>/;
const regexpSkillsHtml =
  /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/;
const regexpPetHtmlOthers =
  /<h3 class="align-center module-style-6-title module-title">.*<\/h3>/;
const regexpPetHtmlSelf =
  /<h3 id="compagnon-head-title" class="align-center module-style-6-title module-title">.*<\/h3>/;

const regexpFloat = /[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?/;
const regexpValue = /\>(.*?)\</;

function querySelectorAllLive(el, selector) {
  const result = Array.prototype.slice.call(el.querySelectorAll(selector));

  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      [].forEach.call(mutation.addedNodes, (node) => {
        if (node.nodeType === NODE.ELEMENT_NODE && node.matches(selector)) {
          result.push(node);
        }
      });
    });
  });

  observer.observe(el, { childList: true, subtree: true });

  return result;
}

const parser = new DOMParser();

function parseHTML(targetDiv, html, selector) {
  const parsedTargetDivHTML = parser.parseFromString(html, `text/html`);
  const targetDivTags = querySelectorAllLive(parsedTargetDivHTML, selector);

  for (const tag of targetDivTags) {
    targetDiv.appendChild(tag);
  }
}

const elevageLocation =
  window.location.href.indexOf("elevage/chevaux/?elevage") > -1;
const sellsLocation = window.location.href.indexOf("marche/vente") > -1;
const boxesLocation = window.location.href.indexOf("centre/box") > -1;

let locationAllowed;
if (elevageLocation || sellsLocation || boxesLocation) {
  locationAllowed = true;
}

function moreInfos() {
  const isDetailedView = document.getElementById("detail-chevaux");
  const names = document.getElementsByClassName("horsename");
  const namesArr = Array.from(names);

  namesArr.forEach((name) => {
    fetch(name.href)
      .then((res) => res.text())
      .then((data) => {
        const infoDiv = document.createElement("div");
        infoDiv.style.display = "flex";
        infoDiv.style.flexFlow = "column nowrap";
        infoDiv.style.margin = ".25em 0";
        infoDiv.style.color = "#993322";

        if (elevageLocation || sellsLocation) {
          const blupHtml = data.match(regexpBlupHtml);
          const PetHtml =
            data.match(regexpPetHtmlOthers) || data.match(regexpPetHtmlSelf);
          console.log(PetHtml);
          if (blupHtml) {
            const blupFloat = blupHtml[0].match(regexpFloat);
            parseHTML(
              infoDiv,
              '<p><span style="font-weight: bold;">Blup: </span>' +
                blupFloat[0] +
                "</p>",
              "p"
            );
          }
          if (PetHtml) {
            console.log(PetHtml);
            const PetName = PetHtml[0].match(regexpValue);
            console.log(PetName);
            parseHTML(
              infoDiv,
              `<p><span style='font-weight: bold;'>${
                isFrenchApp ? "Familier: " : "Pet: "
              }</span>${PetName[1]}</p>`,
              "p"
            );
          }

          if (
            !isDetailedView &&
            !(window.location.href.indexOf("marche/vente") > -1)
          ) {
            const PGHtml = data.match(regexpPGHtml);
            if (PGHtml) {
              const PGFloat = PGHtml[0].match(regexpFloat);
              parseHTML(
                infoDiv,
                `<p><span style='font-weight: bold;'>${
                  isFrenchApp ? "PG: " : "GP: "
                }</span>${PGFloat[0]}</p>`,
                "p"
              );
            }
          }
        }

        if (
          (window.location.href.indexOf("elevage/chevaux/?elevage") > -1 &&
            !isDetailedView) ||
          window.location.href.indexOf("centre/box") > -1
        ) {
          const skillsHtml = data.match(regexpSkillsHtml);
          if (skillsHtml) {
            const skillsFloat = skillsHtml[0].match(regexpFloat);
            parseHTML(
              infoDiv,
              `<p><span style='font-weight: bold;'>${
                isFrenchApp ? "Compétences: " : "Skills: "
              }</span>${skillsFloat[0]}</p>`,
              "p"
            );
          }
        }

        if (locationAllowed) {
          name.parentNode.insertBefore(infoDiv, name.nextSibling);

          // remvoe <br> element before affixes in some views (cf: detailed view in breeding)
          const br = name.parentNode.querySelector("br");
          br && br.remove();
        }
      });
  });
}

const breedingsBtn = document.getElementsByClassName("tab-action-select");

Array.from(breedingsBtn).forEach((breedingBtn) => {
  breedingBtn.addEventListener("click", () => {
    setTimeout(() => {
      moreInfos();
    }, 250);
  });
});

setTimeout(() => {
  moreInfos();
}, 250);
