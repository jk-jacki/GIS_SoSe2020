"use strict";
var Aufgabe05;
(function (Aufgabe05) {
    //#region Sortiment
    let artikel01 = {
        kategorie: true,
        name: "Herzchen Papier",
        image: "images/herzchenkonfetti.jpg",
        preis: 0.00,
        beschreibung: "Da Liebe für jeden kostenlos sein sollte."
    };
    let artikel02 = {
        kategorie: true,
        name: "Fancy Papier",
        image: "images/fancypapier.jpg",
        preis: 19.99,
        beschreibung: "Elegantes Papier für die schönen Momente des Lebens."
    };
    let artikel03 = {
        kategorie: true,
        name: "Kariertes Papier",
        image: "images/kariertespapier.jpg",
        preis: 1.99,
        beschreibung: "Wasserabweisendes Papier für die Tränen in Mathe."
    };
    let artikel04 = {
        kategorie: true,
        name: "Liniertes Papier",
        image: "images/liniertespapier.png",
        preis: 1.99,
        beschreibung: "Liniertes Papier für die unter uns,<br> die in der Vorlesung noch nicht am Laptop mitschreiben."
    };
    let artikel05 = {
        kategorie: true,
        name: "Ganz viel Papier",
        image: "images/vielpapier.jpg",
        preis: 99.99,
        beschreibung: "Ein Lebensvorrat an Papier."
    };
    let artikel06 = {
        kategorie: true,
        name: "Toiletten Papier",
        image: "images/toilettenpapier.jpg",
        preis: 9.99,
        beschreibung: "Wolkig-weich für deinen wertvollen Allerwehrtesten."
    };
    let artikel07 = {
        kategorie: true,
        name: "Ein Koffer voll Toiletten Papier",
        image: "images/einkofferklopapier.jpg",
        preis: 9999999.99,
        beschreibung: "Kannst du dir so viel kacken überhaupt leisten?"
    };
    let artikel08 = {
        kategorie: false,
        name: "Tinten Papier",
        image: "images/federpapier.jpg",
        preis: 9.99, beschreibung: "Deine Brieftaube wird sich freuen."
    };
    let artikel09 = {
        kategorie: false,
        name: "Brief Papier",
        image: "images/briefpapier.jpg",
        preis: 4.99,
        beschreibung: "Ein romantischer Brief für deine/n Liebste/n."
    };
    let artikel10 = {
        kategorie: false,
        name: "Müll",
        image: "images/m%C3%BCll.jpg",
        preis: 0.29,
        beschreibung: "Unsere Low-Budget Alternative für den kleinen Geldbeutel."
    };
    let artikel11 = {
        kategorie: false,
        name: "Gefaltetes Papier",
        image: "images/gefaltetespapier.jpg",
        preis: 2.99,
        beschreibung: "Wir haben schonmal angefangen mit dem Papierflieger."
    };
    let artikel12 = {
        kategorie: false,
        name: "Zeitungs Papier",
        image: "images/zeitungspapier.jpg",
        preis: 14.99,
        beschreibung: "Die aktuellsten News über den 2. Weltkrieg."
    };
    let artikel13 = {
        kategorie: false,
        name: "Kaffee Papier",
        image: "images/kaffeepapier.jpg",
        preis: 0.49,
        beschreibung: "Da hat der Praktikant seinen Kaffee umgeschmissen."
    };
    let artikel14 = {
        kategorie: false,
        name: "Blumen Papier",
        image: "images/rosenpapier.jpg",
        preis: 7.99,
        beschreibung: "Der Geruch alter Bücher vermischt <br> mit dem Duft einer jungen Rose."
    };
    //#endregion
    let sortiment = [artikel01, artikel02, artikel03, artikel04, artikel05, artikel06, artikel07, artikel08, artikel09, artikel10, artikel11, artikel12, artikel13, artikel14];
    //DOM-Manipulation
    const newTag = document.getElementById("new");
    const oldTag = document.getElementById("old");
    createTags();
    function createTags() {
        for (let index = 0; index < sortiment.length; index++) {
            let div = document.createElement("div");
            div.setAttribute("class", "imgcontainer");
            let h3 = document.createElement("h3");
            div.appendChild(h3).innerHTML = sortiment[index].name;
            let img = document.createElement("img");
            img.setAttribute("src", sortiment[index].image);
            img.setAttribute("alt", sortiment[index].name);
            div.appendChild(img);
            let pPrice = document.createElement("p");
            pPrice.setAttribute("class", "price");
            div.appendChild(pPrice).innerHTML = "Preis: " + sortiment[index].preis + " €";
            let pDescription = document.createElement("p");
            pDescription.setAttribute("class", "beschreibung");
            div.appendChild(pDescription).innerHTML = sortiment[index].beschreibung;
            let button = document.createElement("button");
            div.appendChild(button).innerHTML = "In den Einkaufswagen";
            if (sortiment[index].kategorie) { //hängt an id="new" an   
                newTag.appendChild(div);
            }
            else { //hängt an id="old" an
                oldTag.appendChild(div);
            }
        }
    }
})(Aufgabe05 || (Aufgabe05 = {}));
//# sourceMappingURL=artikelScript.js.map