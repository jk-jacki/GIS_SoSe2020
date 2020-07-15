namespace Endabgabe {
    let requestOrdersButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);

    //Gives Output of current Entries in DB
    async function handleOutput(): Promise<void> {
        document.getElementById("requestOrders")!.style.display = "none";

        //let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        //let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/output"; //+ "?" + query.toString();

        let response: Response = await fetch(url);
        let responseString: string = await response.text();

        let divOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("output");
        divOutput.innerHTML = responseString;

    } 
}