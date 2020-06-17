import * as Http from "http";

export namespace A08Server {
    console.log("Starting server");
    let port: number = Number(process.env.PORT);

    //Wenn noch kein Port besteht wird ein neuer erstellt 
    if (!port)
        port = 8100;

    //Instanz des Servers wird erstellt 
    let server: Http.Server = Http.createServer();
    server.addListener("request", handleRequest);
    server.addListener("listening", handleListen);
    server.listen(port);


    function handleListen(): void {
        console.log("Listening");
    }

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
        console.log("I hear voices!");

        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");

        _response.write(_request.url);

        _response.end();

    }
}