"use strict";
var Endabgabe;
(function (Endabgabe) {
    //wichtige Variablen
    let gesamtPreis = 0;
    const bestellAnzeige = document.getElementById("bestellAnzeige");
    //#region Add-Button erhalten Attribut mit Index
    //Eissorten
    const addKugelButtonList = document.querySelectorAll(".addKugelButton");
    for (let index = 0; index < addKugelButtonList.length; index++) {
        let addKugelButton = addKugelButtonList[index];
        addKugelButton.setAttribute("eisindex", index.toString());
        addKugelButton.addEventListener("click", handleAddKugel);
    }
    //Soßen
    const addSoßeButtonList = document.querySelectorAll(".addSoßeButton");
    for (let index = 0; index < addSoßeButtonList.length; index++) {
        let addSoßeButton = addSoßeButtonList[index];
        addSoßeButton.setAttribute("soßenindex", index.toString());
        addSoßeButton.addEventListener("click", handleAddSoße);
    }
    //Extras
    const addExtraButtonList = document.querySelectorAll(".addExtraButton");
    for (let index = 0; index < addExtraButtonList.length; index++) {
        let addExtraButton = addExtraButtonList[index];
        addExtraButton.setAttribute("extraindex", index.toString());
        addExtraButton.addEventListener("click", handleAddExtra);
    }
    ////#endregion
    //#region Übergang von Step 1 zu Step 2
    let waffel = document.getElementById("chooseWaffel");
    waffel.addEventListener("click", handleWaffel);
    waffel.addEventListener("touchend", handleWaffel);
    let becher = document.getElementById("chooseBecher");
    becher.addEventListener("click", handleBecher);
    becher.addEventListener("touchend", handleBecher);
    function handleWaffel() {
        localStorage.setItem("Behälter", "Waffel");
        stepOneToTwo();
    }
    function handleBecher() {
        localStorage.setItem("Behälter", "Becher");
        stepOneToTwo();
    }
    function stepOneToTwo() {
        document.getElementById("stepTwo").style.color = "#BBD5F2";
        document.getElementById("stepOne").style.color = "#DEC3E1";
        document.getElementById("behälterDiv").style.display = "none";
        document.getElementById("eissortenDiv").style.display = "contents";
        let behälter = document.createElement("img");
        behälter.setAttribute("class", "liveAnzeige");
        behälter.setAttribute("id", "behälter");
        if (localStorage.getItem("Behälter") == "Waffel") {
            behälter.setAttribute("src", "../images/WaffelAnzeige.svg");
            behälter.setAttribute("alt", "Eiswaffel");
        }
        else if (localStorage.getItem("Behälter") == "Becher") {
            behälter.setAttribute("src", "../images/BecherAnzeige.svg");
            behälter.setAttribute("alt", "Eisbecher");
        }
        bestellAnzeige.appendChild(behälter);
    }
    //#endregion
    //#region Übergang Step 2 zu 3
    let kugelCounter = 0;
    function handleAddKugel(_event) {
        kugelCounter++;
        let clickedButton = _event.target;
        let kugelIndex = parseFloat(clickedButton.getAttribute("eisindex"));
        //Kugel erstellen
        let eiskugel = document.createElement("img");
        eiskugel.setAttribute("src", Endabgabe.eisSortiment[kugelIndex].src);
        eiskugel.setAttribute("alt", Endabgabe.eisSortiment[kugelIndex].alt);
        eiskugel.setAttribute("class", "liveAnzeige");
        eiskugel.setAttribute("id", "kugel" + kugelCounter);
        bestellAnzeige.appendChild(eiskugel);
        //Local Storage
        localStorage.setItem("Kugel" + kugelCounter, kugelIndex.toString());
        if (kugelCounter == 1) {
            let weiterButton = document.createElement("button");
            document.getElementById("eissortenDiv").appendChild(weiterButton);
            weiterButton.innerHTML = "Reicht jetzt, weiter zu den Soßen";
            weiterButton.setAttribute("class", "skipButton");
            weiterButton.addEventListener("click", stepTwoToThree);
        }
        else if (kugelCounter == 4) {
            stepTwoToThree();
        }
    }
    function stepTwoToThree() {
        gesamtPreis = kugelCounter * 0.7;
        document.getElementById("stepThree").style.color = "#BBD5F2";
        document.getElementById("stepTwo").style.color = "#DEC3E1";
        document.getElementById("eissortenDiv").style.display = "none";
        document.getElementById("soßenDiv").style.display = "contents";
        console.log(gesamtPreis);
    }
    //#endregion
    //#region Step 3 zu Step 4
    document.getElementById("noSauce")?.addEventListener("click", stepThreeToFour);
    function handleAddSoße(_event) {
        gesamtPreis += 0.5;
        let clickedButton = _event.target;
        let soßenIndex = parseFloat(clickedButton.getAttribute("soßenindex"));
        //Soße erstellen
        let soße = document.createElement("img");
        soße.setAttribute("src", Endabgabe.soßenSortiment[soßenIndex].src);
        soße.setAttribute("alt", Endabgabe.soßenSortiment[soßenIndex].alt);
        soße.setAttribute("class", "liveAnzeige");
        soße.setAttribute("id", "soße" + kugelCounter);
        bestellAnzeige.appendChild(soße);
        //Local Storage
        localStorage.setItem("Soße", soßenIndex.toString());
        stepThreeToFour();
    }
    function stepThreeToFour() {
        document.getElementById("stepFour").style.color = "#BBD5F2";
        document.getElementById("stepThree").style.color = "#DEC3E1";
        document.getElementById("soßenDiv").style.display = "none";
        document.getElementById("extrasDiv").style.display = "contents";
        console.log("Preis mit Soße: " + gesamtPreis);
    }
    //#endregion
    //#region Step 4 zu 5
    document.getElementById("noExtras")?.addEventListener("click", stepFourToFive);
    function handleAddExtra(_event) {
        gesamtPreis += 0.3;
        let clickedButton = _event.target;
        let extrasIndex = parseFloat(clickedButton.getAttribute("extraindex"));
        let extra = document.createElement("img");
        extra.setAttribute("src", Endabgabe.extrasSortiment[extrasIndex].src);
        extra.setAttribute("alt", Endabgabe.extrasSortiment[extrasIndex].alt);
        extra.setAttribute("class", "liveAnzeige");
        if (extrasIndex == 1) {
            extra.setAttribute("id", "sahne" + kugelCounter);
        }
        else {
            extra.setAttribute("id", "streußel" + kugelCounter);
        }
        bestellAnzeige.appendChild(extra);
        //Local Storage
        localStorage.setItem("Extra", extrasIndex.toString());
        stepFourToFive();
    }
    function stepFourToFive() {
        document.getElementById("stepFive").style.color = "#BBD5F2";
        document.getElementById("stepFour").style.color = "#DEC3E1";
        document.getElementById("extrasDiv").style.display = "none";
        document.getElementById("formDiv").style.display = "contents";
        //Gesamtpreis ausgeben
        let gesamtPreisAusgabe = gesamtPreis.toFixed(2);
        document.getElementById("preisAnzeige").innerHTML = "Ihr Gesamtpreis beträgt: " + gesamtPreisAusgabe + "€";
    }
    //#endregion
    //#region Step 5
    document.getElementById("deleteButton")?.addEventListener("click", deleteOrder);
    function deleteOrder() {
        localStorage.clear();
        //durchläuft die Bestellanzeige und löscht die Elemente der LiveAnzeige
        while (bestellAnzeige.hasChildNodes()) {
            bestellAnzeige.removeChild(bestellAnzeige.firstChild);
        }
        //entfernt weiter-Button, der über TS generiert wird, bei den eissorten
        document.getElementById("eissortenDiv")?.removeChild(document.getElementById("eissortenDiv")?.lastChild);
        //Erste Seite wieder anzeigen
        document.getElementById("stepOne").style.color = "#BBD5F2";
        document.getElementById("stepFive").style.color = "#DEC3E1";
        document.getElementById("formDiv").style.display = "none";
        document.getElementById("behälterDiv").style.display = "contents";
        //Counter werden wieder zurückgesetzt
        gesamtPreis = 0;
        kugelCounter = 0;
    }
    Endabgabe.deleteOrder = deleteOrder;
    //#endregion
})(Endabgabe || (Endabgabe = {}));
//# sourceMappingURL=shop.js.map