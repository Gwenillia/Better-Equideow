/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class FoodSelect {
  constructor() {
    this.feedingBtn = document.getElementById("boutonNourrir");
    this.haySlider = document.getElementById("haySlider"); // entire bloc containing ol, script, li, span
    this.haySelectors = this.haySlider.getElementsByTagName("span"); // all span selectors from 0 to 20
    this.oatsSlider = document.getElementById("oatsSlider");
    this.oatsSelectors = this.oatsSlider.getElementsByTagName("span");
  }

  selectFeedAmount() {
    // will get the value eg: XX/20 for hay and X/16 for oats.
    const fourrageNode = document.getElementsByClassName(
      "section-fourrage section-fourrage-target"
    );
    const avoineNode = document.getElementsByClassName(
      "section-avoine section-avoine-target"
    );

    const fourrageValue = fourrageNode[0].innerHTML;
    const avoineValue = avoineNode[0].innerHTML;

    const fourrageIndex = parseInt(fourrageValue);
    const avoineIndex = parseInt(avoineValue);

    this.haySelectors[fourrageIndex].click();
    this.oatsSelectors[avoineIndex].click();
  }
}

const foodSelect = new FoodSelect();

foodSelect.feedingBtn.addEventListener("click", () => {
  foodSelect.selectFeedAmount();
});
