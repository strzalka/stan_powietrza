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
    this.title = ko.observable(data.title);
    this.meas = ko.observable(data.series); // 0 - benzen, 1 - NO2, 2- SO2, 3- Ozon, 4 - Ozon 8h, 5 - PM10, 6 - PM2.5, 7 - NO, 8 - NOx, 
    
    this.nr_ost_pom = ko.dependentObservable(function() {
	return Math.max(data.series[0].data.length, data.series[1].data.length, data.series[2].data.length, data.series[3].data.length, data.series[5].data.length, data.series[6].data.length)-1;
    }, this);

     this.ost_timestamp = ko.dependentObservable(function() {
	if (data.series[1].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[1].data[this.nr_ost_pom()][0]);
	} 
	else    { 
		if (data.series[1].data.length - 1 == this.nr_ost_pom()) {
		return Number(data.series[1].data[this.nr_ost_pom()][0]);
		} else {
			if (data.series[2].data.length - 1 == this.nr_ost_pom()) {
			return Number(data.series[2].data[this.nr_ost_pom()][0]);
			} else {
				if (data.series[3].data.length - 1 == this.nr_ost_pom()) {
				return Number(data.series[3].data[this.nr_ost_pom()][0]);
				} else {
					if (data.series[5].data.length - 1 == this.nr_ost_pom()) {
					return Number(data.series[5].data[this.nr_ost_pom()][0]);
					} else {
						if (data.series[6].data.length - 1 == this.nr_ost_pom()) {
						return Number(data.series[6].data[this.nr_ost_pom()][0]);
						} else {
						return 1479488400;
	}}}}}}	
    },this);

    this.czas = ko.dependentObservable(function() {
   	var d = new Date(this.ost_timestamp()*1000);
	var yyyy = d.getFullYear();
	var mm = ('0' + (d.getMonth() + 1)).slice(-2);	// Months are zero based. Add leading 0.
	var dd = ('0' + d.getDate()).slice(-2);			// Add leading 0.
	var hh = d.getHours();
	var h = hh;
	var min = ('0' + d.getMinutes()).slice(-2);		// Add leading 0.
	var ampm = 'AM';
	var time; 

	if (hh > 12) {
		h = hh - 12;
		ampm = 'PM';
	} else if (hh === 12) {
		h = 12;
		ampm = 'PM';
	} else if (hh == 0) {
		h = 12;
	} 

	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
	return time;
    },this);
 
    this.ost_pom_bzn = ko.dependentObservable(function() {
	if (data.series[0].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[0].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);

    this.ost_pom_NO2 = ko.dependentObservable(function() {
	if (data.series[1].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[1].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);

    this.ost_pom_SO2 = ko.dependentObservable(function() {
	if (data.series[2].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[2].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);

    this.ost_pom_Ozon = ko.dependentObservable(function() {
	if (data.series[3].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[3].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);

   this.ost_pom_PM10 = ko.dependentObservable(function() {
	if (data.series[5].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[5].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);

   this.ost_pom_PM25 = ko.dependentObservable(function() {
	if (data.series[6].data.length - 1 == this.nr_ost_pom()) {
	return Number(data.series[6].data[this.nr_ost_pom()][1]).toFixed(1);
	} else {
	return "...";
	}	
    },this);	

    this.indeks_bzn = ko.dependentObservable(function(){
	var C = [0, 5, 10, 15, 20, 50];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_bzn() == "..." || this.ost_pom_bzn() < 0){
	return "n/a";
	} else {
		if( this.ost_pom_bzn() < C[4])
		{
			for(i=0; i<3; i++){
				if( this.ost_pom_bzn() >= C[i] && this.ost_pom_bzn() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_bzn()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);
				}
			}
		} 
		else 
		{	
		return ((I[5]-I[4])*(this.ost_pom_bzn()-C[4])/(C[5]-C[4])+I[4]).toFixed(1);
		}		
	}
    },this);

    this.indeks_NO2 = ko.dependentObservable(function(){
	var C = [0, 40, 100, 150, 200, 400];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_NO2() == "..." || this.ost_pom_NO2() < 0){
	return "n/a";
	} else {
		if( this.ost_pom_NO2() < C[4])
		{
			for(i=0; i<3; i++){
				if( this.ost_pom_NO2() >= C[i] && this.ost_pom_NO2() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_NO2()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);
				}
			}
		} 
		else 
		{	
		return ((I[5]-I[4])*(this.ost_pom_NO2-C[4])/(C[5]-C[4])+I[4]).toFixed(1);
		}		
	}
    },this);

    this.indeks_SO2 = ko.dependentObservable(function(){
	var C = [0, 50, 100, 200, 350, 500];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_SO2() == "..." || this.ost_pom_SO2() < 0){
	return "n/a";
	}else{
		if( this.ost_pom_SO2() < C[4])
			{for(i=0; i<3; i++){
				if( this.ost_pom_SO2() >= C[i] && this.ost_pom_SO2() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_NO2()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);}}} 
		else {return ((I[5]-I[4])*(this.ost_pom_SO2-C[4])/(C[5]-C[4])+I[4]).toFixed(1);}		
	}
    },this);

    this.indeks_Ozon = ko.dependentObservable(function(){
	var C = [0, 24, 70, 120, 160, 240];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_Ozon() == "..." || this.ost_pom_Ozon() < 0){
	return "n/a";
	}else{
		if( this.ost_pom_Ozon() < C[4])
			{for(i=0; i<3; i++){
				if( this.ost_pom_Ozon() >= C[i] && this.ost_pom_Ozon() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_Ozon()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);}}} 
		else {return ((I[5]-I[4])*(this.ost_pom_Ozon-C[4])/(C[5]-C[4])+I[4]).toFixed(1);}		
	}
    },this);

    this.indeks_PM10 = ko.dependentObservable(function(){
	var C = [0, 20, 60, 100, 140, 200];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_PM10() == "..." || this.ost_pom_PM10() < 0){
	return "n/a";
	}else{
		if( this.ost_pom_PM10() < C[4])
			{for(i=0; i<3; i++){
				if( this.ost_pom_PM10() >= C[i] && this.ost_pom_PM10() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_PM10()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);}}} 
		else {return ((I[5]-I[4])*(this.ost_pom_PM10-C[4])/(C[5]-C[4])+I[4]).toFixed(1);}		
	}
    },this);

   this.indeks_PM25 = ko.dependentObservable(function(){
	var C = [0, 20, 60, 100, 140, 200];
	var I = [0, 1,  3,  5,  7, 10];
	var a = 0;
	if (  this.ost_pom_PM25() == "..." || this.ost_pom_PM25() < 0){
	return "n/a";
	}else{
		if( this.ost_pom_PM25() < C[4])
			{for(i=0; i<3; i++){
				if( this.ost_pom_PM25() >= C[i] && this.ost_pom_PM25() < C[i+1]) {
				return ((I[i+1]-I[i])*(this.ost_pom_PM25()-C[i])/(C[i+1]-C[i])+I[i]).toFixed(1);}}} 
		else {return ((I[5]-I[4])*(this.ost_pom_PM25-C[4])/(C[5]-C[4])+I[4]).toFixed(1);}		
	}
    },this);
   
    this.indeks = ko.dependentObservable(function() {
	var tabela = [0,0,0,0,0,0];
	var i = 0;
	if( this.indeks_bzn() != "n/a")  {tabela[i] = this.indeks_bzn(); i = i+1; }
	if( this.indeks_NO2() != "n/a")  {tabela[i] = this.indeks_NO2(); i = i+1; }		
	if( this.indeks_SO2() != "n/a")  {tabela[i] = this.indeks_SO2(); i = i+1; }
	if( this.indeks_Ozon() != "n/a")  {tabela[i] = this.indeks_Ozon(); i = i+1; }
	if( this.indeks_PM10() != "n/a")  {tabela[i] = this.indeks_PM10(); i = i+1; }
	if( this.indeks_PM25() != "n/a")  {tabela[i] = this.indeks_PM25(); i = i+1; }
	if (i>0) {return Math.max.apply(Math, tabela); }
	else {return "n/a";}
	
	}, this);
   
   this.zalecenia = ko.dependentObservable(function() {
	if (this.indeks() == "n/a") {return " "; }
	else if (this.indeks() <= 1 ) {return "Warunki idealne do aktywnoœci na zewn¹trz";}
	else if (this.indeks() <= 3 ) {return "Warunki bardzo dobre do aktywno\u015bci na zewn\u0105trz. Minimalne zagro\u017cenie dla os\u00f3b nara\u017conych na ryzyko. ";}
	else if (this.indeks() <= 5 ) {return "Warunki dobre do aktywno\u015bci na zewn\u0105trz. Zanieczyszczenie powietrza mo\u017ce stanowi\u0107 zagro\u017cenie dla os\u00f3b nara\u017conych na ryzyko.  ";}
	else if (this.indeks() <= 7 ) {return "Zanieczyszczenie stanowi zagro\u017cenie dla os\u00f3b nara\u017conych na ryzyko. Naleo\u017cy ograniczy\u0107 spêdzanie czasu na zewn\u0105trz.";} 
	else if (this.indeks() <= 10) {return "Osoby nara\u017cone na ryzyko powinny unika\u0107 przebywania na zewn\u0105trz, pozosta\u0142a populacja powinna je ograniczy\u0107. Niezalecane s¹ aktywno\u015bci na zewn\u0105trz. ";}
	else if (this.indeks() > 10)  {return "Nale\u017cy ograniczy\u0107 przebywanie na zewn\u0105trz do minimum. Wszelkie aktywno\u015bci na zewn\u0105trz s\u0105 odradzane.  ";}
   },this);

   this.jakosc_powietrza = ko.dependentObservable(function() {
	if (this.indeks() == "n/a") {return "brak danych ";}
	else if (this.indeks() <=1 ) {return "Bardzo dobry";}
	else if (this.indeks() <=3 ) {return "Dobry";}
	else if (this.indeks() <=5 ) {return "Akceptowalny";}
	else if (this.indeks() <=7 ) {return "\u015aredni" ;}
	else if (this.indeks() <=10) {return "Z\u0142y";}
	else if (this.indeks() >10) {return "Niebezpiecznie z\u0142y";}	
	},this);

   this.kolor_ogolny = ko.dependentObservable(function() {
	if (this.indeks() == "n/a") {return "#B6CBD5";}
	else if (this.indeks() <=1 ) {return "#58B303";}
	else if (this.indeks() <=3 ) {return "#B0DD10";}
	else if (this.indeks() <=5 ) {return "#FCD515";}
	else if (this.indeks() <=7 ) {return "#DF8305" ;}
	else if (this.indeks() <=10) {return "#E40001";}
	else if (this.indeks() >10) {return "#990100";}	
	},this);
 

