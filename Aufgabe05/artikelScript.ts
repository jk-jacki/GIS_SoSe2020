namespace Aufgabe05 {
    interface ShopArtikel {
        //[key: string]: boolean | string | string | number | string;
        kategorie: boolean;
        name: string;
        image: string;
        preis: number;
        beschreibung: string;
    }

    //#region Sortiment
    let artikel01: ShopArtikel = {
        kategorie: true,
        name: "Herzchen Papier",
        image: "images/herzchenkonfetti.jpg",
        preis: 0.00,
        beschreibung: "Da Liebe für jeden kostenlos sein sollte."
    };

    let artikel02: ShopArtikel = {
        kategorie: true,
        name: "Fancy Papier",
        image: "images/fancypapier.jpg",
        preis: 19.99,
        beschreibung: "Elegantes Papier für die schönen Momente des Lebens."
    };

    let artikel03: ShopArtikel = {
        kategorie: true,
        name: "Kariertes Papier",
        image: "images/kariertespapier.jpg",
        preis: 1.99,
        beschreibung: "Wasserabweisendes Papier für die Tränen in Mathe."
    };

    let artikel04: ShopArtikel = {
        kategorie: true,
        name: "Liniertes Papier",
        image: "images/liniertespapier.png",
        preis: 1.99,
        beschreibung: "Liniertes Papier für die unter uns,<br> die in der Vorlesung noch nicht am Laptop mitschreiben."
    };

    let artikel05: ShopArtikel = {
        kategorie: true,
        name: "Ganz viel Papier",
        image: "images/vielpapier.jpg",
        preis: 99.99,
        beschreibung: "Ein Lebensvorrat an Papier."
    };

    let artikel06: ShopArtikel = {
        kategorie: true,
        name: "Toiletten Papier",
        image: "images/toilettenpapier.jpg",
        preis: 10.00,
        beschreibung: "Wolkig-weich für deinen wertvollen Allerwehrtesten."
    };

    let artikel07: ShopArtikel = {
        kategorie: true,
        name: "Ein Koffer voll Toiletten Papier",
        image: "images/einkofferklopapier.jpg",
        preis: 9999999.99,
        beschreibung: "Kannst du dir so viel kacken überhaupt leisten?"
    };

    let artikel08: ShopArtikel = {
        kategorie: false,
        name: "Tinten Papier",
        image: "images/federpapier.jpg",
        preis: 9.99, beschreibung: "Deine Brieftaube wird sich freuen."
    };

    let artikel09: ShopArtikel = {
        kategorie: false,
        name: "Brief Papier",
        image: "images/briefpapier.jpg",
        preis: 4.99,
        beschreibung: "Ein romantischer Brief für deine/n Liebste/n."
    };

    let artikel10: ShopArtikel = {
        kategorie: false,
        name: "Müll",
        image: "images/m%C3%BCll.jpg",
        preis: 0.20,
        beschreibung: "Unsere Low-Budget Alternative für den kleinen Geldbeutel."
    };

    let artikel11: ShopArtikel = {
        kategorie: false,
        name: "Gefaltetes Papier",
        image: "images/gefaltetespapier.jpg",
        preis: 2.99,
        beschreibung: "Wir haben schonmal angefangen mit dem Papierflieger."
    };

    let artikel12: ShopArtikel = {
        kategorie: false,
        name: "Zeitungs Papier",
        image: "images/zeitungspapier.jpg",
        preis: 14.99,
        beschreibung: "Die aktuellsten News über den 2. Weltkrieg."
    };

    let artikel13: ShopArtikel = {
        kategorie: false,
        name: "Kaffee Papier",
        image: "images/kaffeepapier.jpg",
        preis: 0.50,
        beschreibung: "Da hat der Praktikant seinen Kaffee umgeschmissen."
    };

    let artikel14: ShopArtikel = {
        kategorie: false,
        name: "Blumen Papier",
        image: "images/rosenpapier.jpg",
        preis: 7.99,
        beschreibung: "Der Geruch alter Bücher vermischt <br> mit dem Duft einer jungen Rose."
    };
    //#endregion

    const sortiment: ShopArtikel[] = [artikel01, artikel02, artikel03, artikel04, artikel05, artikel06, artikel07, artikel08, artikel09, artikel10, artikel11, artikel12, artikel13, artikel14];

    //DOM-Manipulation

    const newTag: HTMLElement = document.getElementById("new") as HTMLDivElement;
    const oldTag: HTMLElement = document.getElementById("old") as HTMLDivElement;

    createTags();
    
    function createTags(): void {

        for (let index: number = 0; index < sortiment.length; index++) {

            let div: HTMLDivElement = document.createElement("div");
            div.setAttribute("class", "imgcontainer");
            
            let h3: HTMLHeadingElement = document.createElement("h3");

            let img: HTMLImageElement = document.createElement("img");
            img.setAttribute("src", sortiment[index].image);
            img.setAttribute("alt", sortiment[index].name);

            let pPrice: HTMLParagraphElement = document.createElement("p");
            pPrice.setAttribute("class", "price");

            let pDescription: HTMLParagraphElement = document.createElement("p");
            pDescription.setAttribute("class", "beschreibung");

            let button: HTMLButtonElement = document.createElement("button");
    
            if (sortiment[index].kategorie) { //hängt an id="new" an
    
                newTag.appendChild(div);

                div.appendChild(h3).innerHTML = sortiment[index].name;
                div.appendChild(img);
                div.appendChild(pPrice).innerHTML = "Preis: " + sortiment[index].preis + "€";
                div.appendChild(pDescription).innerHTML = sortiment[index].beschreibung;
                div.appendChild(button).innerHTML = "In den Einkaufswagen";

            }
            else { //hängt an id="old" an
    
                oldTag.appendChild(div);

                div.appendChild(h3).innerHTML = sortiment[index].name;
                div.appendChild(img);
                div.appendChild(pPrice).innerHTML = "Preis: " + sortiment[index].preis + "€";
                div.appendChild(pDescription).innerHTML = sortiment[index].beschreibung;
                div.appendChild(button).innerHTML = "In den Einkaufswagen";

            }
        }
    }
    
    

}

