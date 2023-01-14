/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

class LoadingDisplayObserver {
    constructor() {
        this.targetNode = document.querySelector('#loading');
        this.config = { attributes: true, attributeFilter: ['style'] };
    }
    start() {
        return new Promise((resolve) => {
            this.observer = new MutationObserver((mutationsList) => {
                for (let mutation of mutationsList) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
                        let element = mutation.target;
                        let display = window.getComputedStyle(element, null).getPropertyValue("display");
                        if (display === "none") {
                            resolve();
                        }
                    }
                }
            });
            this.observer.observe(this.targetNode, this.config);
        });
    }
    stop() {
        this.observer.disconnect();
    }
}

const observer = new LoadingDisplayObserver();