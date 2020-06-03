namespace Aufgabe06 {
    interface ShopArtikel {
        kategorie: number; //1 = new; 2 = bestseller; 3 = old
        name: string;
        image: string;
        preis: number;
        beschreibung: string;
    }

    //#region Sortiment
    let artikel01: ShopArtikel = {
        kategorie: 1,
        name: "Herzchen Papier",
        image: "images/herzchenkonfetti.jpg",
        preis: 0.00,
        beschreibung: "Da Liebe für jeden kostenlos sein sollte."
    };

    let artikel02: ShopArtikel = {
        kategorie: 1,
        name: "Fancy Papier",
        image: "images/fancypapier.jpg",
        preis: 19.99,
        beschreibung: "Elegantes Papier für die schönen Momente des Lebens."
    };

    let artikel03: ShopArtikel = {
        kategorie: 1,
        name: "Kariertes Papier",
        image: "images/kariertespapier.jpg",
        preis: 1.99,
        beschreibung: "Wasserabweisendes Papier für die Tränen in Mathe."
    };

    let artikel04: ShopArtikel = {
        kategorie: 1,
        name: "Liniertes Papier",
        image: "images/liniertespapier.png",
        preis: 1.99,
        beschreibung: "Liniertes Papier für die unter uns,<br> die in der Vorlesung noch nicht am Laptop mitschreiben."
    };

    let artikel05: ShopArtikel = {
        kategorie: 1,
        name: "Ganz viel Papier",
        image: "images/vielpapier.jpg",
        preis: 99.99,
        beschreibung: "Ein Lebensvorrat an Papier."
    };

    let artikel06: ShopArtikel = {
        kategorie: 2,
        name: "Toiletten Papier",
        image: "images/toilettenpapier.jpg",
        preis: 9.99,
        beschreibung: "Wolkig-weich für deinen wertvollen Allerwehrtesten."
    };

    let artikel07: ShopArtikel = {
        kategorie: 2,
        name: "Ein Koffer voll Toiletten Papier",
        image: "images/einkofferklopapier.jpg",
        preis: 9999999.99,
        beschreibung: "Kannst du dir so viel kacken überhaupt leisten?"
    };

    let artikel08: ShopArtikel = {
        kategorie: 3,
        name: "Tinten Papier",
        image: "images/federpapier.jpg",
        preis: 9.99, beschreibung: "Deine Brieftaube wird sich freuen."
    };

    let artikel09: ShopArtikel = {
        kategorie: 3,
        name: "Brief Papier",
        image: "images/briefpapier.jpg",
        preis: 4.99,
        beschreibung: "Ein romantischer Brief für deine/n Liebste/n."
    };

    let artikel10: ShopArtikel = {
        kategorie: 3,
        name: "Müll",
        image: "images/m%C3%BCll.jpg",
        preis: 0.29,
        beschreibung: "Unsere Low-Budget Alternative für den kleinen Geldbeutel."
    };

    let artikel11: ShopArtikel = {
        kategorie: 3,
        name: "Gefaltetes Papier",
        image: "images/gefaltetespapier.jpg",
        preis: 2.99,
        beschreibung: "Wir haben schonmal angefangen mit dem Papierflieger."
    };

    let artikel12: ShopArtikel = {
        kategorie: 3,
        name: "Zeitungs Papier",
        image: "images/zeitungspapier.jpg",
        preis: 14.99,
        beschreibung: "Die aktuellsten News über den 2. Weltkrieg."
    };

    let artikel13: ShopArtikel = {
        kategorie: 3,
        name: "Kaffee Papier",
        image: "images/kaffeepapier.jpg",
        preis: 0.49,
        beschreibung: "Da hat der Praktikant seinen Kaffee umgeschmissen."
    };

    let artikel14: ShopArtikel = {
        kategorie: 3,
        name: "Blumen Papier",
        image: "images/rosenpapier.jpg",
        preis: 7.99,
        beschreibung: "Der Geruch alter Bücher vermischt <br> mit dem Duft einer jungen Rose."
    };
    //#endregion
    //Kategorien-Sections
    export const newTag: HTMLElement = document.getElementById("new") as HTMLDivElement;
    export const bestsellerTag: HTMLElement = document.getElementById("bestseller") as HTMLDivElement;
    export const oldTag: HTMLElement = document.getElementById("old") as HTMLDivElement;

    export let sortiment: ShopArtikel[] = [artikel01, artikel02, artikel03, artikel04, artikel05, artikel06, artikel07, artikel08, artikel09, artikel10, artikel11, artikel12, artikel13, artikel14];
    
    //Warenkorb
    export let warenkorbZahl: number = 0;
    export let warenkorbPreis: number = 0;

    export let zaehler: HTMLSpanElement = document.createElement("span");
    zaehler.setAttribute("id", "zaehler");
}