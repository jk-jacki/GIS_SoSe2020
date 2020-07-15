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
            //HTML Gerüst der Bestellung aufbauen
            let orderDiv = document.createElement("div");
            orderDiv.setAttribute("class", "orderSpan");
            divOutput.appendChild(orderDiv);
            let orderHeading = document.createElement("h3");
            let orderIndex = index + 1;
            orderHeading.innerHTML = "Bestellung " + orderIndex;
            orderDiv.appendChild(orderHeading);
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
            ausgabeString += "Vorname: " + myOrders[index].firstname + "<br>";
            ausgabeString += "Nachname: " + myOrders[index].lastname + "<br>";
            ausgabeString += "Straße und Hausnummer: " + myOrders[index].street;
            let deleteImage = document.createElement("img");
            deleteImage.setAttribute("src", "../images/Mülleimer.svg");
            deleteImage.setAttribute("alt", "Button zum Löschen");
            deleteImage.setAttribute("orderID", myOrders[index]._id);
            //deleteImage.addEventListener("click", deleteOne);
            outputSpan.innerHTML = ausgabeString;
            orderDiv.appendChild(outputSpan);
            orderDiv.appendChild(deleteImage);
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
    /*
    function deleteOne(_event: Event): void {
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let orderID: string = <string>clickedButton.getAttribute("orderID");

        db.test_users.deleteOne( {"_id": ObjectId("4d512b45cc9374271b02ec4f")});


    }
    */
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bestellungen.js.map