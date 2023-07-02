/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class FoodSelect {
  constructor() {
    this.feedingBtn = document.getElementById("boutonNourrir")
    this.haySlider = document.getElementById("haySlider") || null
    this.haySelectors = this.haySlider?.getElementsByTagName("span")
    this.oatsSlider = document.getElementById("oatsSlider") || null
    this.oatsSelectors = this.oatsSlider?.getElementsByTagName("span")
    this.careTabFeed = document.getElementById('care-tab-feed')
    this.messageBox = this.careTabFeed.querySelector("#messageBoxInline")?.textContent
    this.fourrageNode = document.getElementsByClassName("section-fourrage section-fourrage-target")[0]
    this.avoineNode = document.getElementsByClassName("section-avoine section-avoine-target")[0]
  }

  getFoodIndex(foodNode) {
    if (this.messageBox && foodNode === this.fourrageNode) {
      return this.messageBox.includes('20') ? 20 : 0
    } 
    else {
      const foodValue = foodNode.textContent
      const foodIndex = parseInt(foodValue)
      return foodIndex
    }
  }

  async run() {
    chrome.storage.sync.get({ 'foodSelect': true }, (data) => {
      if (data.foodSelect) {
        if (this.fourrageNode) {
          const fourrageIndex = this.getFoodIndex(this.fourrageNode)
          this.haySelectors[fourrageIndex].click()
        }

        if (this.avoineNode) {
          const avoineIndex = this.getFoodIndex(this.avoineNode)
          this.oatsSelectors[avoineIndex].click()
        }
      }
    })
  }
}

const horseFeedingPageRegex = /\/elevage\/chevaux\/cheval\?/

if (window.location.href.match(horseFeedingPageRegex)) {
  let foodSelect = new FoodSelect()
  if (foodSelect.feedingBtn !== null) {
    foodSelect.feedingBtn.addEventListener("click", () => {
      foodSelect.run()
    })
  }

  /**
  * @description generate a new FoodSelect() because after #loading style change, 
  * it seems like the different this.elements from foodSelect are erased ..
  * @todo fix it...
  */
  const startObserver = () => {
    observer.start().then(() => {
      let newFoodSelect = new FoodSelect()
      newFoodSelect.run()
      startObserver()
    })
  }

  startObserver()
}
