"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Endabgabe = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Endabgabe;
(function (Endabgabe) {
    let orders;
    //Port nummer speichern
    let port = Number(process.env.PORT);
    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;
    let databaseUrl = "mongodb+srv://cooler_user:1234@jacqueline-koch.jbndt.mongodb.net/Test?retryWrites=true&w=majority"; //"mongodb://localhost:27017";
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        console.log("Starting server");
        //Instanz des Servers wird erstellt 
        let server = Http.createServer();
        server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Port ausgeführt
        server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt
        server.listen(_port); //Server horcht nach Anfragen auf dem Port
    }
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Eisshop").collection("Orders");
        console.log("Database connection", orders != undefined);
    }
    function handleListen() {
        console.log("Listening");
    }
    async function handleRequest(_request, _response) {
        console.log("I hear voices!");
        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            if (url.pathname == "/insert") {
                orders.insertOne(url.query); //Speichert den Eintrag als Document in der DB
            }
            if (url.pathname == "/output") {
                let dbInhalt = orders.find(); //liest die Dokumente der Datenbank aus
                let dbInhaltArray = await dbInhalt.toArray();
                let jsonString = JSON.stringify(dbInhaltArray);
                _response.write(jsonString);
            }
            if (url.pathname == "/deleteOne") {
                let objectID = getID();
                let jsonString = JSON.stringify(await orders.deleteOne({ "_id": objectID }));
                _response.write(jsonString);
            }
            if (url.pathname == "/deleteAll") {
                orders.drop();
            }
            if (url.pathname == "/edit") {
                let objectID = getID();
                //https://www.guru99.com/mongodb-update-document.html
                orders.update({
                    "_id": objectID //wählt das Document in der DB aus, welches verändert werden soll
                }, {
                    $set: {
                        "street": "sent" //verändert den Wert von street
                    }
                });
            }
            function getID() {
                //https://github.com/Plagiatus/GIS_SoSe2020/blob/master/Aufgabe11/Server/database.ts#L29
                let query = url.query;
                let id = query["id"]; //wählt den richtigen Teil der query aus
                console.log(id);
                let objectID = new Mongo.ObjectID(id);
                return objectID;
            }
        }
        _response.end();
    }
})(Endabgabe = exports.Endabgabe || (exports.Endabgabe = {}));
//# sourceMappingURL=server.js.map