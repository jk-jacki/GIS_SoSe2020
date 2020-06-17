import * as Http from "http";
//import * as Url from "url";


export namespace A08Server {
  console.log("Starting server");
  //let formData: FormData = new FormData(document.forms[0]);

  let port: number = Number(process.env.PORT);
  if (!port)
    port = 8100;

  let server: Http.Server = Http.createServer();
  server.addListener("request", handleRequest);
  server.addListener("listening", handleListen);
  server.listen(port);

  function handleListen(): void {
    console.log("Listening");
  }

  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    console.log("I hear voices!");

    /* let url: string = "https://gissose2020jacquelinekoch.herokuapp.com/";
    let query: URLSearchParams = new URLSearchParams(<any>formData);
    url += url + "?" + query.toString();
    await fetch(url); */

    //console.log(url);

    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    _response.write(_request.url);
    console.log(_request.url);

    _response.end();
  }
}