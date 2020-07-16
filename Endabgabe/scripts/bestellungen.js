"use strict";
var Endabgabe;
(function (Endabgabe) {
    let divOutput = document.getElementById("output");
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
            if (myOrders[index].street == "sent") {
                ausgabeString += "Status: Erfolgreich versandt <br>";
            }
            else {
                ausgabeString += "Straße und Hausnummer: " + myOrders[index].street + "<br>";
            }
            let deleteImage = document.createElement("img");
            deleteImage.setAttribute("src", "../images/Mülleimer.svg");
            deleteImage.setAttribute("alt", "Button zum Löschen");
            deleteImage.setAttribute("orderid", myOrders[index]._id);
            deleteImage.addEventListener("click", deleteOne);
            let packageImage = document.createElement("img");
            packageImage.setAttribute("src", "../images/Paket.svg");
            packageImage.setAttribute("alt", "Paket");
            packageImage.setAttribute("orderid", myOrders[index]._id);
            packageImage.addEventListener("click", editOne);
            outputSpan.innerHTML = ausgabeString;
            orderDiv.appendChild(outputSpan);
            orderDiv.appendChild(deleteImage);
            orderDiv.appendChild(packageImage);
        }
        //Erzeugt div für nachfolgende Button
        let buttonDiv = document.createElement("div");
        buttonDiv.setAttribute("id", "buttonDiv");
        document.getElementById("main").appendChild(buttonDiv);
        //Erzeugt delete-All Button
        let deleteAllButton = document.createElement("button");
        deleteAllButton.setAttribute("class", "bestellungenButton");
        deleteAllButton.setAttribute("id", "deleteAll");
        deleteAllButton.innerHTML = "Alle Bestellungen löschen";
        deleteAllButton.addEventListener("click", deleteAll);
        buttonDiv.appendChild(deleteAllButton);
        //Erzeugt update Button
        let updateButton = document.createElement("button");
        updateButton.setAttribute("class", "bestellungenButton");
        updateButton.innerHTML = "Aktualisieren";
        updateButton.addEventListener("click", update);
        buttonDiv.appendChild(updateButton);
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
    async function deleteOne(_event) {
        let clickedButton = _event.target;
        let orderID = clickedButton.getAttribute("orderid");
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/deleteOne" + "?" + "id=" + orderID;
        await fetch(url);
        update();
    }
    async function deleteAll() {
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/deleteAll";
        await fetch(url);
        while (divOutput.hasChildNodes()) {
            divOutput.removeChild(divOutput.firstChild);
        }
    }
    async function editOne(_event) {
        let clickedButton = _event.target;
        let orderID = clickedButton.getAttribute("orderid");
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/edit" + "?" + "id=" + orderID;
        await fetch(url);
        update();
    }
    function update() {
        while (divOutput.hasChildNodes()) {
            divOutput.removeChild(divOutput.firstChild);
        }
        if (document.getElementById("buttonDiv") != null) {
            document.getElementById("main")?.removeChild(document.getElementById("buttonDiv"));
        }
        handleOutput();
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bestellungen.js.map