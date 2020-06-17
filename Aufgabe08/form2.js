"use strict";
var A08Client;
(function (A08Client) {
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", communicate);
    async function communicate() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url += url + "?" + query.toString();
        let response = await fetch(url);
        let reply = await response.url;
        console.log(reply);
        for (let entry of query) {
            console.log(entry);
            console.log("name: " + entry[0]);
            console.log("value: " + entry[1]);
        }
    }
})(A08Client || (A08Client = {}));
//# sourceMappingURL=form2.js.map