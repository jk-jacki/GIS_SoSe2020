namespace Endabgabe {
    //wichtige Variablen
    let gesamtPreis: number = 0;
    const bestellAnzeige: HTMLDivElement = <HTMLDivElement>document.getElementById("bestellAnzeige");


    //#region Add-Button erhalten Attribut mit Index
    //Eissorten
    const addKugelButtonList: NodeListOf<Element> = document.querySelectorAll(".addKugelButton");

    for (let index: number = 0; index < addKugelButtonList.length; index++) {
        let addKugelButton: Element = addKugelButtonList[index];
        addKugelButton.setAttribute("eisindex", index.toString());
        addKugelButton.addEventListener("click", handleAddKugel);
    }
    //Soßen
    const addSoßeButtonList: NodeListOf<Element> = document.querySelectorAll(".addSoßeButton");

    for (let index: number = 0; index < addSoßeButtonList.length; index++) {
        let addSoßeButton: Element = addSoßeButtonList[index];
        addSoßeButton.setAttribute("soßenindex", index.toString());
        addSoßeButton.addEventListener("click", handleAddSoße);
    }
    //Extras
    const addExtraButtonList: NodeListOf<Element> = document.querySelectorAll(".addExtraButton");

    for (let index: number = 0; index < addExtraButtonList.length; index++) {
        let addExtraButton: Element = addExtraButtonList[index];
        addExtraButton.setAttribute("extraindex", index.toString());
        addExtraButton.addEventListener("click", handleAddExtra);
    }
    ////#endregion

    

    //#region Übergang von Step 1 zu Step 2
    let waffel: HTMLDivElement = <HTMLDivElement>document.getElementById("chooseWaffel");
    waffel.addEventListener("click", handleWaffel);


    let becher: HTMLDivElement = <HTMLDivElement>document.getElementById("chooseBecher");
    becher.addEventListener("click", handleBecher);

    function handleWaffel(): void {
        localStorage.setItem("Behälter", "Waffel");
        stepOneToTwo();
    }

    function handleBecher(): void {
        localStorage.setItem("Behälter", "Becher");
        stepOneToTwo();
    }

    function stepOneToTwo(): void {
        document.getElementById("stepTwo")!.style.color = "#BBD5F2";
        document.getElementById("stepOne")!.style.color = "#DEC3E1";
        document.getElementById("behälterDiv")!.style.display = "none";
        document.getElementById("eissortenDiv")!.style.display = "contents";

        let behälter: HTMLImageElement = document.createElement("img");
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
    let kugelCounter: number = 0;

    function handleAddKugel(_event: Event): void {
        kugelCounter++;

        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let kugelIndex: number = parseFloat(<string>clickedButton.getAttribute("eisindex"));

        //Kugel erstellen
        let eiskugel: HTMLImageElement = document.createElement("img");
        eiskugel.setAttribute("src", eisSortiment[kugelIndex].src);
        eiskugel.setAttribute("alt", eisSortiment[kugelIndex].alt);
        eiskugel.setAttribute("class", "liveAnzeige");
        eiskugel.setAttribute("id", "kugel" + kugelCounter);
        bestellAnzeige.appendChild(eiskugel);

        //Local Storage
        localStorage.setItem("Kugel" + kugelCounter, kugelIndex.toString());
        
        if (kugelCounter == 1) {
            let weiterButton: HTMLButtonElement = document.createElement("button");
            document.getElementById("eissortenDiv")!.appendChild(weiterButton);
            weiterButton.innerHTML = "Reicht jetzt, weiter zu den Soßen";
            weiterButton.setAttribute("class", "skipButton");
            weiterButton.addEventListener("click", stepTwoToThree);
        }
        else if (kugelCounter == 4) {
            stepTwoToThree();
        }

    }

    function stepTwoToThree(): void {

        //Nicht ausgewählte Eiskugeln werden mit 5 markiert
        if (kugelCounter < 4) {
            if (kugelCounter == 1) {
                localStorage.setItem("Kugel2", "-1");
                localStorage.setItem("Kugel3", "-1");
                localStorage.setItem("Kugel4", "-1");
            }
            else if (kugelCounter == 2) {
                localStorage.setItem("Kugel3", "-1");
                localStorage.setItem("Kugel4", "-1");
            }
            else if (kugelCounter == 3) {
                localStorage.setItem("Kugel4", "-1");
            }
        }

        gesamtPreis = kugelCounter * 0.7;
        document.getElementById("stepThree")!.style.color = "#BBD5F2";
        document.getElementById("stepTwo")!.style.color = "#DEC3E1";
        document.getElementById("eissortenDiv")!.style.display = "none";
        document.getElementById("soßenDiv")!.style.display = "contents";
        console.log(gesamtPreis);
    }

    //#endregion


    //#region Step 3 zu Step 4
    document.getElementById("noSauce")?.addEventListener("click", handleNoSauce);

    function handleAddSoße(_event: Event): void {
        gesamtPreis += 0.5;

        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let soßenIndex: number = parseFloat(<string>clickedButton.getAttribute("soßenindex"));

        //Soße erstellen
        let soße: HTMLImageElement = document.createElement("img");
        soße.setAttribute("src", soßenSortiment[soßenIndex].src);
        soße.setAttribute("alt", soßenSortiment[soßenIndex].alt);
        soße.setAttribute("class", "liveAnzeige");
        soße.setAttribute("id", "soße" + kugelCounter);
        bestellAnzeige.appendChild(soße);

        //Local Storage
        localStorage.setItem("Soße", soßenIndex.toString());
        
        stepThreeToFour();
    }

    function handleNoSauce(): void {
        localStorage.setItem("Soße", "-1");
        stepThreeToFour();
    }

    function stepThreeToFour(): void {
        document.getElementById("stepFour")!.style.color = "#BBD5F2";
        document.getElementById("stepThree")!.style.color = "#DEC3E1";
        document.getElementById("soßenDiv")!.style.display = "none";
        document.getElementById("extrasDiv")!.style.display = "contents";
        console.log("Preis mit Soße: " + gesamtPreis);

    }
    //#endregion

    //#region Step 4 zu 5
    document.getElementById("noExtras")?.addEventListener("click", handleNoExtras);

    function handleAddExtra(_event: Event): void {
        gesamtPreis += 0.3;

        let clickedButton: HTMLElement = <HTMLElement>_event.target;
        let extrasIndex: number = parseFloat(<string>clickedButton.getAttribute("extraindex"));

        let extra: HTMLImageElement = document.createElement("img");
        extra.setAttribute("src", extrasSortiment[extrasIndex].src);
        extra.setAttribute("alt", extrasSortiment[extrasIndex].alt);
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

    function handleNoExtras(): void {
        localStorage.setItem("Extra", "-1");
        stepFourToFive();
    }

    function stepFourToFive(): void {
        document.getElementById("stepFive")!.style.color = "#BBD5F2";
        document.getElementById("stepFour")!.style.color = "#DEC3E1";
        document.getElementById("extrasDiv")!.style.display = "none";
        document.getElementById("formDiv")!.style.display = "contents";
        
        //Gesamtpreis ausgeben
        let gesamtPreisAusgabe: string  = gesamtPreis.toFixed(2);
        document.getElementById("preisAnzeige")!.innerHTML = "Ihr Gesamtpreis beträgt: " + gesamtPreisAusgabe + "€";
    }
    
    //#endregion


    //#region Step 5
    document.getElementById("deleteButton")?.addEventListener("click", deleteOrder);

    export function deleteOrder(): void {
        localStorage.clear();

        //durchläuft die Bestellanzeige und löscht die Elemente der LiveAnzeige
        while (bestellAnzeige.hasChildNodes()) { 
            bestellAnzeige.removeChild(<Node>bestellAnzeige.firstChild);
        }

        //entfernt weiter-Button, der über TS generiert wird, bei den eissorten
        document.getElementById("eissortenDiv")?.removeChild(<Node>document.getElementById("eissortenDiv")?.lastChild);
        
        //Erste Seite wieder anzeigen
        document.getElementById("stepOne")!.style.color = "#BBD5F2";
        document.getElementById("stepFive")!.style.color = "#DEC3E1";
        document.getElementById("formDiv")!.style.display = "none";
        document.getElementById("behälterDiv")!.style.display = "contents";

        //Counter werden wieder zurückgesetzt
        gesamtPreis = 0;
        kugelCounter = 0;
    }

    //#endregion
}