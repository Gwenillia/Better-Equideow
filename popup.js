/*
 * Copyright (c) 2022. Gwen Tripet-Costet
 * This file is part of Better Equideow (Better Howrse).
 * Better Equideow (Better Howrse) is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
 * Better Equideow (Better Howrse) is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

const links = document.getElementsByTagName('a');

Array.from(links).forEach((a) => {
  a.addEventListener('click', () => {
    window.close();
  });
});
