namespace Aufgabe05 {
    //DOM-Manipulation

    const newTag: HTMLElement = document.getElementById("new") as HTMLDivElement;
    const bestsellerTag: HTMLElement = document.getElementById("bestseller") as HTMLDivElement;
    const oldTag: HTMLElement = document.getElementById("old") as HTMLDivElement;

    createTags();

    //DOM-Aufbau
    function createTags(): void {

        for (let index: number = 0; index < sortiment.length; index++) {

            let div: HTMLDivElement = document.createElement("div");
            div.setAttribute("class", "imgcontainer");

            if (sortiment[index].kategorie == 1) { //hängt an id="new" an
                newTag.appendChild(div);
            }
            else if (sortiment[index].kategorie == 2) {
                bestsellerTag.appendChild(div);
            }
            else { //hängt an id="old" an
                oldTag.appendChild(div);
            }
            
            let h3: HTMLHeadingElement = document.createElement("h3");
            div.appendChild(h3).innerHTML = sortiment[index].name;

            let img: HTMLImageElement = document.createElement("img");
            img.setAttribute("src", sortiment[index].image);
            img.setAttribute("alt", sortiment[index].name);
            div.appendChild(img);

            let pPrice: HTMLParagraphElement = document.createElement("p");
            pPrice.setAttribute("class", "price");
            div.appendChild(pPrice).innerHTML = "Preis: " + sortiment[index].preis + " €";

            let pDescription: HTMLParagraphElement = document.createElement("p");
            pDescription.setAttribute("class", "beschreibung");
            div.appendChild(pDescription).innerHTML = sortiment[index].beschreibung;

            let button: HTMLButtonElement = document.createElement("button");
            button.addEventListener("click", handleKaufenClick);
            div.appendChild(button).innerHTML = "In den Einkaufswagen";
        }
    }

    function handleKaufenClick(_event: Event): void {
        //Zähler auf Carticon
        warenkorbZahl++; 
        zaehler.innerHTML = warenkorbZahl + "";
        document.getElementById("cart")?.appendChild(zaehler);

        //Get Preis
        let preisString: string = "";
        if (_event.target != null) {
            let clickedButton: HTMLElement = <HTMLElement> _event.target;
            if (clickedButton.previousSibling!.previousSibling!.firstChild!.nodeValue != undefined) {
                preisString = clickedButton.previousSibling!.previousSibling!.firstChild!.nodeValue;
                preisString = preisString.substring(7, preisString.length - 2);               
            }          
        }

        //Gesamtpreisermittlung
        warenkorbPreis += parseFloat(preisString);
        console.log("Ihr Warenkorb beträgt: " + warenkorbPreis + " €");       
    }


    
}