/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

let isFrenchApp;

if (window.location.host.match(/.+equideow.+/)) {
  isFrenchApp = true;
}

const parser = new DOMParser();
const reducer = (a, b) => a + b;

let age;
let staminaTotalBonusValue;
let speedTotalBonusValue;
let dressageTotalBonusValue;
let gallopTotalBonusValue;
let trotTotalBonusValue;
let jumpingTotalBonusValue;

function convert(x) {
  return x.join(',').replace(/[^0-9\.,]/g, '').split(',').map((i) => Number(i));
}

function calcPoints(primarySkill, secondarySkill, lastSkill) {
  return (primarySkill * 0.45 + secondarySkill * 0.3 + lastSkill * 0.2 + age * 0.05);
}

function competitionsDiffDisplay() {
  const characteristics = document.getElementById('characteristics-body-content');
  const ageStr = characteristics.getElementsByClassName('align-right')[0].textContent;
  const ageStrArr = ageStr.match(/[1-9]\d*/g);
  const ageIntArr = ageStrArr.map((i) => Number(i));

  if (ageIntArr.length > 1) {
    age = ageIntArr[0] * 12 + ageIntArr[1];
  } else {
    age = ageIntArr[0] * 12;
  }

  const stamina = parseFloat(document.getElementById('enduranceValeur').innerText);
  const speed = parseFloat(document.getElementById('vitesseValeur').innerText);
  const dressage = parseFloat(document.getElementById('dressageValeur').innerText);
  const gallop = parseFloat(document.getElementById('galopValeur').innerText);
  const trot = parseFloat(document.getElementById('trotValeur').innerText);
  const jumping = parseFloat(document.getElementById('sautValeur').innerText);

  const bonusHtml = document.getElementById('bonuses-body-content');


  if (!bonusHtml.outerHTML.match(/(Ce cheval n'a aucun bonus.|This horse doesn't have any bonuses.|Cette jument n'a aucun bonus.|This mare doesn't have any bonuses.)/)) {
    const staminaBonuses = bonusHtml.outerHTML.match(/(endurance|stamina).+?[1-9]\d*/g);
    const staminaBonusesValues = convert(staminaBonuses);


    const speedBonuses = bonusHtml.outerHTML.match(/(vitesse|speed).+?[1-9]\d*/g);
    const speedBonusesValues = convert(speedBonuses);


    const dressageBonuses = bonusHtml.outerHTML.match(/dressage.+?[1-9]\d*/g);
    const dressageBonusesValues = convert(dressageBonuses);


    const gallopBonuses = bonusHtml.outerHTML.match(/(galop|gallop).+?[1-9]\d*/g);
    const gallopBonusesValues = convert(gallopBonuses);

    const trotBonuses = bonusHtml.outerHTML.match(/trot.+?[1-9]\d*/g);
    const trotBonusesValues = convert(trotBonuses);


    const jumpingBonuses = bonusHtml.outerHTML.match(/(saut|jumping).+?[1-9]\d*/g);
    const jumpingBonusesValues = convert(jumpingBonuses);

    // all bonuses

    staminaTotalBonusValue = staminaBonusesValues.reduce(reducer);
    speedTotalBonusValue = speedBonusesValues.reduce(reducer);
    dressageTotalBonusValue = dressageBonusesValues.reduce(reducer);
    gallopTotalBonusValue = gallopBonusesValues.reduce(reducer);
    trotTotalBonusValue = trotBonusesValues.reduce(reducer);
    jumpingTotalBonusValue = jumpingBonusesValues.reduce(reducer);
  }

  const totalStamina = stamina + staminaTotalBonusValue;
  const totalSpeed = speed + speedTotalBonusValue;
  const totalDressage = dressage + dressageTotalBonusValue;
  const totalGallop = gallop + gallopTotalBonusValue;
  const totalTrot = trot + trotTotalBonusValue;
  const totalJumping = jumping + jumpingTotalBonusValue;

  const competitionsHTML = document.getElementById('competition-body-content');
  const competitionTitle = document.getElementById('competition-head-title');
  const competitions = competitionsHTML.querySelectorAll('a');

  competitionTitle.style.display = 'flex';
  competitionTitle.style.flexFlow = 'column nowrap';
  const hintHTML = `<span style="font-size: .8em;">${isFrenchApp ? 'Plus le coeff est élevé plus il y a de chances de gagner' : 'The higher the coefficient, the greater the chance of winning'}</span>`;
  const parsedHintHtml = parser.parseFromString(hintHTML, `text/html`);
  const hintTags = parsedHintHtml.getElementsByTagName(`span`);

  for (const tag of hintTags) {
    competitionTitle.appendChild(tag);
  }

  competitions.forEach((competition) => {
    const diffDiv = document.createElement('div');
    diffDiv.style.margin = '0 0 0.2em 0';
    diffDiv.style.color = '#993322';

    let coeff;

    switch (competition.innerText) {
      case 'Trot':
        coeff = calcPoints(totalTrot, totalSpeed, totalDressage) / trot;
        break;
      case 'Galop':
      case 'Gallop':
        coeff = calcPoints(totalGallop, totalSpeed, totalDressage) / gallop;
        break;
      case 'Dressage':
        coeff = calcPoints(totalDressage, totalTrot, totalGallop) / dressage;
        break;
      case 'Cross':
      case 'Cross-country':
        coeff = calcPoints(totalStamina, totalDressage, totalJumping) / stamina;
        break;
      case 'Cso':
      case 'Show jumping':
        coeff = calcPoints(totalJumping, totalDressage, totalSpeed) / jumping;
        break;
      case 'Barrel racing':
        coeff = calcPoints(totalSpeed, totalStamina, totalGallop) / speed;
        break;
      case 'Cutting':
        coeff = calcPoints(totalStamina, totalDressage, totalSpeed) / stamina;
        break;
      case 'Trail class':
        coeff = calcPoints(totalDressage, totalTrot, totalJumping) / dressage;
        break;
      case 'Reining':
        coeff = calcPoints(totalGallop, totalDressage, totalStamina) / gallop;
        break;
      case 'Western pleasure':
        coeff = calcPoints(totalTrot, totalStamina, totalDressage) / trot;
        break;
    }

    if (coeff) {
      const diffDivHTML = `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;

      const parsedDiffDivHTML = parser.parseFromString(diffDivHTML, `text/html`);
      const diffDivTags = parsedDiffDivHTML.getElementsByTagName(`span`);

      for (const tag of diffDivTags) {
        diffDiv.appendChild(tag);
      }
      competition.parentNode.insertBefore(diffDiv, competition.nextSibling);
    }
  });
}

if (window.location.href.indexOf('elevage/chevaux/cheval') > -1) {
  setTimeout(() => {
    competitionsDiffDisplay();
  }, 250);
}
