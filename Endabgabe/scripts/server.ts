import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";
//import { ParsedUrlQuery } from "querystring";

export namespace Endabgabe {
    interface Order {
        [type: string]: string | string[] | undefined;
    }


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
        let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
        let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);

        await mongoClient.connect();

        orders = mongoClient.db("Eisshop").collection("Orders");
        console.log("Database connection", orders != undefined);
    }
    

    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            if (url.pathname == "/insert") {

                orders.insertOne(url.query);

            }
            /*
            if (url.pathname == "/pull") {
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);

                storeOrder(url.query);
            } */

            if (url.pathname == "/insert") {

            }
            
            if (url.pathname == "/output") {

            }

            let jsonString: string = JSON.stringify(url.query);
            _response.write(jsonString);

            storeOrder(url.query);
            
        }

        _response.end();
        
    }

    function storeOrder(_order: Order): void {
        orders.insert(_order);
    }
}