this.kolor_bzn = ko.dependentObservable(function() {
if (this.indeks_bzn() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_bzn() <=1 ) {return "#58B303";}
	else if (this.indeks_bzn() <=3 ) {return "#B0DD10";}
	else if (this.indeks_bzn() <=5 ) {return "#FCD515";}
	else if (this.indeks_bzn() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_bzn() <=10) {return "#E40001";}
	else if (this.indeks_bzn() >10) {return "#990100";}	
},this);

this.kolor_SO2 = ko.dependentObservable(function() {
if (this.indeks_SO2() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_SO2() <=1 ) {return "#58B303";}
	else if (this.indeks_SO2() <=3 ) {return "#B0DD10";}
	else if (this.indeks_SO2() <=5 ) {return "#FCD515";}
	else if (this.indeks_SO2() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_SO2() <=10) {return "#E40001";}
	else if (this.indeks_SO2() >10) {return "#990100";}	
},this);

this.kolor_NO2 = ko.dependentObservable(function() {
if (this.indeks_NO2() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_NO2() <=1 ) {return "#58B303";}
	else if (this.indeks_NO2() <=3 ) {return "#B0DD10";}
	else if (this.indeks_NO2() <=5 ) {return "#FCD515";}
	else if (this.indeks_NO2() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_NO2() <=10) {return "#E40001";}
	else if (this.indeks_NO2() >10) {return "#990100";}	
},this);

