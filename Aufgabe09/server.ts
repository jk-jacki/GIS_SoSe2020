import * as Http from "http";
import * as Url from "url";
//import { ParsedUrlQuery } from "querystring";

export namespace A09Server {
    console.log("Starting server");

    //Port nummer speichern
    let port: number = Number(process.env.PORT);

    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;

    //Instanz des Servers wird erstellt 
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Port ausgeführt

    server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt

    server.listen(port); //Server horcht nach Anfragen auf dem Port


    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");

        if (_request.url) {
            let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);

            if (url.pathname == "/html") {
                for (let key in url.query) {
                    _response.write(key + ":" + url.query[key] + "<br>");
                    
                }
            }
            if (url.pathname == "/json") {
                let jsonString: string = JSON.stringify(url.query);
                _response.write(jsonString);
            }
            
        }

        _response.end();
        
    }
}