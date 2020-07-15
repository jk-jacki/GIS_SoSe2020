"use strict";
var Endabgabe;
(function (Endabgabe) {
    let requestOrdersButton = document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);
    //Gives Output of current Entries in DB
    async function handleOutput() {
        document.getElementById("requestOrders").style.display = "none";
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        url = url + "/output";
        let response = await fetch(url);
        let responseString = await response.text();
        let divOutput = document.getElementById("output");
        divOutput.innerHTML = responseString;
    }
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=bestellungen.js.map