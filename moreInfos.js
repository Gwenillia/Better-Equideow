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

const loader = document.querySelector("#loading");
const tabChevaux = document.querySelector("#tab-chevaux");

/**
 * Reload moreInfos function after #loading element is not displayed anymore (SPA)
 */
const updateAfterLoading = () => {
  return new Promise((resolve) => {
    const styleObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.style.display === "none") {
          resolve();
        }
      });
    });

    styleObserver.observe(loader, {
      attributes: true,
      attributeFilter: ["style"],
    });
  });
};

// was used as test but could be useful in the future depending on URLparams update
/* const detectSelectedTab = () => {
  return new Promise((resolve) => {
    const childChangeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.target.className.match("selected")) {
          // first time clicking on horse = empty 'style', then 'style="display: block;"'
          resolve("horse");
        } else {
          resolve("other");
        }
      });
    });

    childChangeObserver.observe(tabChevaux, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
}; */

function querySelectorAllLive(el, selector) {
  const result = Array.prototype.slice.call(el.querySelectorAll(selector));

  const nodeObserver = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      [].forEach.call(mutation.addedNodes, (node) => {
        if (node.nodeType === NODE.ELEMENT_NODE && node.matches(selector)) {
          result.push(node);
          nodeObserver.disconnect();
        }
      });
    });
  });

  nodeObserver.observe(el, { childList: true, subtree: true });

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
const communauteLocation =
  window.location.href.indexOf("communaute/?type=tab") > -1;

let locationAllowed;
if (elevageLocation || sellsLocation || boxesLocation || communauteLocation) {
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
        infoDiv.className = "infodiv";
        infoDiv.style.display = "flex";
        infoDiv.style.flexFlow = "column nowrap";
        infoDiv.style.margin = ".25em 0";
        infoDiv.style.color = "#993322";

        if (!boxesLocation && locationAllowed) {
          const blupHtml = data.match(regexpBlupHtml);
          const PetHtml =
            data.match(regexpPetHtmlOthers) || data.match(regexpPetHtmlSelf);
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
            const PetName = PetHtml[0].match(regexpValue);
            parseHTML(
              infoDiv,
              `<p><span style='font-weight: bold;'>${
                isFrenchApp ? "Familier: " : "Pet: "
              }</span>${PetName[1]}</p>`,
              "p"
            );
          }

          // pegase / VIP
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

          // remove <br> element before affixes in some views (cf: detailed view in breeding)
          const br = name.parentNode.querySelector("br");
          br && br.remove();
          return;
        }
        return;
      });
  });
}

/**
 * handle the pages at the bottom of the community horse tab during a research to update infodiv after clicking them
 */
const handleDataPages = () => {
  const dataPages = document.querySelectorAll("a[data-page]");
  if (dataPages.length > 0) {
    dataPages.forEach((datapage) => {
      datapage.addEventListener("click", async () => {
        await updateAfterLoading();
        moreInfos();
        handleDataPages();
      });
    });
  }
};

const handleCurrentTab = async () => {
  if (window.location.href.indexOf("communaute/?type=tab-che") > -1) {
    setTimeout(() => {
      const searchBtnCommunaute = document.querySelector("#searchHorseButton");
      searchBtnCommunaute.addEventListener("click", async () => {
        await updateAfterLoading();
        moreInfos();
        handleDataPages();
      });
    }, 400);
  } else return;
};

window.onload = async () => {
  if (locationAllowed) {
    setTimeout(() => {
      moreInfos();
    }, 500);
  }

  if (elevageLocation) {
    const breedingsBtn = document.getElementsByClassName("tab-action-select");
    Array.from(breedingsBtn).forEach((breedingBtn) => {
      breedingBtn.addEventListener("click", async () => {
        await updateAfterLoading();
        moreInfos();
      });
    });
  }

  if (communauteLocation) {
    await handleCurrentTab();
    const tabs = document.getElementsByClassName("tab-style-6-0-0");
    Array.from(tabs).forEach((tab) => {
      tab.addEventListener("click", async () => {
        await handleCurrentTab();
      });
    });
  }
};
