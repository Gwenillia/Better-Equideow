/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class CompetitionRatio {
  constructor() {
    this.lang = translation.getLang(window.location.href)
    this.characteristicsContainer = document.getElementById('characteristics-body-content')
    this.bonusContainer = document.getElementById('bonuses-body-content')
    this.competitionsContainer = document.getElementById('competition-body-content')
    this.competitions = this.competitionsContainer.querySelectorAll('a')
    this.competitionTitle = document.getElementById('competition-head-title')

    this.parser = new DOMParser()
    this.age = this.calcAge()

    this.staminaBase = this.calcStatBase('enduranceValeur')
    this.staminaBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'stamina')}).+?[1-9]\d*`, "g"))
    this.staminaTotal = this.calcStatTotal(this.staminaBase, this.staminaBonuses)

    this.speedBase = this.calcStatBase('vitesseValeur')
    this.speedBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'speed')}).+?[1-9]\d*`, "g"))
    this.speedTotal = this.calcStatTotal(this.speedBase, this.speedBonuses)

    this.dressageBase = this.calcStatBase('dressageValeur')
    this.dressageBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'dressage')}).+?[1-9]\d*`, "g"))
    this.dressageTotal = this.calcStatTotal(this.dressageBase, this.dressageBonuses)

    this.gallopBase = this.calcStatBase('galopValeur')
    this.gallopBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'gallop')}).+?[1-9]\d*`, "g"))
    this.gallopTotal = this.calcStatTotal(this.gallopBase, this.gallopBonuses)

    this.trotBase = this.calcStatBase('trotValeur')
    this.trotBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'trot')}).+?[1-9]\d*`, "g"))
    this.trotTotal = this.calcStatTotal(this.trotBase, this.trotBonuses)

    this.jumpingBase = this.calcStatBase('sautValeur')
    this.jumpingBonuses = this.calcStatBonus(new RegExp(`(${translation.get(this.lang, 'stat', 'jumping')}).+?[1-9]\d*`, "g"))
    this.jumpingTotal = this.calcStatTotal(this.jumpingBase, this.jumpingBonuses)

    this.previousHorseButton = document.getElementById('nav-previous')
    this.nextHorseButton = document.getElementById('nav-next')
  }

  convert(value) {
    if (value !== null) {
      return value.join(',').replace(/[^0-9\.,]/g, '').split(',').map((i) => Number(i))
    }
  }

  calcAge() {
    const ageStr = this.characteristicsContainer.getElementsByClassName('align-right')[0].textContent
    const ageStrArr = ageStr.match(/[1-9]\d*/g)

    let ageIntArr
    if (ageStrArr) {
      ageIntArr = ageStrArr.map((i) => Number(i))
    } else return

    if (ageIntArr.length > 1) {
      return this.age = ageIntArr[0] * 12 + ageIntArr[1]
    } else if (ageIntArr.length === 1) {
      return this.age = ageIntArr[0] * 12
    } else {
      return
    }
  }

  calcStatBase(stat) {
    return parseFloat(document.getElementById(stat)?.innerText)
  }

  calcStatBonus(stat) {
    if (this.bonusContainer.childElementCount !== 4) {
      const statBonuses = this.bonusContainer.outerHTML.match(stat)
      return this.convert(statBonuses)
    }
  }

  calcStatTotal(statBase, statBonuses) {
    const totalBonusValue = statBonuses?.reduce((a, b) => a + b) || 0
    return statBase + totalBonusValue
  }

  calcCoeff(primarySkill, secondarySkill, lastSkill) {
    return (primarySkill * 0.45 + secondarySkill * 0.3 + lastSkill * 0.2 + this.age * 0.05)
  }

  competitionsDiffDisplay() {
    this.competitionTitle.style.display = 'flex'
    this.competitionTitle.style.flexFlow = 'column nowrap'
    const hintHTML = `<span style='font-size: .8em;'> ${translation.get(this.lang, 'competition', 'disclaimer')}</span> `
    const parsedHintHtml = this.parser.parseFromString(hintHTML, `text/html`)
    const hintTags = parsedHintHtml.getElementsByTagName(`span`)

    for (const tag of hintTags) {
      this.competitionTitle.appendChild(tag)
    }

    this.competitions.forEach((competition) => {
      const diffDiv = document.createElement('div')
      diffDiv.style.margin = '0 0 0.2em 0'
      diffDiv.style.color = '#993322'

      let coeff

      switch (competition.innerText) {
        case translation.get(this.lang, 'competition', 'trot'):
          coeff = this.calcCoeff(this.trotTotal, this.speedTotal, this.dressageTotal) / this.trotBase
          break
        case translation.get(this.lang, 'competition', 'gallop'):
          coeff = this.calcCoeff(this.gallopTotal, this.speedTotal, this.dressageTotal) / this.gallopBase
          break
        case translation.get(this.lang, 'competition', 'dressage'):
          coeff = this.calcCoeff(this.dressageTotal, this.trotTotal, this.gallopTotal) / this.dressageBase
          break
        case translation.get(this.lang, 'competition', 'crossCountry'):
          coeff = this.calcCoeff(this.staminaTotal, this.dressageTotal, this.jumpingTotal) / this.staminaBase
          break
        case translation.get(this.lang, 'competition', 'showJumping'):
          coeff = this.calcCoeff(this.jumpingTotal, this.dressageTotal, this.speedTotal) / this.jumpingBase
          break
        case translation.get(this.lang, 'competition', 'barrelRacing'):
          coeff = this.calcCoeff(this.speedTotal, this.staminaTotal, this.gallopTotal) / this.speedBase
          break
        case translation.get(this.lang, 'competition', 'cutting'):
          coeff = this.calcCoeff(this.staminaTotal, this.dressageTotal, this.speedTotal) / this.staminaBase
          break
        case translation.get(this.lang, 'competition', 'trailClass'):
          coeff = this.calcCoeff(this.dressageTotal, this.trotTotal, this.jumpingTotal) / this.dressageBase
          break
        case translation.get(this.lang, 'competition', 'reining'):
          coeff = this.calcCoeff(this.gallopTotal, this.dressageTotal, this.staminaTotal) / this.gallopBase
          break
        case translation.get(this.lang, 'competition', 'westernPleasure'):
          coeff = this.calcCoeff(this.trotTotal, this.staminaTotal, this.dressageTotal) / this.trotBase
          break
      }

      if (coeff) {
        const diffDivHTML = `<span> <span style='font-weight: bold;'>Coeff: </span>${coeff.toFixed(2)}</span> `

        const parsedDiffDivHTML = this.parser.parseFromString(diffDivHTML, `text/html`)
        const diffDivTags = parsedDiffDivHTML.getElementsByTagName(`span`)

        for (const tag of diffDivTags) {
          diffDiv.appendChild(tag)
        }
        competition.parentNode.insertBefore(diffDiv, competition.nextSibling)
      }
    })
  }

  handleArrowKeySwitch(event) {
    switch (event.keyCode) {
      case 37:
        const previousHorseButton = document.getElementById('nav-previous')
        previousHorseButton.click()
        break
      case 39:
        const nextHorseButton = document.getElementById('nav-next')
        nextHorseButton.click()
        break
    }
  }

  run() {
    chrome.storage.sync.get({ 'competitionRatio': true }, (data) => {
      if (data.competitionRatio) {
        document.addEventListener('keyup', this.handleArrowKeySwitch)
        this.competitionsDiffDisplay()
      }
    })
  }
}

if (window.location.href.indexOf('elevage/chevaux/cheval') > -1) {
  const competitionRatio = new CompetitionRatio()
  competitionRatio.run()
}
