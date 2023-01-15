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
        }
      }
    }
  }

  getLang(url) {
    const hostname = (new URL(url)).hostname
    if (hostname.includes('equideow')) {
      return 'fr'
    } else if (hostname.includes('howrse.com')) {
      return 'en'
    }

    return hostname.match(/\.([^.]+)$/)[1]
  }

  get(lang, category, key) {
    return this.data[lang][category][key]
  }
}

const translation = new Translation()