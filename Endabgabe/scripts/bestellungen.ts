namespace Endabgabe {
    let requestOrdersButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);

    //Gives Output of current Entries in DB
    async function handleOutput(): Promise<void> {
        
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/output"; 

        let response: Response = await fetch(url);
        let responseString: string = await response.text();

        document.getElementById("requestOrders")!.style.display = "none";

        let divOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("output");
        divOutput.innerHTML = responseString;

    } 
}