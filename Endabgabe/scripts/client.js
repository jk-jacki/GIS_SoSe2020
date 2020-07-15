"use strict";
var Endabgabe;
(function (Endabgabe) {
    let submitButton = document.getElementById("bestellButton");
    submitButton.addEventListener("click", handleInsert);
    let requestOrdersButton = document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);
    //Inserts Entry in DB
    async function handleInsert() {
        //Local Storage auslesen
        let localStorageData = "";
        for (let index = 0; index < localStorage.length; index++) {
            let localKey = localStorage.key(index); //holt sich jeweils den key aus dem LS
            let localValue = localStorage.getItem(localKey); //holt sich jeweils den value aus dem LS
            localStorageData += localKey + "=" + localValue + "&"; //speichert Eintrag im String, damit dieser in die url übernommen werden kann
        }
        console.log(localStorageData);
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query = new URLSearchParams(formData);
        console.log(query.toString());
        url += "/insert" + "?" + localStorageData + query.toString();
        console.log(url);
        await fetch(url);
        //reset des Formulars
        let form = document.getElementById("bestellFormular");
        form.reset();
        //Nutzer wird zurück zur ersten Seite geschickt
        Endabgabe.deleteOrder();
    }
    //Gives Output of current Entries in DB
    async function handleOutput() {
        document.getElementById("requestOrders").style.display = "none";
        //let formData: FormData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        //let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/output"; //+ "?" + query.toString();
        let response = await fetch(url);
        let responseString = await response.text();
        let divOutput = document.getElementById("output");
        divOutput.innerHTML = responseString;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=client.js.map