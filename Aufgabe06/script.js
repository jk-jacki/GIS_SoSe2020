"use strict";
var Aufgabe05;
(function (Aufgabe05) {
    //DOM-Manipulation
    const newTag = document.getElementById("new");
    const bestsellerTag = document.getElementById("bestseller");
    const oldTag = document.getElementById("old");
    createTags();
    //DOM-Aufbau
    function createTags() {
        for (let index = 0; index < Aufgabe05.sortiment.length; index++) {
            let div = document.createElement("div");
            div.setAttribute("class", "imgcontainer");
            if (Aufgabe05.sortiment[index].kategorie == 1) { //hängt an id="new" an
                newTag.appendChild(div);
            }
            else if (Aufgabe05.sortiment[index].kategorie == 2) {
                bestsellerTag.appendChild(div);
            }
            else { //hängt an id="old" an
                oldTag.appendChild(div);
            }
            let h3 = document.createElement("h3");
            div.appendChild(h3).innerHTML = Aufgabe05.sortiment[index].name;
            let img = document.createElement("img");
            img.setAttribute("src", Aufgabe05.sortiment[index].image);
            img.setAttribute("alt", Aufgabe05.sortiment[index].name);
            div.appendChild(img);
            let pPrice = document.createElement("p");
            pPrice.setAttribute("class", "price");
            div.appendChild(pPrice).innerHTML = "Preis: " + Aufgabe05.sortiment[index].preis + " €";
            let pDescription = document.createElement("p");
            pDescription.setAttribute("class", "beschreibung");
            div.appendChild(pDescription).innerHTML = Aufgabe05.sortiment[index].beschreibung;
            let button = document.createElement("button");
            button.addEventListener("click", handleKaufenClick);
            div.appendChild(button).innerHTML = "In den Einkaufswagen";
        }
    }
    function handleKaufenClick(_event) {
        //Zähler auf Carticon
        Aufgabe05.warenkorbZahl++;
        Aufgabe05.zaehler.innerHTML = Aufgabe05.warenkorbZahl + "";
        document.getElementById("cart")?.appendChild(Aufgabe05.zaehler);
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
        Aufgabe05.warenkorbPreis += parseFloat(preisString);
        console.log("Ihr Warenkorb beträgt: " + Aufgabe05.warenkorbPreis + " €");
    }
})(Aufgabe05 || (Aufgabe05 = {}));
//# sourceMappingURL=script.js.map