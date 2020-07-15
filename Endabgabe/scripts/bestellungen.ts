namespace Endabgabe {

    interface Order {

        _id: string;
        Behälter: string;
        Kugel1: string;
        Kugel2: string;
        Kugel3: string;
        Kugel4: string;
        Soße: string;
        Extra: string;
        lastname: string;
        firstname: string;
        street: string;

    }

    let requestOrdersButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);

    //Gives Output of current Entries in DB
    async function handleOutput(): Promise<void> {
        
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/output"; 

        let response: Response = await fetch(url);
        let responseString: string = await response.text(); //JSON String 

        document.getElementById("requestOrders")!.style.display = "none";

        let myOrders: Order[] = JSON.parse(responseString);

        console.log(myOrders);

        
        let divOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("output");
        divOutput.innerHTML = responseString;
        
    } 
}