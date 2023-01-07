/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const pets = [
  "abeille",
  "ours",
  "grenouille",
  "papillon",
  "chameau",
  "chat",
  "chien",
  "giraffe",
  "chevre",
  "grizzly",
  "poule",
  "kangourou",
  "lama",
  "ara",
  "singe",
  "orque",
  "autruche",
  "hibou",
  "pingouin",
  "lapin",
  "mouton",
  "ecureuil",
  "hirondelle",
  "tortue",
  "zebre",
  "coccinnelle",
  "weta",
  "herisson",
  "singe-neige",
  "akita-inu",
  "panda",
  "sanglier",
  "hermine",
  "phenix",
  "griffon",
  "namazu",
  "shika",
  "skoll-hati",
  "kyubiko",
  "ow",
  "fee",
  "peluche-licorne",
  "fantome-1",
  "fantome-2",
  "fantome-3",
  "dragon-1",
  "dragon-2",
  "dragon-3",
  "dragon-4",
  "dragon-5",
  "gecko-1",
  "gecko-2",
  "cardinal-1",
  "cardinal-2",
  "armadillo-1",
  "armadillo-2",
  "axolotl-1",
  "axolotl-2",
  "porc-epic-1",
  "porc-epic-2",
  "chauve-souris-1",
  "chauve-souris-2",
  "raton-laveur-1",
  "raton-laveur-2",
  "iguane-1",
  "iguane-2",
  "raie-manta-1",
  "raie-manta-2",
  "jaguar",
  "dauphin",
  "alebrijow",
  "neko",
  "shiba-inu",
  "kojika",
  "koi",
  "tsuru",
  "kitsune",
  "tora",
  "itachi",
  "okami",
  "nekomata",
  "kyuubi-no-kitsune",
  "kingyo",
  "ezoshika",
  "komainu",
  "banken",
  "tsuchinoko",
  "tengu",
  "kamaitachi",
  "okuri-inu",
  "ryu",
  "kaeru",
  "kaeru-no-senshi",
  "sown-goku",
  "monstre-1",
  "monstre-2",
  "monstre-3",
  "monstre-4",
  "monstre-5",
  "monstre-6",
  "monstre-7",
  "monstre-8",
  "monstre-9",
  "monstre-10",
  "monstre-11",
  "monstre-12",
  "monstre-13",
  "monstre-14",
  "monstre-15",
  "monstre-16",
  "monstre-17",
  "monstre-18",
  "monstre-19",
  "monstre-20",
  "monstre-21",
  "monstre-22",
  "monstre-23",
  "monstre-24",
  "monstre-25",
  "monstre-26",
  "monstre-27",
  "monstre-28",
  "cat-sidhe-1",
  "cat-sidhe-2",
  "cat-sidhe-3",
  "cat-sidhe-4",
  "cat-sidhe-5",
  "cat-sidhe-6",
  "cat-sidhe-7",
  "cat-sidhe-8",
  "krill",
  "seahorse",
  "clownfish",
  "crab",
  "jellyfish",
  "cow-fish",
  "surgeon-fish",
  "lion-fish",
  "sea-turtle",
  "giant-squid",
];

class PetFilter {
  constructor() {
    this.emptyTdLabel = document.querySelectorAll("td.dashed")[4];
    this.emptyTdSelect = document.querySelectorAll("td.dashed")[5];
  }

  getSelectedPet() {
    const urlParams = window.location.href.split("&").filter((e) => e);
    const petParam = urlParams[7];
    const petSplit = petParam.toString().split(/=|-/);
    const petValue = petSplit.slice(2, 4).join("-");
    return petValue;
  }

  appendPetFilter() {
    const petLabel = document.createElement("b");
    petLabel.innerText = "Familier :";

    const petSelectScript = document.createElement("script");
    petSelectScript.type = "text/javascript";
    petSelectScript.nonce = "cabe61781efa1c75d1010741f73d74f5";
    petSelectScript.innerText = `execWhenReady(function(){$("#compagnon").on("click", function(event){return lock("id:compagnon");})});`;

    const petSelect = document.createElement("select");
    petSelect.className = "select";
    petSelect.name = "compagnon";
    petSelect.id = "compagnon";
    petSelect.innerHTML = `<option value>peu importe</option>`;

    const petOptions = pets.map((petOption) => {
      const option = document.createElement("option");
      option.value = `compagnon-${petOption}`;
      option.innerText = petOption;
      return option;
    });

    petOptions.forEach((option) => {
      petSelect.appendChild(option);
    });

    this.emptyTdLabel.innerHTML += petLabel.outerHTML;
    this.emptyTdSelect.innerHTML += petSelectScript.outerHTML;
    this.emptyTdSelect.innerHTML += petSelect.outerHTML;

    if (this.getSelectedPet()) {
      const selectedOption = document.querySelector(
        `option[value="compagnon-${this.getSelectedPet()}"]`
      );
      selectedOption.setAttribute("selected", "selected");
    }
  }
}

const petFilter = new PetFilter();

window.addEventListener("load", () => {
  window.location.href.indexOf("marche/vente") > 1 &&
    petFilter.appendPetFilter();
});
