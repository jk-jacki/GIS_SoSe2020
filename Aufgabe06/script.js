"use strict";
var Aufgabe06;
(function (Aufgabe06) {
    //Kategorien-Sections
    const newTag = document.getElementById("new");
    const bestsellerTag = document.getElementById("bestseller");
    const oldTag = document.getElementById("old");
    //Warenkorb
    let warenkorbZahl = 0;
    let warenkorbPreis = 0;
    let zaehler = document.createElement("span");
    zaehler.setAttribute("id", "zaehler");
    //bei Seitenaufruf
    createTags();
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
    function handleKaufenClick(_event) {
        //Zähler über Carticon
        warenkorbZahl++;
        if (warenkorbZahl > 0) {
            zaehler.innerHTML = warenkorbZahl.toString();
            document.getElementById("cart")?.appendChild(zaehler);
        }
        //Gesamtpreis
        let clickedButton = _event.target;
        let artikelIndex = parseFloat(clickedButton.getAttribute("sortimentStelle"));
        warenkorbPreis += Aufgabe06.sortiment[artikelIndex].preis;
        console.log("Ihr Warenkorb beträgt: " + warenkorbPreis + " €");
    }
    //Kategorien zum Anzeigen wählen
    function handleNewMenu(_event) {
        deleteTags();
        kategorieElements(1);
    }
    Aufgabe06.handleNewMenu = handleNewMenu;
    function handleBestsellerMenu(_event) {
        deleteTags();
        kategorieElements(2);
    }
    Aufgabe06.handleBestsellerMenu = handleBestsellerMenu;
    function handleOldMenu(_event) {
        deleteTags();
        kategorieElements(3);
    }
    Aufgabe06.handleOldMenu = handleOldMenu;
    function handleShowAllMenu() {
        deleteTags();
        createTags();
    }
    Aufgabe06.handleShowAllMenu = handleShowAllMenu;
    //Altes Sortiment löschen
    function deleteTags() {
        let alteSections = [newTag, bestsellerTag, oldTag];
        for (let i = 0; i < alteSections.length; i++) { //durchläuft SectionArray          
            while (alteSections[i].hasChildNodes()) { //durchläuft section und löscht alle Elemente
                alteSections[i].removeChild(alteSections[i].firstChild);
            }
        }
    }
    function kategorieElements(_kategorie) {
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
        for (let index = 0; index < Aufgabe06.sortiment.length; index++) {
            if (_kategorie == Aufgabe06.sortiment[index].kategorie) {
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
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
})(Aufgabe06 || (Aufgabe06 = {}));
//# sourceMappingURL=script.js.map