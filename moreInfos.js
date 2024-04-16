/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class MoreInfos {
  constructor() {
    this.regexpBlupHtml =
      /<td class="last align-right" width="15%" dir="ltr"><strong class="nowrap">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/strong><\/td>/
    this.regexpPGHtml =
      /<strong>Total.+[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?<\/strong>/
    this.regexpSkillsHtml =
      /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/
    this.regexpPetHtmlOthers =
      /<h3 class="align-center module-style-6-title module-title">.*<\/h3>/
    this.regexpPetHtmlSelf =
      /<h3 id="compagnon-head-title" class="align-center module-style-6-title module-title">.*<\/h3>/
    this.regexpSexHtml = /<td class="first"><strong>Sexo:<\/strong>\s*(\w+)<\/td>/

    this.regexpFloat = /[+-]?(?=\d*[.eE])(?=\.?\d)\d*\.?\d*(?:[eE][+-]?\d+)?/
    this.regexpValue = /\>(.*?)\</

    this.parser = new DOMParser()
    this.lang = translation.getLang(window.location.href)

    this.elevageLocation =
      window.location.href.indexOf("elevage/chevaux/?elevage") > -1
    this.sellsLocation = window.location.href.indexOf("marche/vente") > -1
    this.boxesLocation = window.location.href.indexOf("centre/box") > -1
    this.communauteLocation =
      window.location.href.indexOf("communaute/?type=tab") > -1

    this.locationAllowed = this.elevageLocation || this.sellsLocation || this.boxesLocation || this.communauteLocation
  }

  querySelectorAllLive(element, selector) {
    const result = Array.prototype.slice.call(element.querySelectorAll(selector))

    const nodeObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        [].forEach.call(mutation.addedNodes, (node) => {
          if (node.nodeType === NODE.ELEMENT_NODE && node.matches(selector)) {
            result.push(node)
            nodeObserver.disconnect()
          }
        })
      })
    })

    nodeObserver.observe(element, { childList: true, subtree: true })

    return result
  }

  parseHTML(targetDiv, html, selector) {
    const parsedTargetDivHTML = this.parser.parseFromString(html, `text/html`)
    const targetDivTags = this.querySelectorAllLive(parsedTargetDivHTML, selector)

    for (const tag of targetDivTags) {
      targetDiv.appendChild(tag)
    }
  }

  run() {
    chrome.storage.sync.get({ 'moreInfos': true }, (data) => {
      if (data.moreInfos) {
        const infoDivExist = document.getElementsByClassName('infodiv')
        if (infoDivExist.length > 1) return

        const isDetailedView = document.getElementById("detail-chevaux")
        const names = document.getElementsByClassName("horsename")
        const namesArr = Array.from(names)

        namesArr.forEach((name) => {
          fetch(name.href)
            .then((res) => res.text())
            .then((data) => {
              const infoDiv = document.createElement("div")
              infoDiv.className = "infodiv"
              infoDiv.style.display = "flex"
              infoDiv.style.flexFlow = "column nowrap"
              infoDiv.style.margin = ".25em 0"
              infoDiv.style.color = "#993322"

              const imageContainerDiv = document.createElement("div")
              imageContainerDiv.style.position = "absolute"
              imageContainerDiv.style.top = "0"
              imageContainerDiv.style.right = "0"

              const sexHTML = data.match(this.regexpSexHtml);
              const img = document.createElement("img")
              if (sexHTML[1] === `${translation.get(this.lang, 'sex', 'female')}`) {
                img.src = chrome.runtime.getURL("images/female.png")
              } else if (sexHTML[1] === `${translation.get(this.lang, 'sex', 'male')}`) {
                img.src = chrome.runtime.getURL("images/male.png")
              } else {
                img.src = chrome.runtime.getURL("images/gelding.png")
              }
              img.style.width = "auto"
              img.style.height = "auto"
              imageContainerDiv.appendChild(img)

              infoDiv.appendChild(imageContainerDiv)

              if (!this.boxesLocation && this.locationAllowed) {
                const blupHtml = data.match(this.regexpBlupHtml)
                const PetHtml =
                  data.match(this.regexpPetHtmlOthers) || data.match(this.regexpPetHtmlSelf)
                if (blupHtml) {
                  const blupFloat = blupHtml[0].match(this.regexpFloat)
                  this.parseHTML(
                    infoDiv,
                    '<p><span style="font-weight: bold;">Blup: </span>' +
                    blupFloat[0] +
                    "</p>",
                    "p"
                  )
                }

                if (PetHtml) {
                  const PetName = PetHtml[0].match(this.regexpValue)
                  this.parseHTML(
                    infoDiv,
                    `<p><span style='font-weight: bold;'>${translation.get(this.lang, 'other', 'pet')}</span>${PetName[1]}</p>`,
                    "p"
                  )
                }

                // pegase / VIP
                if (
                  !isDetailedView &&
                  !(this.sellsLocation)
                ) {
                  const PGHtml = data.match(this.regexpPGHtml)
                  if (PGHtml) {
                    const PGFloat = PGHtml[0].match(this.regexpFloat)
                    this.parseHTML(
                      infoDiv,
                      `<p><span style='font-weight: bold;'>${translation.get(this.lang, 'other', 'pg')}</span>${PGFloat[0]}</p>`,
                      "p"
                    )
                  }
                }
              }

              if (
                (this.elevageLocation && !isDetailedView) || this.boxesLocation
              ) {
                const skillsHtml = data.match(this.regexpSkillsHtml)
                if (skillsHtml) {
                  const skillsFloat = skillsHtml[0].match(this.regexpFloat)
                  this.parseHTML(
                    infoDiv,
                    `<p><span style='font-weight: bold;'>${translation.get(this.lang, 'other', 'skills')}</span>${skillsFloat[0]}</p>`,
                    "p"
                  )
                }
              }

              if (this.locationAllowed) {
                name.parentNode.insertBefore(infoDiv, name.nextSibling)

                // remove <br> element before affixes in some views (cf: detailed view in breeding)
                const br = name.parentNode.querySelector("br")
                br && br.remove()
                return
              }
              return
            })
        })
      }
    })
  }
}

const moreInfos = new MoreInfos()

if (moreInfos.locationAllowed) {
  moreInfos.run()

  const startObserver = () => {
    observer.start().then(() => {
      moreInfos.run()
      startObserver()
    })
  }
  startObserver()
}