this.kolor_Ozon = ko.dependentObservable(function() {
if (this.indeks_Ozon() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_Ozon() <=1 ) {return "#58B303";}
	else if (this.indeks_Ozon() <=3 ) {return "#B0DD10";}
	else if (this.indeks_Ozon() <=5 ) {return "#FCD515";}
	else if (this.indeks_Ozon() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_Ozon() <=10) {return "#E40001";}
	else if (this.indeks_Ozon() >10) {return "#990100";}	
},this);

this.kolor_PM10 = ko.dependentObservable(function() {
if (this.indeks_PM10() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_PM10() <=1 ) {return "#58B303";}
	else if (this.indeks_PM10() <=3 ) {return "#B0DD10";}
	else if (this.indeks_PM10() <=5 ) {return "#FCD515";}
	else if (this.indeks_PM10() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_PM10() <=10) {return "#E40001";}
	else if (this.indeks_PM10() >10) {return "#990100";}	
},this);

this.kolor_PM25 = ko.dependentObservable(function() {
if (this.indeks_PM25() == "n/a") {return "#B6CBD5";}
	else if (this.indeks_PM25() <=1 ) {return "#58B303";}
	else if (this.indeks_PM25() <=3 ) {return "#B0DD10";}
	else if (this.indeks_PM25() <=5 ) {return "#FCD515";}
	else if (this.indeks_PM25() <=7 ) {return "#DF8305" ;}
	else if (this.indeks_PM25() <=10) {return "#E40001";}
	else if (this.indeks_PM25() >10) {return "#990100";}	
},this);
	
    this.trueData = ko.computed({
        read: function () {
            return ko.utils.arrayFilter(this.meas(), function (item) {
                return item.label === "Benzen" || item.label === "Dwutlenek azotu" || item.label === "Dwutlenek siarki<sup>3)<\/sup>" || item.label === "Ozon" || item.label === "Py\u0142 zawieszony PM10" || item.label === "Py\u0142 zawieszony PM2.5" ;
            });
        },
       owner: this
    });





 
};


$( document ).ready(function() {
    ko.applyBindings(new ViewModel(JSONdata.data));
});