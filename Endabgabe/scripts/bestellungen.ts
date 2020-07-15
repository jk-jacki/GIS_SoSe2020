namespace Endabgabe {


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

        for (let index: number = 0; index < myOrders.length; index++) {
            //HTML Gerüst der Bestellung aufbauen
            let orderDiv: HTMLDivElement = document.createElement("div");
            orderDiv.setAttribute("class", "orderSpan");
            divOutput.appendChild(orderDiv);

            let orderHeading: HTMLHeadingElement = document.createElement("h3");
            let orderIndex: number = index + 1;
            orderHeading.innerHTML = "Bestellung " + orderIndex;
            orderDiv.appendChild(orderHeading);

            let outputSpan: HTMLSpanElement = document.createElement("span");
            let ausgabeString: string = "";

            //Behälterausgabe
            ausgabeString += "Behälter: " + myOrders[index].Behälter + "<br>";

            //Eissortenausgabe
            ausgabeString += "Kugel 1: " + getEisSorten(myOrders[index].Kugel1) + "<br>";            

            if (myOrders[index].Kugel2 != "-1") {
                ausgabeString += "Kugel 2: " + getEisSorten(myOrders[index].Kugel2) + "<br>";
            }
            if (myOrders[index].Kugel3 != "-1") {
                ausgabeString += "Kugel 3: " + getEisSorten(myOrders[index].Kugel3) + "<br>";
            }
            if (myOrders[index].Kugel4 != "-1") {
                ausgabeString += "Kugel 4: " + getEisSorten(myOrders[index].Kugel4) + "<br>";
            }

            //Soßenausgabe
            if (myOrders[index].Soße != "-1") {
                ausgabeString += "Soße: " + getSoßenSorte(myOrders[index].Soße) + "<br>";
            }

            //Extraausgabe
            if (myOrders[index].Extra != "-1") {
                ausgabeString += "Extra: " + getExtra(myOrders[index].Extra) + "<br>";
            }
            
            outputSpan.innerHTML = ausgabeString;
            orderDiv.appendChild(outputSpan);
        }
        
    } 

    function getEisSorten(_indexNummer: string): string {

        for (let j: number = 0; j < eisSortiment.length; j++) {
            if (_indexNummer == eisSortiment[j].index) {
                return eisSortiment[j].alt;
            }
        }
        return "";
    }

    function getSoßenSorte(_indexNummer: string): string {

        for (let j: number = 0; j < soßenSortiment.length; j++) {
            if (_indexNummer == soßenSortiment[j].index) {
                return soßenSortiment[j].alt;
            }
        }
        return "";
    }

    function getExtra(_indexNummer: string): string {

        for (let j: number = 0; j < extrasSortiment.length; j++) {
            if (_indexNummer == extrasSortiment[j].index) {
                return extrasSortiment[j].alt;
            }
        }
        return "";
    }
}