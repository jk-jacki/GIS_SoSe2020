namespace Endabgabe {
    
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("bestellButton");
    submitButton.addEventListener("click", handleInsert);

    let requestOrdersButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("requestOrders");
    requestOrdersButton.addEventListener("click", handleOutput);

    


    //Inserts Entry in DB
    async function handleInsert(): Promise<void> {

        //Local Storage auslesen
        let localStorageData: string = "";
        for (let index: number = 0; index < localStorage.length; index++) {
            let localKey: string = <string>localStorage.key(index);                         //holt sich jeweils den key aus dem LS
            let localValue: string = <string>localStorage.getItem(localKey);                //holt sich jeweils den value aus dem LS

            localStorageData += localKey + "=" + localValue + "&";                          //speichert Eintrag im String, damit dieser in die url übernommen werden kann
        }
        
        console.log(localStorageData);
        
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        
        console.log(query.toString());

        url += "/insert" + "?" + localStorageData + query.toString(); 

        console.log(url);
        
        await fetch(url); 

        //reset des Formulars
        let form: HTMLFormElement = <HTMLFormElement>document.getElementById("bestellFormular");
        form.reset();

        //Nutzer wird zurück zur ersten Seite geschickt
        deleteOrder();

    }
    
    
    //Gives Output of current Entries in DB
    async function handleOutput(): Promise<void> {
        document.getElementById("requestOrders")!.style.display = "none";

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/output" + "?" + query.toString();

        let response: Response = await fetch(url);
        let responseString: string = await response.text();

        let divOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("output");
        divOutput.innerHTML = responseString;

    } 
    
}