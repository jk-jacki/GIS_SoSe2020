"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    //DOM-Manipulation
    createTags();
    //DOM-Aufbau
    function createTags() {
        //Section New Überschrift
        let divNewSectionheading = document.createElement("div");
        divNewSectionheading.setAttribute("class", "sectionheading");
        let sectionNewHeading = document.createElement("h2");
        sectionNewHeading.innerHTML = "Neues Papier";
        divNewSectionheading.appendChild(sectionNewHeading);
        Aufgabe06.newTag.appendChild(divNewSectionheading);
        //Section Bestseller Überschrift
        let divBestsellerSectionheading = document.createElement("div");
        divBestsellerSectionheading.setAttribute("class", "sectionheading");
        let sectionBestsellerHeading = document.createElement("h2");
        sectionBestsellerHeading.innerHTML = "&#10084; Unsere Bestseller &#10084;";
        divBestsellerSectionheading.appendChild(sectionBestsellerHeading);
        Aufgabe06.bestsellerTag.appendChild(divBestsellerSectionheading);
        //Section Old Überschrift
        let divOldSectionheading = document.createElement("div");
        divOldSectionheading.setAttribute("class", "sectionheading");
        let sectionOldHeading = document.createElement("h2");
        sectionOldHeading.innerHTML = "Altes Papier";
        divOldSectionheading.appendChild(sectionOldHeading);
        Aufgabe06.oldTag.appendChild(divOldSectionheading);
        for (let index = 0; index < Aufgabe06.sortiment.length; index++) {
            let div = document.createElement("div");
            div.setAttribute("class", "imgcontainer");
            if (Aufgabe06.sortiment[index].kategorie == 1) { //hängt an id="new" an
                Aufgabe06.newTag.appendChild(div);
            }
            else if (Aufgabe06.sortiment[index].kategorie == 2) { //hängt an id="bestseller" an
                Aufgabe06.bestsellerTag.appendChild(div);
            }
            else { //hängt an id="old" an
                Aufgabe06.oldTag.appendChild(div);
            }
            let h3 = document.createElement("h3");
            div.appendChild(h3).innerHTML = Aufgabe06.sortiment[index].name;
            let img = document.createElement("img");
            img.setAttribute("src", Aufgabe06.sortiment[index].image);
            img.setAttribute("alt", Aufgabe06.sortiment[index].name);
            div.appendChild(img);
            let pPrice = document.createElement("p");
            pPrice.setAttribute("class", "price");
            div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe06.sortiment[index].preis + " €";
            let pDescription = document.createElement("p");
            pDescription.setAttribute("class", "beschreibung");
            div.appendChild(pDescription).innerHTML = Aufgabe06.sortiment[index].beschreibung;
            let button = document.createElement("button");
            button.addEventListener("click", handleKaufenClick);
            div.appendChild(button).innerHTML = "In den Einkaufswagen";
        }
    }
    function handleKaufenClick(_event) {
        //Zähler über Carticon
        Aufgabe06.warenkorbZahl++;
        Aufgabe06.zaehler.innerHTML = Aufgabe06.warenkorbZahl.toString();
        document.getElementById("cart")?.appendChild(Aufgabe06.zaehler);
        //Get Preis
        let preisString = "";
        if (_event.target != null) {
            let clickedButton = _event.target;
            if (clickedButton.previousSibling.previousSibling.firstChild.nodeValue != undefined) {
                preisString = clickedButton.previousSibling.previousSibling.firstChild.nodeValue;
                preisString = preisString.substring(7, preisString.length - 2);
            }
        }
        //Gesamtpreisermittlung
        Aufgabe06.warenkorbPreis += parseFloat(preisString);
        console.log("Ihr Warenkorb beträgt: " + Aufgabe06.warenkorbPreis + " €");
    }
    //Menübuttons zum Seitenaufbau
    let newMenu = document.getElementById("newMenu");
    newMenu.addEventListener("click", handleNewMenu);
    let bestsellerMenu = document.getElementById("bestsellerMenu");
    bestsellerMenu.addEventListener("click", handleBestsellerMenu);
    let oldMenu = document.getElementById("oldMenu");
    oldMenu.addEventListener("click", handleOldMenu);
    let showAllMenu = document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", handleShowAllMenu);
    //New Sortiment aufbauen
    function handleNewMenu(_event) {
        deleteElements();
        //Erstellen der SectionHeading
        let divNewSectionheading = document.createElement("div");
        divNewSectionheading.setAttribute("class", "sectionheading");
        let sectionNewHeading = document.createElement("h2");
        sectionNewHeading.innerHTML = "Neues Papier";
        divNewSectionheading.appendChild(sectionNewHeading);
        Aufgabe06.newTag.appendChild(divNewSectionheading);
        for (let index = 0; index < Aufgabe06.sortiment.length; index++) {
            if (Aufgabe06.sortiment[index].kategorie == 1) { //hängt an id="new" an
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                Aufgabe06.newTag.appendChild(div);
                let h3 = document.createElement("h3");
                div.appendChild(h3).innerHTML = Aufgabe06.sortiment[index].name;
                let img = document.createElement("img");
                img.setAttribute("src", Aufgabe06.sortiment[index].image);
                img.setAttribute("alt", Aufgabe06.sortiment[index].name);
                div.appendChild(img);
                let pPrice = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe06.sortiment[index].preis + " €";
                let pDescription = document.createElement("p");
                pDescription.setAttribute("class", "beschreibung");
                div.appendChild(pDescription).innerHTML = Aufgabe06.sortiment[index].beschreibung;
                let button = document.createElement("button");
                button.addEventListener("click", handleKaufenClick);
                div.appendChild(button).innerHTML = "In den Einkaufswagen";
            }
        }
    }
    function handleBestsellerMenu(_event) {
        deleteElements();
        //Erstellen der SectionHeading
        let divBestsellerSectionheading = document.createElement("div");
        divBestsellerSectionheading.setAttribute("class", "sectionheading");
        let sectionBestsellerHeading = document.createElement("h2");
        sectionBestsellerHeading.innerHTML = "&#10084; Unsere Bestseller &#10084;";
        divBestsellerSectionheading.appendChild(sectionBestsellerHeading);
        Aufgabe06.bestsellerTag.appendChild(divBestsellerSectionheading);
        for (let index = 0; index < Aufgabe06.sortiment.length; index++) {
            if (Aufgabe06.sortiment[index].kategorie == 2) { //hängt an id="bestseller" an
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                Aufgabe06.bestsellerTag.appendChild(div);
                let h3 = document.createElement("h3");
                div.appendChild(h3).innerHTML = Aufgabe06.sortiment[index].name;
                let img = document.createElement("img");
                img.setAttribute("src", Aufgabe06.sortiment[index].image);
                img.setAttribute("alt", Aufgabe06.sortiment[index].name);
                div.appendChild(img);
                let pPrice = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe06.sortiment[index].preis + " €";
                let pDescription = document.createElement("p");
                pDescription.setAttribute("class", "beschreibung");
                div.appendChild(pDescription).innerHTML = Aufgabe06.sortiment[index].beschreibung;
                let button = document.createElement("button");
                button.addEventListener("click", handleKaufenClick);
                div.appendChild(button).innerHTML = "In den Einkaufswagen";
            }
        }
    }
    function handleOldMenu(_event) {
        deleteElements();
        //Erstellen der SectionHeading
        let divOldSectionheading = document.createElement("div");
        divOldSectionheading.setAttribute("class", "sectionheading");
        let sectionOldHeading = document.createElement("h2");
        sectionOldHeading.innerHTML = "Altes Papier";
        divOldSectionheading.appendChild(sectionOldHeading);
        Aufgabe06.oldTag.appendChild(divOldSectionheading);
        for (let index = 0; index < Aufgabe06.sortiment.length; index++) {
            if (Aufgabe06.sortiment[index].kategorie == 3) { //hängt an id="bestseller" an
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                Aufgabe06.oldTag.appendChild(div);
                let h3 = document.createElement("h3");
                div.appendChild(h3).innerHTML = Aufgabe06.sortiment[index].name;
                let img = document.createElement("img");
                img.setAttribute("src", Aufgabe06.sortiment[index].image);
                img.setAttribute("alt", Aufgabe06.sortiment[index].name);
                div.appendChild(img);
                let pPrice = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe06.sortiment[index].preis + " €";
                let pDescription = document.createElement("p");
                pDescription.setAttribute("class", "beschreibung");
                div.appendChild(pDescription).innerHTML = Aufgabe06.sortiment[index].beschreibung;
                let button = document.createElement("button");
                button.addEventListener("click", handleKaufenClick);
                div.appendChild(button).innerHTML = "In den Einkaufswagen";
            }
        }
    }
    function handleShowAllMenu() {
        deleteElements();
        createTags();
    }
    //Altes Sortiment löschen
    function deleteElements() {
        let alteSections = [Aufgabe06.newTag, Aufgabe06.bestsellerTag, Aufgabe06.oldTag];
        for (let i = 0; i < alteSections.length; i++) { //durchläuft SectionArray          
            while (alteSections[i].hasChildNodes()) { //durchläuft section und löscht alle Elemente
                alteSections[i].removeChild(alteSections[i].firstChild);
            }
        }
    }
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=script.js.map