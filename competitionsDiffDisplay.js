function competitionsDiffDisplay() {

  let isFrenchApp;

  if (window.location.host.match(/.+equideow.+/)) {
    isFrenchApp = true;
  }

  const competitionsHTML = document.getElementById('competition-body-content');
  const competitionTitle = document.getElementById('competition-head-title');
  const competitions = competitionsHTML.querySelectorAll('a');

  competitionTitle.style.display = 'flex';
  competitionTitle.style.flexFlow = 'column nowrap';
  competitionTitle.innerHTML += `<span style="font-size: .8em;">${isFrenchApp ? 'Plus le coeff est élevé plus il y a de chances de gagner' : 'The higher the coefficient, the greater the chance of winning'}</span>`;

  const characteristics = document.getElementById('characteristics-body-content');
  const ageStr = characteristics.getElementsByClassName('align-right')[0].textContent;
  const ageStrArr = ageStr.match(/[1-9]\d*/g);
  const ageIntArr = ageStrArr.map((i) => Number(i));

  let age;
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

  // Different calculs for bonuses
  function convert(x) {
    return x.join(',').replace(/[^0-9\.,]/g, '').split(',').map((i) => Number(i));
  }

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
  const reducer = (a, b) => a + b;

  const staminaTotalBonusValue = staminaBonusesValues.reduce(reducer);
  const speedTotalBonusValue = speedBonusesValues.reduce(reducer);
  const dressageTotalBonusValue = dressageBonusesValues.reduce(reducer);
  const gallopTotalBonusValue = gallopBonusesValues.reduce(reducer);
  const trotTotalBonusValue = trotBonusesValues.reduce(reducer);
  const jumpingTotalBonusValue = jumpingBonusesValues.reduce(reducer);

  competitions.forEach((competition) => {
    const diffDiv = document.createElement('div');
    diffDiv.style.margin = '0 0 0.2em 0';
    diffDiv.style.color = '#993322';

    let points;
    let coeff;

    switch (competition.innerText) {
      case 'Trot':
        points = (trot + trotTotalBonusValue) * 0.45 + (speed + speedTotalBonusValue) * 0.3 + (dressage + dressageTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / trot;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Galop':
      case 'Gallop':
        points = (gallop + gallopTotalBonusValue) * 0.45 + (speed + speedTotalBonusValue) * 0.3 + (dressage + dressageTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / gallop;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Dressage':
        points = (dressage + dressageTotalBonusValue) * 0.45 + (trot + trotTotalBonusValue) * 0.3 + (gallop + gallopTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / dressage;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Cross':
      case 'Cross-country':
        points = (stamina + staminaTotalBonusValue) * 0.45 + (dressage + dressageTotalBonusValue) * 0.3 + (jumping + jumpingTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / stamina;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Cso':
      case 'Show jumping':
        points = (jumping + jumpingTotalBonusValue) * 0.45 + (dressage + dressageTotalBonusValue) * 0.3 + (speed + speedTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / jumping;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Barrel racing':
        points = (speed + speedTotalBonusValue) * 0.45 + (stamina + staminaTotalBonusValue) * 0.3 + (gallop + gallopTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / speed;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Cutting':
        points = (stamina + staminaTotalBonusValue) * 0.45 + (dressage + dressageTotalBonusValue) * 0.3 + (speed + speedTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / stamina;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Trail class':
        points = (dressage + dressageTotalBonusValue) * 0.45 + (trot + trotTotalBonusValue) * 0.3 + (jumping + jumpingTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / dressage;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Reining':
        points = (gallop + gallopTotalBonusValue) * 0.45 + (dressage + dressageTotalBonusValue) * 0.3 + (stamina + staminaTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / gallop;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
      case 'Western pleasure':
        points = (trot + trotTotalBonusValue) * 0.45 + (stamina + staminaTotalBonusValue) * 0.3 + (dressage + dressageTotalBonusValue) * 0.2 + age * 0.05;
        coeff = points / trot;
        diffDiv.innerHTML += `<span><span style="font-weight: bold;">Coeff: </span>${coeff.toFixed(2)}</span>`;
        break;
    }

    competition.parentNode.insertBefore(diffDiv, competition.nextSibling);
  });
}

setTimeout(() => {
  competitionsDiffDisplay();
}, 50);
