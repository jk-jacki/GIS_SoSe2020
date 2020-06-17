"use strict";
var A08Client;
(function (A08Client) {
    let submitButton = document.querySelector("#submitButton");
    submitButton.addEventListener("click", communicate);
    async function communicate() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url += url + "?" + query.toString();
        await fetch(url);
        console.log(url);
    }
})(A08Client || (A08Client = {}));
//# sourceMappingURL=form2.js.map