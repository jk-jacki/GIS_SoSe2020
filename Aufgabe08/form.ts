import * as Http from "http";

export namespace A08Server {
    console.log("Starting server");

    //Port nummer speichern
    let port: number = Number(process.env.PORT);

    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;

    //Instanz des Servers wird erstellt 
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest); //wird bei neuer Anfrage auf dem Server ausgeführt

    server.addListener("listening", handleListen); //wird bei Neustart des Servers ausgeführt

    server.listen(port); //Server horcht nach Anfragen auf dem Port


    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8"); //Erstellt das HTML Dokument
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write(_request.url); //gibt den Query Teil der URL als Text aus

        _response.end();

    }
}