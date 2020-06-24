"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.A09Server = void 0;
const Http = require("http");
const Url = require("url");
//import { ParsedUrlQuery } from "querystring";
var A09Server;
(function (A09Server) {
    console.log("Starting server");
    //Port nummer speichern
    let port = Number(process.env.PORT);
    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;
    //Instanz des Servers wird erstellt 
    let server = Http.createServer();
    server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Port ausgeführt
    server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt
    server.listen(port); //Server horcht nach Anfragen auf dem Port
    function handleListen() {
        console.log("Listening");
    }
    function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key] + "<br>");
                }
            }
            if (url.pathname == "/json") {
                let jsonString = JSON.stringify(url.query);
                _response.write(jsonString);
            }
        }
        _response.end();
    }
})(A09Server = exports.A09Server || (exports.A09Server = {}));
//# sourceMappingURL=server.js.map