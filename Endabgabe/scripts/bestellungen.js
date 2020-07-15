"use strict";
var Endabgabe;
(function (Endabgabe) {
    let requestOrdersButton = document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);
    //Gives Output of current Entries in DB
    async function handleOutput() {
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/output";
        let response = await fetch(url);
        let responseString = await response.text(); //JSON String 
        document.getElementById("requestOrders").style.display = "none";
        let myOrders = JSON.parse(responseString);
        console.log(myOrders);
        let divOutput = document.getElementById("output");
        for (let index = 0; index < myOrders.length; index++) {
            let outputSpan = document.createElement("span");
            let ausgabeString = "";
            //Behälterausgabe
            ausgabeString += "Behälter: " + myOrders[index].Behälter + "<br>";
            //Eissortenausgabe
            ausgabeString += "Kugel 1: " + getEisSorten(myOrders[index].Kugel1) + "<br>";
            if (myOrders[index].Kugel2 != "-1") {
                ausgabeString += "Kugel 2: " + getEisSorten(myOrders[index].Kugel2) + "<br>";
            }
            if (myOrders[index].Kugel3 != "-1") {
                ausgabeString += "Kugel 3: " + getEisSorten(myOrders[index].Kugel3) + "<br>";
            }
            if (myOrders[index].Kugel4 != "-1") {
                ausgabeString += "Kugel 4: " + getEisSorten(myOrders[index].Kugel4) + "<br>";
            }
            //Soßenausgabe
            if (myOrders[index].Soße != "-1") {
                ausgabeString += "Soße: " + getSoßenSorte(myOrders[index].Soße) + "<br>";
            }
            //Extraausgabe
            if (myOrders[index].Extra != "-1") {
                ausgabeString += "Extra: " + getExtra(myOrders[index].Extra) + "<br>";
            }
            outputSpan.innerHTML = ausgabeString;
            divOutput.appendChild(outputSpan);
        }
    }
    function getEisSorten(_indexNummer) {
        for (let j = 0; j < Endabgabe.eisSortiment.length; j++) {
            if (_indexNummer == Endabgabe.eisSortiment[j].index) {
                return Endabgabe.eisSortiment[j].alt;
            }
        }
        return "";
    }
    function getSoßenSorte(_indexNummer) {
        for (let j = 0; j < Endabgabe.soßenSortiment.length; j++) {
            if (_indexNummer == Endabgabe.soßenSortiment[j].index) {
                return Endabgabe.soßenSortiment[j].alt;
            }
        }
        return "";
    }
    function getExtra(_indexNummer) {
        for (let j = 0; j < Endabgabe.extrasSortiment.length; j++) {
            if (_indexNummer == Endabgabe.extrasSortiment[j].index) {
                return Endabgabe.extrasSortiment[j].alt;
            }
        }
        return "";
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bestellungen.js.map