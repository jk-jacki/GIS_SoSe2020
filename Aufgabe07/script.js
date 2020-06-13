"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    //Kategorien-Sections
    const newTag = document.getElementById("new");
    const bestsellerTag = document.getElementById("bestseller");
    const oldTag = document.getElementById("old");
    //Warenkorb
    let artikelAnzahl = 0;
    let warenkorbZahl = 0;
    if (localStorage.getItem("warenkorbZahl") != null) {
        warenkorbZahl = parseFloat(localStorage.getItem("warenkorbZahl"));
    }
    let warenkorbPreis = 0;
    if (localStorage.getItem("gesamtPreis") != null) {
        warenkorbPreis = parseFloat(localStorage.getItem("gesamtPreis"));
    }
    let zaehler = document.createElement("span");
    zaehler.setAttribute("id", "zaehler");
    //bei Seitenaufruf
    getArtikel("artikel.json");
    //Menübuttons zum Seitenaufbau
    let newMenu = document.getElementById("newMenu");
    newMenu.addEventListener("click", handleNewMenu);
    let bestsellerMenu = document.getElementById("bestsellerMenu");
    bestsellerMenu.addEventListener("click", handleBestsellerMenu);
    let oldMenu = document.getElementById("oldMenu");
    oldMenu.addEventListener("click", handleOldMenu);
    let showAllMenu = document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", handleShowAllMenu);
    //DOM-Aufbau
    function createTags() {
        kategorieElements(1);
        kategorieElements(2);
        kategorieElements(3);
    }
    Aufgabe07.createTags = createTags;
    function handleKaufenClick(_event) {
        //Zähler über Carticon
        warenkorbZahl++;
        if (warenkorbZahl > 0) {
            zaehler.innerHTML = warenkorbZahl.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }
        localStorage.setItem("warenkorbZahl", warenkorbZahl.toString());
        //Gesamtpreis
        let clickedButton = _event.target;
        let artikelIndex = parseFloat(clickedButton.getAttribute("sortimentStelle"));
        warenkorbPreis += Aufgabe07.sortiment[artikelIndex].preis;
        localStorage.setItem("gesamtPreis", warenkorbPreis.toString());
        //ArtikelItems
        if (localStorage.getItem(artikelIndex.toString())) {
            let aktuelleAnzahl = parseFloat(localStorage.getItem(artikelIndex.toString())); //artikelAnzahl++;
            artikelAnzahl = aktuelleAnzahl + 1;
        }
        else {
            artikelAnzahl = 1;
        }
        localStorage.setItem(artikelIndex.toString(), artikelAnzahl.toString());
    }
    //Kategorien zum Anzeigen wählen
    function handleNewMenu(_event) {
        deleteTags();
        kategorieElements(1);
    }
    Aufgabe07.handleNewMenu = handleNewMenu;
    function handleBestsellerMenu(_event) {
        deleteTags();
        kategorieElements(2);
    }
    Aufgabe07.handleBestsellerMenu = handleBestsellerMenu;
    function handleOldMenu(_event) {
        deleteTags();
        kategorieElements(3);
    }
    Aufgabe07.handleOldMenu = handleOldMenu;
    function handleShowAllMenu() {
        deleteTags();
        createTags();
    }
    Aufgabe07.handleShowAllMenu = handleShowAllMenu;
    //Altes Sortiment löschen
    function deleteTags() {
        let alteSections = [newTag, bestsellerTag, oldTag];
        for (let i = 0; i < alteSections.length; i++) { //durchläuft SectionArray          
            while (alteSections[i].hasChildNodes()) { //durchläuft section und löscht alle Elemente
                alteSections[i].removeChild(alteSections[i].firstChild);
            }
        }
    }
    Aufgabe07.deleteTags = deleteTags;
    function kategorieElements(_kategorie) {
        let shopZaehler = parseFloat(localStorage.getItem("warenkorbZahl"));
        zaehler.setAttribute("id", "zaehler");
        if (shopZaehler > 0) {
            zaehler.innerHTML = shopZaehler.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }
        //Sectionheading
        let divSectionheading = document.createElement("div");
        divSectionheading.setAttribute("class", "sectionheading");
        let sectionHeading = document.createElement("h2");
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
        for (let index = 0; index < Aufgabe07.sortiment.length; index++) {
            if (_kategorie == Aufgabe07.sortiment[index].kategorie) {
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                let h3 = document.createElement("h3");
                div.appendChild(h3).innerHTML = Aufgabe07.sortiment[index].name;
                let img = document.createElement("img");
                img.setAttribute("src", Aufgabe07.sortiment[index].image);
                img.setAttribute("alt", Aufgabe07.sortiment[index].name);
                div.appendChild(img);
                let pPrice = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe07.sortiment[index].preis + " €";
                let pDescription = document.createElement("p");
                pDescription.setAttribute("class", "beschreibung");
                div.appendChild(pDescription).innerHTML = Aufgabe07.sortiment[index].beschreibung;
                let button = document.createElement("button");
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
    Aufgabe07.kategorieElements = kategorieElements;
    async function getArtikel(_url) {
        let artikelEmpfangen = await fetch(_url);
        Aufgabe07.sortiment = await artikelEmpfangen.json();
        createTags();
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=script.js.map