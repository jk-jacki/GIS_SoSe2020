"use strict";
var A08Server;
(function (A08Server) {
    let submitButton = document.getElementById("submitButton");
    submitButton.addEventListener("click", communicate);
    async function communicate() {
        let formData = new FormData(document.forms[0]);
        let url = "https://gissose2020jacquelinekoch.herokuapp.com/";
        let query = new URLSearchParams(formData);
        url += url + "?" + query.toString();
        await fetch(url);
        console.log(url);
    }
})(A08Server || (A08Server = {}));
//# sourceMappingURL=form2.js.map