namespace Aufgabe06 {
    //bei Seitenaufruf
    createTags();

    //DOM-Aufbau
    function createTags(): void {
        //Section New Überschrift
        let divNewSectionheading: HTMLDivElement = document.createElement("div");
        divNewSectionheading.setAttribute("class", "sectionheading");
        let sectionNewHeading: HTMLHeadingElement = document.createElement("h2");
        sectionNewHeading.innerHTML = "Neues Papier";
        divNewSectionheading.appendChild(sectionNewHeading);
        newTag.appendChild(divNewSectionheading);

        //Section Bestseller Überschrift
        let divBestsellerSectionheading: HTMLDivElement = document.createElement("div");
        divBestsellerSectionheading.setAttribute("class", "sectionheading");
        let sectionBestsellerHeading: HTMLHeadingElement = document.createElement("h2");
        sectionBestsellerHeading.innerHTML = "&#10084; Unsere Bestseller &#10084;";
        divBestsellerSectionheading.appendChild(sectionBestsellerHeading);
        bestsellerTag.appendChild(divBestsellerSectionheading);

        //Section Old Überschrift
        let divOldSectionheading: HTMLDivElement = document.createElement("div");
        divOldSectionheading.setAttribute("class", "sectionheading");
        let sectionOldHeading: HTMLHeadingElement = document.createElement("h2");
        sectionOldHeading.innerHTML = "Altes Papier";
        divOldSectionheading.appendChild(sectionOldHeading);
        oldTag.appendChild(divOldSectionheading);

        for (let index: number = 0; index < sortiment.length; index++) {

            let div: HTMLDivElement = document.createElement("div");
            div.setAttribute("class", "imgcontainer");

            if (sortiment[index].kategorie == 1) { //hängt an id="new" an

                newTag.appendChild(div);
            }
            else if (sortiment[index].kategorie == 2) { //hängt an id="bestseller" an

                bestsellerTag.appendChild(div);
            }
            else { //hängt an id="old" an

                oldTag.appendChild(div);
            }

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
        }
    }

    function handleKaufenClick(_event: Event): void {
        //Zähler über Carticon
        warenkorbZahl++;
        if (warenkorbZahl > 0) {
            zaehler.innerHTML = warenkorbZahl.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }
        
        /*
        //Get Preis
        let preisString: string = "";
        if (_event.target != null) {
            let clickedButton: HTMLElement = <HTMLElement>_event.target;
            if (clickedButton.previousSibling!.previousSibling!.firstChild!.nodeValue != undefined) {
                preisString = clickedButton.previousSibling!.previousSibling!.firstChild!.nodeValue;    //!!!stattdessen lieber über parentNode gehen und in der Liste der ChildNodes nach dem P-Preis-Tag suchen
                preisString = preisString.substring(7, preisString.length - 2);
            }
        }

        //Gesamtpreisermittlung
        warenkorbPreis += parseFloat(preisString);
        console.log("Ihr Warenkorb beträgt: " + warenkorbPreis + " €");
        */

        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let artikelIndex: number = parseFloat(clickedButton.getAttribute("sortimentStelle")!);
        warenkorbPreis += sortiment[artikelIndex].preis;
        console.log("Ihr Warenkorb beträgt: " + warenkorbPreis + " €");
    }

    //Menübuttons zum Seitenaufbau
    let newMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("newMenu");
    newMenu.addEventListener("click", handleNewMenu);

    let bestsellerMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("bestsellerMenu");
    bestsellerMenu.addEventListener("click", handleBestsellerMenu);

    let oldMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("oldMenu");
    oldMenu.addEventListener("click", handleOldMenu);

    let showAllMenu: HTMLSpanElement = <HTMLSpanElement>document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", handleShowAllMenu);

    //New Sortiment aufbauen
    function handleNewMenu(_event: Event): void {
        deleteTags();

        //Erstellen der SectionHeading
        let divNewSectionheading: HTMLDivElement = document.createElement("div");
        divNewSectionheading.setAttribute("class", "sectionheading");
        let sectionNewHeading: HTMLHeadingElement = document.createElement("h2");
        sectionNewHeading.innerHTML = "Neues Papier";
        divNewSectionheading.appendChild(sectionNewHeading);
        newTag.appendChild(divNewSectionheading);

        for (let index: number = 0; index < sortiment.length; index++) {

            if (sortiment[index].kategorie == 1) { //hängt an id="new" an
                let div: HTMLDivElement = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                newTag.appendChild(div);

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
            }
        }
    }

    function handleBestsellerMenu(_event: Event): void {
        deleteTags();

        //Erstellen der SectionHeading
        let divBestsellerSectionheading: HTMLDivElement = document.createElement("div");
        divBestsellerSectionheading.setAttribute("class", "sectionheading");
        let sectionBestsellerHeading: HTMLHeadingElement = document.createElement("h2");
        sectionBestsellerHeading.innerHTML = "&#10084; Unsere Bestseller &#10084;";
        divBestsellerSectionheading.appendChild(sectionBestsellerHeading);
        bestsellerTag.appendChild(divBestsellerSectionheading);

        for (let index: number = 0; index < sortiment.length; index++) {

            if (sortiment[index].kategorie == 2) { //hängt an id="bestseller" an
                let div: HTMLDivElement = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                bestsellerTag.appendChild(div);

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
            }
        }
    }

    function handleOldMenu(_event: Event): void {
        deleteTags();

        //Erstellen der SectionHeading
        let divOldSectionheading: HTMLDivElement = document.createElement("div");
        divOldSectionheading.setAttribute("class", "sectionheading");
        let sectionOldHeading: HTMLHeadingElement = document.createElement("h2");
        sectionOldHeading.innerHTML = "Altes Papier";
        divOldSectionheading.appendChild(sectionOldHeading);
        oldTag.appendChild(divOldSectionheading);

        for (let index: number = 0; index < sortiment.length; index++) {

            if (sortiment[index].kategorie == 3) { //hängt an id="bestseller" an
                let div: HTMLDivElement = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                oldTag.appendChild(div);

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
            }
        }
    }

    function handleShowAllMenu(): void {
        deleteTags();
        createTags();
    }

    //Altes Sortiment löschen
    function deleteTags(): void {
        let alteSections: HTMLElement[] = [newTag, bestsellerTag, oldTag];

        for (let i: number = 0; i < alteSections.length; i++) { //durchläuft SectionArray          

            while (alteSections[i].hasChildNodes()) { //durchläuft section und löscht alle Elemente
                alteSections[i].removeChild(alteSections[i].firstChild!);
            }

        }
    }
}    