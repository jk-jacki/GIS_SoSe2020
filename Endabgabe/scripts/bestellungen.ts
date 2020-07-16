namespace Endabgabe {
    let divOutput: HTMLDivElement = <HTMLDivElement>document.getElementById("output");

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

            ausgabeString += "Vorname: " + myOrders[index].firstname + "<br>";
            ausgabeString += "Nachname: " + myOrders[index].lastname + "<br>";
            ausgabeString += "Straße und Hausnummer: " + myOrders[index].street + "<br>";


            let deleteImage: HTMLImageElement = document.createElement("img");
            deleteImage.setAttribute("src", "../images/Mülleimer.svg");
            deleteImage.setAttribute("alt", "Button zum Löschen");
            deleteImage.setAttribute("orderid", myOrders[index]._id);
            deleteImage.addEventListener("click", deleteOne);
            
            outputSpan.innerHTML = ausgabeString;
            orderDiv.appendChild(outputSpan);
            orderDiv.appendChild(deleteImage);
        }

        let deleteAllButton: HTMLButtonElement = document.createElement("button");
        deleteAllButton.setAttribute("class", "bestellungenButton");
        deleteAllButton.innerHTML = "Alle Bestellungen löschen";
        deleteAllButton.addEventListener("click", deleteAll);
        divOutput.appendChild(deleteAllButton);
        
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

    
    async function deleteOne(_event: Event): Promise<void> {
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let orderID: string = <string>clickedButton.getAttribute("orderid");

        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/deleteOne" + "?" + "id=" + orderID; 

        console.log(url);

        await fetch(url);


        while (divOutput.hasChildNodes()) { 
            divOutput.removeChild(<Node>divOutput.firstChild);
        }

        handleOutput();
    }

    async function deleteAll(): Promise<void> {
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        url += "/deleteAll" ; 

        await fetch(url);


        while (divOutput.hasChildNodes()) { 
            divOutput.removeChild(<Node>divOutput.firstChild);
        }
    }
    
}