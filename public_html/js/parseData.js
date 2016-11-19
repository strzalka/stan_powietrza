/* 
 * Copyright (C) 2016 Bartek
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */



var ViewModel = function(data) {
    this.title = data.title;
    this.meas = data.series;
};

$.getJSON( "http://bstyczen.edl.pl/smog/data.json" , function( result ){
    ko.applyBindings(new ViewModel(result.data)); // This makes Knockout get to work
});
