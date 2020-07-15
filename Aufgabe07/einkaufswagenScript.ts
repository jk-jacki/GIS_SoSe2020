namespace Aufgabe07 {
    const preisAusgabeSection: HTMLElement = <HTMLElement>document.getElementById("preisAusgabe");
    const warenkorbArtikelSection: HTMLElement = <HTMLElement>document.getElementById("warenkorbArtikel");

    let showAllMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", handleShowAllMenu);

    let warenkorbZaehler: number = parseFloat(localStorage.getItem("warenkorbZahl")!);
    let cartZaehler: HTMLSpanElement = document.createElement("span");

    //bei Seitenaufruf
    getArtikel("artikel.json");
    createCart();
    
    function createCart(): void {

        //GesamtpreisSection
        if (localStorage.getItem("gesamtPreis")) {
            let gesamtPreis: string = <string>localStorage.getItem("gesamtPreis");
            let divPreis: HTMLDivElement = document.createElement("div");
            divPreis.setAttribute("id", "preisCartDiv");
            preisAusgabeSection.appendChild(divPreis);

            let pPreisAusgabe: HTMLParagraphElement = document.createElement("p");
            pPreisAusgabe.innerHTML = "Warenkorbpreis: " + gesamtPreis + "€";
            divPreis.appendChild(pPreisAusgabe);
    
            let deleteButton: HTMLButtonElement = document.createElement("button");
            deleteButton.setAttribute("id", "deleteCartButton");
            deleteButton.addEventListener("click", deleteCart);
            divPreis.appendChild(deleteButton).innerHTML = "Lösche Einkaufswagen";
    
        }
        
        cartZaehler.setAttribute("id", "zaehler");
        if (warenkorbZaehler > 0) {
            cartZaehler.innerHTML = warenkorbZaehler.toString();
            document.getElementById("cart")?.appendChild(cartZaehler);
        }
    }

    function deleteCart(): void {
        while (warenkorbArtikelSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            warenkorbArtikelSection.removeChild(<Node>warenkorbArtikelSection.firstChild);
        }
        while (preisAusgabeSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            preisAusgabeSection.removeChild(<Node>preisAusgabeSection.firstChild);
        }
        cartZaehler.remove();
        localStorage.clear();
    }

    function createCartArticles(): void {
        
        for (let i: number = 0; i < sortiment.length; i++) {       
                        
            if (localStorage.getItem(i.toString())) {
                let div: HTMLDivElement = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                warenkorbArtikelSection.appendChild(div);

                let h3: HTMLHeadingElement = document.createElement("h3");
                div.appendChild(h3).innerHTML = sortiment[i].name;

                let img: HTMLImageElement = document.createElement("img");
                img.setAttribute("src", sortiment[i].image);
                img.setAttribute("alt", sortiment[i].name);
                div.appendChild(img);
                
                let addOrRemove: HTMLDivElement = document.createElement("div");
                addOrRemove.setAttribute("id", "addOrRemoveDiv");
                div.appendChild(addOrRemove);

                let removeOne: HTMLButtonElement = document.createElement("button");
                removeOne.setAttribute("class", "addOrRemove");
                removeOne.setAttribute("sortimentStelle", i.toString());
                removeOne.addEventListener("click", handleRemoveOne);
                addOrRemove.appendChild(removeOne).innerHTML = "-";

                let addOne: HTMLButtonElement = document.createElement("button");
                addOne.setAttribute("class", "addOrRemove");
                addOne.setAttribute("sortimentStelle", i.toString());
                addOne.addEventListener("click", handleAddOne);
                addOrRemove.appendChild(addOne).innerHTML = "+";

                let pAmount: HTMLParagraphElement = document.createElement("p");
                pAmount.setAttribute("class", "amount");
                pAmount.setAttribute("id", i.toString() + "amount");
                div.appendChild(pAmount).innerHTML = "Anzahl Ihrer Produkte: " + <string>localStorage.getItem(i.toString());

                let pPrice: HTMLParagraphElement = document.createElement("p");
                pPrice.setAttribute("class", "price");
                pPrice.setAttribute("id", i.toString() + "price");
                div.appendChild(pPrice).innerHTML = "Gesamtpreis: " + sortiment[i].preis *  parseFloat(<string>localStorage.getItem(i.toString())) + " €";

                let button: HTMLButtonElement = document.createElement("button");
                button.setAttribute("sortimentStelle", i.toString());
                button.addEventListener("click", handleLoeschen);
                div.appendChild(button).innerHTML = "Löschen";
            }
            
        }
    }

    function handleLoeschen(_event: Event): void {
        //Ermitteln des gewählten Artikels
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let artikelIndex: number = parseFloat(<string>clickedButton.getAttribute("sortimentStelle"));
        let anzahlGeloeschterElemente: number = parseFloat(<string>localStorage.getItem((artikelIndex.toString())));

        //Zähler runtersetzen
        warenkorbZaehler -= anzahlGeloeschterElemente;
        localStorage.setItem("warenkorbZahl", warenkorbZaehler.toString());

        //Neuen Gesamtpreis berechnen
        let alterGesamtPreis: number = parseFloat(<string>localStorage.getItem("gesamtPreis"));
        let preisDifferenz: number = sortiment[artikelIndex].preis *  parseFloat(<string>localStorage.getItem(artikelIndex.toString()));
        let neuerGesamtPreis: number = alterGesamtPreis - preisDifferenz;
        localStorage.setItem("gesamtPreis", neuerGesamtPreis.toString());

        //HTML Artikel löschen
        while (warenkorbArtikelSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            warenkorbArtikelSection.removeChild(<Node>warenkorbArtikelSection.firstChild);
        }
        while (preisAusgabeSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            preisAusgabeSection.removeChild(<Node>preisAusgabeSection.firstChild);
        }

        localStorage.removeItem(artikelIndex.toString());
        createCartArticles();
        createCart();
    }

    function handleAddOne(_event: Event): void {
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let artikelIndex: string = <string>clickedButton.getAttribute("sortimentStelle");

        //Anzahl berechnen
        let aktuelleAnzahl: number = parseFloat(<string>localStorage.getItem(artikelIndex));
        aktuelleAnzahl++;
        localStorage.setItem(artikelIndex, aktuelleAnzahl.toString());

        //Einkaufswagen neu laden
        let amount: HTMLElement = <HTMLElement>document.getElementById(artikelIndex + "amount");
        amount.innerHTML = "Anzahl Ihrer Produkte: " + <string>localStorage.getItem(aktuelleAnzahl.toString());

        let price: HTMLElement = <HTMLElement>document.getElementById(artikelIndex.toString() + "price");
        price.innerHTML = "Gesamtpreis: " + sortiment[parseFloat(artikelIndex)].preis *  parseFloat(<string>localStorage.getItem(artikelIndex)) + " €";

    }

    function handleRemoveOne(_event: Event): void {
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let artikelIndex: string = <string>clickedButton.getAttribute("sortimentStelle");
        let aktuelleAnzahl: number = parseFloat(<string>localStorage.getItem(artikelIndex));
        if (aktuelleAnzahl == 1) {
            handleLoeschen(_event);
        }
        else {
            aktuelleAnzahl--;
            localStorage.setItem(artikelIndex, aktuelleAnzahl.toString());
        }
    }

    async function getArtikel(_url: RequestInfo): Promise<void> {
        let artikelEmpfangen: Response = await fetch(_url);
        sortiment = await artikelEmpfangen.json();
        createCartArticles();
    }
}