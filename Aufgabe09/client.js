"use strict";
var A09Client;
(function (A09Client) {
    let submitButton = document.getElementById("htmlButton");
    submitButton.addEventListener("click", communicate);
    let jsonButton = document.getElementById("jsonButton");
    jsonButton.addEventListener("click", handleJSON);
    async function communicate() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "/html" + "?" + query.toString();
        let response = await fetch(url);
        let reply = await response.text();
        let paragraph = document.createElement("p");
        paragraph.innerHTML = reply;
        document.body.appendChild(paragraph);
    }
    async function handleJSON() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query = new URLSearchParams(formData);
        url = url + "/json" + "?" + query.toString();
        let response = await fetch(url);
        let reply = await response.json();
        console.log(reply);
    }
})(A09Client || (A09Client = {}));
//# sourceMappingURL=client.js.map