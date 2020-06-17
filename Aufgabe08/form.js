"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    let port = Number(process.env.PORT);
    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;
    //Instanz des Servers wird erstellt 
    let server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        let formData = new FormData(document.forms[0]);
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url);
        _response.end();
        for (let entry of formData) {
            console.log(entry);
            console.log("name" + entry[0]);
            console.log("name" + entry[1]);
        }
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=form.js.map