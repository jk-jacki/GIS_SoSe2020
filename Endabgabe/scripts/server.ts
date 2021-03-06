import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
import { ParsedUrlQuery } from "querystring";

export namespace Endabgabe {


    let orders: Mongo.Collection;

    //Port nummer speichern
    let port: number = Number(process.env.PORT);

    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;

    let databaseUrl: string = "mongodb+srv://cooler_user:1234@jacqueline-koch.jbndt.mongodb.net/Test?retryWrites=true&w=majority"; //"mongodb://localhost:27017";



    startServer(port);
    connectToDatabase(databaseUrl);

    function startServer(_port: number | string): void {
        console.log("Starting server");

        //Instanz des Servers wird erstellt 
        let server: Http.Server = Http.createServer();
        server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Port ausgeführt

        server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt

        server.listen(_port); //Server horcht nach Anfragen auf dem Port

    }

    async function connectToDatabase(_url: string): Promise<void> {
        let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);

        await mongoClient.connect();

        orders = mongoClient.db("Eisshop").collection("Orders");
        console.log("Database connection", orders != undefined);
    }


    function handleListen(): void {
        console.log("Listening");
    }

    async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            if (url.pathname == "/insert") {

                orders.insertOne(url.query);    //Speichert den Eintrag als Document in der DB

            }

            if (url.pathname == "/output") {
                let dbInhalt: Mongo.Cursor<string> = orders.find(); //liest die Dokumente der Datenbank aus
                let dbInhaltArray: string[] = await dbInhalt.toArray();
                let jsonString: string = JSON.stringify(dbInhaltArray);
                _response.write(jsonString);

            }

            if (url.pathname == "/deleteOne") {

                let objectID: Mongo.ObjectID = getID();

                let jsonString: string = JSON.stringify(await orders.deleteOne({ "_id": objectID }));

                _response.write(jsonString);

            }

            if (url.pathname == "/deleteAll") {

                orders.drop();

            }

            if (url.pathname == "/edit") {

                let objectID: Mongo.ObjectID = getID();

                //https://www.guru99.com/mongodb-update-document.html
                orders.update
                    (
                        {
                            "_id": objectID    //wählt das Document in der DB aus, welches verändert werden soll
                        },
                        {
                            $set:
                            {
                                "street": "sent"   //verändert den Wert von street
                            }
                        }
                    );
            }

            function getID(): Mongo.ObjectID {
                //https://github.com/Plagiatus/GIS_SoSe2020/blob/master/Aufgabe11/Server/database.ts#L29
                let query: ParsedUrlQuery = url.query;
                let id: string = <string>query["id"];   //wählt den richtigen Teil der query aus
                console.log(id);

                let objectID: Mongo.ObjectID = new Mongo.ObjectID(id);
                return objectID;
            }

        }

        _response.end();

    }


}