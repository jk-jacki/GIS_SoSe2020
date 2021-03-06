namespace Aufgabe07 {

    //Kategorien-Sections
    const newTag: HTMLElement = document.getElementById("new") as HTMLDivElement;
    const bestsellerTag: HTMLElement = document.getElementById("bestseller") as HTMLDivElement;
    const oldTag: HTMLElement = document.getElementById("old") as HTMLDivElement;

    //Warenkorb
    let artikelAnzahl: number = 0;

    let warenkorbZahl: number = 0;
    if (localStorage.getItem("warenkorbZahl") != null) {
        warenkorbZahl = parseFloat(localStorage.getItem("warenkorbZahl")!);
    }
    let warenkorbPreis: number = 0;
    if (localStorage.getItem("gesamtPreis") != null) {
        warenkorbPreis = parseFloat(localStorage.getItem("gesamtPreis")!);
    }

    let zaehler: HTMLSpanElement = document.createElement("span");
    zaehler.setAttribute("id", "zaehler");


    //bei Seitenaufruf
    getArtikel("artikel.json");
    

    //Menübuttons zum Seitenaufbau
    let newMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("newMenu");
    newMenu.addEventListener("click", handleNewMenu);

    let bestsellerMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("bestsellerMenu");
    bestsellerMenu.addEventListener("click", handleBestsellerMenu);

    let oldMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("oldMenu");
    oldMenu.addEventListener("click", handleOldMenu);

    let showAllMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", handleShowAllMenu);

    //DOM-Aufbau
    export function createTags(): void {
        kategorieElements(1);
        kategorieElements(2);
        kategorieElements(3);
    }

    function handleKaufenClick(_event: Event): void {
        //Zähler über Carticon
        warenkorbZahl++;
        if (warenkorbZahl > 0) {
            zaehler.innerHTML = warenkorbZahl.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }
        localStorage.setItem("warenkorbZahl", warenkorbZahl.toString());

        //Gesamtpreis
        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let artikelIndex: number = parseFloat(<string>clickedButton.getAttribute("sortimentStelle"));
        warenkorbPreis += sortiment[artikelIndex].preis;
        localStorage.setItem("gesamtPreis", warenkorbPreis.toString());
        
        //ArtikelItems
        
        if (localStorage.getItem(artikelIndex.toString())) {
            let aktuelleAnzahl: number = parseFloat(<string>localStorage.getItem(artikelIndex.toString())); //artikelAnzahl++;
            artikelAnzahl = aktuelleAnzahl + 1;
        }
        else {
            artikelAnzahl = 1;
        }
        
        localStorage.setItem(artikelIndex.toString(), artikelAnzahl.toString());


    }

    //Kategorien zum Anzeigen wählen
    export function handleNewMenu(_event: Event): void {
        deleteTags();
        kategorieElements(1);
    }

    export function handleBestsellerMenu(_event: Event): void {
        deleteTags();
        kategorieElements(2);
    }

    export function handleOldMenu(_event: Event): void {
        deleteTags();
        kategorieElements(3);
    }

    export function handleShowAllMenu(): void {
        deleteTags();
        createTags();
    }

    //Altes Sortiment löschen
    export function deleteTags(): void {
        let alteSections: HTMLElement[] = [newTag, bestsellerTag, oldTag];

        for (let i: number = 0; i < alteSections.length; i++) { //durchläuft SectionArray          

            while (alteSections[i].hasChildNodes()) { //durchläuft section und löscht alle Elemente
                alteSections[i].removeChild(<Node>alteSections[i].firstChild);
            }

        }
    }

    export function kategorieElements(_kategorie: number): void {
        let shopZaehler: number = parseFloat(localStorage.getItem("warenkorbZahl")!);
        zaehler.setAttribute("id", "zaehler");
        if (shopZaehler > 0) {
            zaehler.innerHTML = shopZaehler.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }

        //Sectionheading
        let divSectionheading: HTMLDivElement = document.createElement("div");
        divSectionheading.setAttribute("class", "sectionheading");
        let sectionHeading: HTMLHeadingElement = document.createElement("h2");
        divSectionheading.appendChild(sectionHeading);
        if (_kategorie == 1) {
            sectionHeading.innerHTML = "Neues Papier";
            newTag.appendChild(divSectionheading);
        }
        else if (_kategorie == 2) {
            sectionHeading.innerHTML = "&#10084; Unsere Bestseller &#10084;";
            bestsellerTag.appendChild(divSectionheading);
        }
        else {
            sectionHeading.innerHTML = "Altes Papier";
            oldTag.appendChild(divSectionheading);
        }

        //Artikelelemente
        for (let index: number = 0; index < sortiment.length; index++) {
            if (_kategorie == sortiment[index].kategorie) {
                let div: HTMLDivElement = document.createElement("div");
                div.setAttribute("class", "imgcontainer");

                let h3: HTMLHeadingElement = document.createElement("h3");
                div.appendChild(h3).innerHTML = sortiment[index].name;

                let img: HTMLImageElement = document.createElement("img");
                img.setAttribute("src", sortiment[index].image);
                img.setAttribute("alt", sortiment[index].name);
                div.appendChild(img);

                let pPrice: HTMLParagraphElement = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Preis: " + sortiment[index].preis + " €";

                let pDescription: HTMLParagraphElement = document.createElement("p");
                pDescription.setAttribute("class", "beschreibung");
                div.appendChild(pDescription).innerHTML = sortiment[index].beschreibung;

                let button: HTMLButtonElement = document.createElement("button");
                button.setAttribute("sortimentStelle", index.toString());
                button.addEventListener("click", handleKaufenClick);
                div.appendChild(button).innerHTML = "In den Einkaufswagen";

                if (_kategorie == 1) {
                    newTag.appendChild(div);
                }
                else if (_kategorie == 2) {
                    bestsellerTag.appendChild(div);
                }
                else {
                    oldTag.appendChild(div);
                }
            }           
        }
    }
    async function getArtikel(_url: RequestInfo): Promise<void> {
        let artikelEmpfangen: Response = await fetch(_url);
        sortiment = await artikelEmpfangen.json();
        createTags();
    }
    
}    