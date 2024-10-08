class Translation {
  constructor() {
    this.data = {
      fr: {
        stat: {
          stamina: 'endurance',
          speed: 'vitesse',
          dressage: 'dressage',
          gallop: 'galop',
          trot: 'trot',
          jumping: 'saut'
        },
        competition: {
          trot: 'Trot',
          gallop: 'Galop',
          dressage: 'Dressage',
          crossCountry: 'Cross',
          showJumping: 'Cso',
          barrelRacing: 'Barrel racing',
          cutting: 'Cutting',
          trailClass: 'Trail class',
          reining: 'Reining',
          westernPleasure: 'Western pleasure',
          disclaimer: 'Plus le coeff est élevé plus il y a de chances de gagner'
        },
        other: {
          pet: 'Compagnon: ',
          pg: 'PG: ',
          skills: 'Compétences: '
        },
        sex: {
          genderLabel: "Sexe :",
          female: ' femelle',
          male: ' mâle',
          gelding: ' hongre'
        }
      },
      en: {
        stat: {
          stamina: 'stamina',
          speed: 'speed',
          dressage: 'dressage',
          gallop: 'gallop',
          trot: 'trot',
          jumping: 'jumping'
        },
        competition: {
          trot: 'Trot',
          gallop: 'Gallop',
          dressage: 'Dressage',
          crossCountry: 'Cross-country',
          showJumping: 'Show jumping',
          barrelRacing: 'Barrel racing',
          cutting: 'Cutting',
          trailClass: 'Trail class',
          reining: 'Reining',
          westernPleasure: 'Western pleasure',
          disclaimer: 'The higher the coefficient, the greater the chance of winning'
        },
        other: {
          pet: 'Pet: ',
          pg: 'GP: ',
          skills: 'Skills: '
        },
        sex: {
          genderLabel: "Gender:",
          female: ' female',
          male: ' male',
          gelding: ' gelding'
        }
      },
      no: {
        stat: {
          stamina: 'utholdenhet',
          speed: 'hurtighet',
          dressage: 'dressur',
          gallop: 'galopp',
          trot: 'trav',
          jumping: 'hopp'
        },
        competition: {
          trot: 'Travløp',
          gallop: 'Galoppløp',
          dressage: 'Dressurkonkurranser',
          crossCountry: 'Terrengløp',
          showJumping: 'Sprangridning',
          barrelRacing: 'Tønneløp',
          cutting: 'Cutting',
          trailClass: 'Trail class',
          reining: 'Reining',
          westernPleasure: 'Western pleasure',
          disclaimer: 'Jo høyere koeffisient, jo større er sjansen for å vinne'
        },
        other: {
          pet: 'Følgesvenner: ',
          pg: 'GP: ',
          skills: 'Ferdigheter: '
        },
        sex: {
          genderLabel: "Kjønn:",
          female: ' hunkjønn',
          male: ' hannkjønn',
          gelding: ' vallak'
        }
      },
      pl: {
        stat: {
          stamina: 'wytrzymałość',
          speed: 'prędkość',
          dressage: 'ujeżdżenie',
          gallop: 'galop',
          trot: 'kłus',
          jumping: 'skoki'
        },
        competition: {
          trot: 'Kłus',
          gallop: 'Galop',
          dressage: 'Ujeżdżenie',
          crossCountry: 'Biegi przełajowe',
          showJumping: 'Skoki przez przeszkody',
          barrelRacing: 'Barrel racing',
          cutting: 'Cutting',
          trailClass: 'Trail class',
          reining: 'Reining',
          westernPleasure: 'Western pleasure',
          disclaimer: 'Im wyższy współczynnik tym większa szansa na wygraną'
        },
        other: {
          pet: 'Towarzysz: ',
          pg: 'PG: ',
          skills: 'Umiejętności: '
        },
        sex: {
          genderLabel: "Płeć:",
          female: ' klacz',
          male: ' ogier',
          gelding: ' wałach'
        }
      },
      es: {
        stat: {
          stamina: 'resistencia',
          speed: 'velocidad',
          dressage: 'doma',
          gallop: 'galope',
          trot: 'trote',
          jumping: 'salto'
        },
        competition: {
          trot: 'Trote',
          gallop: 'Galope',
          dressage: 'Doma',
          crossCountry: 'Cross',
          showJumping: 'Carrera de obstáculos',
          barrelRacing: 'Barrel racing',
          cutting: 'Cutting',
          trailClass: 'Trail class',
          reining: 'Reining',
          westernPleasure: 'Western pleasure',
          disclaimer: 'Cuanto mayores sean las habilidades, mayores serán las posibilidades de ganar'
        },
        other: {
          pet: 'Mascota: ',
          pg: 'PG: ',
          skills: 'Habilidades: '
        },
        sex: {
          genderLabel: "Sexo:",
          female: ' hembra',
          male: ' macho',
          gelding: ' castrado'
        }
      },
      de: {
        stat: {
          stamina: 'ausdauer',
          speed: 'tempo',
          dressage: 'dressur',
          gallop: 'galopp',
          trot: 'trab',
          jumping: 'springen'
        },
        competition: {
          trot: 'Trab',
          gallop: 'Galopp',
          dressage: 'Dressur',
          crossCountry: 'Cross',
          showJumping: 'Springturnier',
          barrelRacing: 'Barrel Racing',
          cutting: 'Cutting',
          trailClass: 'Trail',
          reining: 'Reining',
          westernPleasure: 'Western Pleasure',
          disclaimer: 'Je höher der Koeffizient, desto größer die Gewinnchance'
        },
        other: {
          pet: 'Kamerad: ',
          pg: 'GP: ',
          skills: 'Fähigkeiten: '
        },
        sex: {
          genderLabel: "Geschlecht:",
          female: ' weiblich',
          male: ' männlich',
          gelding: ' Wallach'
        }
      }
    }
  }

  getLang(url) {
    const hostname = (new URL(url)).hostname;
  
    const languageMap = {
      'equideow': 'fr',
      'howrse.no': 'no',
      'howrse.pl': 'pl',
      'caballow.com': 'es',
      'howrse.de': 'de'
    };

    for (let domain in languageMap) {
      if (hostname.includes(domain)) {
        return languageMap[domain];
      }
    }

    return 'en'; 
  }

  get(lang, category, key) {
    return this.data[lang][category][key]
  }
}

const translation = new Translation()
