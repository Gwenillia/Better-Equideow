/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class FoodSelect {
  constructor() {
    this.feedingBtn = this.setHTMLElement("#boutonNourrir")
    this.haySlider = this.setHTMLElement("#haySlider") || null // entire bloc containing ol, script, li, span
    this.haySelectors = this.haySlider?.getElementsByTagName("span") // all span selectors from 0 to 20
    this.oatsSlider = this.setHTMLElement("#oatsSlider") || null
    this.oatsSelectors = this.oatsSlider?.getElementsByTagName("span")
  }

  setHTMLElement(element) {
    return document.querySelector(element)
  };

  getFoodIndex(foodNode) {
    const foodValue = foodNode.innerHTML
    const foodIndex = parseInt(foodValue)
    return foodIndex
  }


  async run() {
    // will get the value eg: XX/20 for hay and X/16 for oats.
    const fourrageNode = document.getElementsByClassName(
      "section-fourrage section-fourrage-target"
    )
    const avoineNode = document.getElementsByClassName(
      "section-avoine section-avoine-target"
    )

    if (fourrageNode.length > 0) {
      const fourrageIndex = this.getFoodIndex(fourrageNode[0])
      this.haySelectors[fourrageIndex].click()
    }

    if (avoineNode.length > 0) {
      const avoineIndex = this.getFoodIndex(avoineNode[0])
      this.oatsSelectors[avoineIndex].click()
    }
  }
}

if (window.location.href.indexOf("elevage/chevaux/cheval?") > -1) {
  const startObserver = () => {
    observer.start().then(() => {
      const foodSelect = new FoodSelect()
      if (foodSelect.feedingBtn !== null)
        foodSelect.feedingBtn.addEventListener("click", () => {
          foodSelect.run()
        })

      startObserver()
    })
  }
  startObserver()
}