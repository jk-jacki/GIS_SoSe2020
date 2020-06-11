"use strict";
var Aufgabe07;
(function (Aufgabe07) {
    const preisAusgabeSection = document.getElementById("preisAusgabe");
    const warenkorbArtikelSection = document.getElementById("warenkorbArtikel");
    let showAllMenu = document.getElementById("showAllMenu");
    showAllMenu.addEventListener("click", Aufgabe07.handleShowAllMenu);
    let warenkorbZaehler = parseFloat(localStorage.getItem("warenkorbZahl"));
    let cartZaehler = document.createElement("span");
    //bei Seitenaufruf
    getArtikel("artikel.json");
    createCart();
    function createCart() {
        //GesamtpreisSection
        if (localStorage.getItem("gesamtPreis")) {
            let gesamtPreis = localStorage.getItem("gesamtPreis");
            let divPreis = document.createElement("div");
            divPreis.setAttribute("id", "preisCartDiv");
            preisAusgabeSection.appendChild(divPreis);
            let pPreisAusgabe = document.createElement("p");
            pPreisAusgabe.innerHTML = "Gesamtpreis: " + gesamtPreis + "€";
            divPreis.appendChild(pPreisAusgabe);
            let deleteButton = document.createElement("button");
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
    function deleteCart() {
        while (warenkorbArtikelSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            warenkorbArtikelSection.removeChild(warenkorbArtikelSection.firstChild);
        }
        while (preisAusgabeSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            preisAusgabeSection.removeChild(preisAusgabeSection.firstChild);
        }
        cartZaehler.remove();
        localStorage.clear();
    }
    function createCartArticles() {
        for (let i = 0; i < Aufgabe07.sortiment.length; i++) {
            if (localStorage.getItem(i.toString())) {
                let div = document.createElement("div");
                div.setAttribute("class", "imgcontainer");
                warenkorbArtikelSection.appendChild(div);
                let h3 = document.createElement("h3");
                div.appendChild(h3).innerHTML = Aufgabe07.sortiment[i].name;
                let img = document.createElement("img");
                img.setAttribute("src", Aufgabe07.sortiment[i].image);
                img.setAttribute("alt", Aufgabe07.sortiment[i].name);
                div.appendChild(img);
                let pAmount = document.createElement("p");
                pAmount.setAttribute("class", "amount");
                div.appendChild(pAmount).innerHTML = "Anzahl Ihrer Produkte: " + localStorage.getItem(i.toString());
                let pPrice = document.createElement("p");
                pPrice.setAttribute("class", "price");
                div.appendChild(pPrice).innerHTML = "Gesamtpreis: " + Aufgabe07.sortiment[i].preis * parseFloat(localStorage.getItem(i.toString())) + " €";
                let button = document.createElement("button");
                button.setAttribute("sortimentStelle", i.toString());
                button.addEventListener("click", handleLoeschen);
                div.appendChild(button).innerHTML = "Löschen";
            }
        }
    }
    function handleLoeschen(_event) {
        //Ermitteln des gewählten Artikels
        let clickedButton = _event.target;
        let artikelIndex = parseFloat(clickedButton.getAttribute("sortimentStelle"));
        let anzahlGeloeschterElemente = parseFloat(localStorage.getItem((artikelIndex.toString())));
        //Zähler runtersetzen
        warenkorbZaehler -= anzahlGeloeschterElemente;
        localStorage.setItem("warenkorbZahl", warenkorbZaehler.toString());
        //Neuen Gesamtpreis berechnen
        let alterGesamtPreis = parseFloat(localStorage.getItem("gesamtPreis"));
        let preisDifferenz = Aufgabe07.sortiment[artikelIndex].preis * parseFloat(localStorage.getItem(artikelIndex.toString()));
        let neuerGesamtPreis = alterGesamtPreis - preisDifferenz;
        localStorage.setItem("gesamtPreis", neuerGesamtPreis.toString());
        //HTML Artikel löschen
        while (warenkorbArtikelSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            warenkorbArtikelSection.removeChild(warenkorbArtikelSection.firstChild);
        }
        while (preisAusgabeSection.hasChildNodes()) { //durchläuft section und löscht alle Elemente
            preisAusgabeSection.removeChild(preisAusgabeSection.firstChild);
        }
        localStorage.removeItem(artikelIndex.toString());
        createCartArticles();
        createCart();
    }
    async function getArtikel(_url) {
        let artikelEmpfangen = await fetch(_url);
        Aufgabe07.sortiment = await artikelEmpfangen.json();
        createCartArticles();
    }
})(Aufgabe07 || (Aufgabe07 = {}));
//# sourceMappingURL=einkaufswagenScript.js.map