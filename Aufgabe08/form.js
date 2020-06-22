"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A08Server = void 0;
const Http = require("http");
var A08Server;
(function (A08Server) {
    console.log("Starting server");
    //Port nummer speichern
    let port = Number(process.env.PORT);
    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;
    //Instanz des Servers wird erstellt 
    let server = Http.createServer();
    server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Server ausgeführt
    server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt
    server.listen(port); //Server horcht nach Anfragen auf dem Port
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        _response.write(_request.url); //gibt den Query Teil der URL als Text aus
        _response.end();
    }
})(A08Server = exports.A08Server || (exports.A08Server = {}));
//# sourceMappingURL=form.js.map