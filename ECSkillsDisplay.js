function ECSkillsDisplay() {
  const names = document.getElementsByClassName('horsename');
  const namesArr = Array.from(names);

  const regexpSkillsHtml = /<span id="competencesValeur">[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?<\/span>/;
  const regexpFloat = /[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?/;

  namesArr.forEach((name) => {
    fetch(name.href)
      .then((res) => res.text())
      .then((data) => {
        const skillsHtml = data.match(regexpSkillsHtml);
        console.log(skillsHtml);
        if (skillsHtml) {
          const skillsFloat = skillsHtml[0].match(regexpFloat);
          name.insertAdjacentHTML('afterend', '<br><span style="color: #993322;">PG: ' + skillsFloat[0] + '</span><br>');
        }
      });
  });
}

if (window.location.href.indexOf('centre/box') > -1) {
  setTimeout(() => {
    ECSkillsDisplay();
  }, 50);
}
