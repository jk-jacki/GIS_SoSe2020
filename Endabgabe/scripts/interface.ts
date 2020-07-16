namespace Endabgabe {

    export interface Sorten {
        index: string;
        alt: string;
        src: string;
    }

    let sorte01: Sorten = {
        index: "0",
        alt: "Blaubeereis",
        src: "../images/BlaubeerEis.svg"
    };
    let sorte02: Sorten = {
        index: "1",
        alt: "Zitroneneis",
        src: "../images/ZitronenEis.svg"
    };
    let sorte03: Sorten = {
        index: "2",
        alt: "Erdbeereis",
        src: "../images/ErdbeerEis.svg"
    };
    let sorte04: Sorten = {
        index: "3",
        alt: "Minteis",
        src: "../images/MintEis.svg"
    };
    let sorte05: Sorten = {
        index: "4",
        alt: "Mangoeis",
        src: "../images/MangoEis.svg"
    };
    let sorte06: Sorten = {
        index: "5",
        alt: "Schlumpfeis",
        src: "../images/SchlumpfEis.svg"
    };
    let sorte07: Sorten = {
        index: "6",
        alt: "Schokoeis",
        src: "../images/SchokoEis.svg"
    };
    let sorte08: Sorten = {
        index: "7",
        alt: "Vanilleeis",
        src: "../images/VanilleEis.svg"
    };

    export let eisSortiment: Sorten[] = [sorte01, sorte02, sorte03, sorte04, sorte05, sorte06, sorte07, sorte08];



    let soße01: Sorten = {
        index: "0",
        alt: "Himbeersoße",
        src: "../images/HimbeerSoße.svg"
    };
    let soße02: Sorten = {
        index: "1",
        alt: "Karamellsoße",
        src: "../images/CaramelSoße.svg"
    };
    let soße03: Sorten = {
        index: "2",
        alt: "Erdbeersoße",
        src: "../images/ErdbeerSoße.svg"
    };
    let soße04: Sorten = {
        index: "3",
        alt: "Mangosoße",
        src: "../images/MangoSoße.svg"
    };
    let soße05: Sorten = {
        index: "4",
        alt: "Schokosoße",
        src: "../images/SchokoSoße.svg"
    };
    let soße06: Sorten = {
        index: "5",
        alt: "Apfelsoße",
        src: "../images/ApfelSoße.svg"
    };

    export let soßenSortiment: Sorten[] = [soße01, soße02, soße03, soße04, soße05, soße06];

   

    let extra01: Sorten = {
        index: "0",
        alt: "Schoko Streußel",
        src: "../images/SchokoStreußel.svg"
    };
    let extra02: Sorten = {
        index: "1",
        alt: "Sahne",
        src: "../images/Sahne.svg"
    };
    let extra03: Sorten = {
        index: "2",
        alt: "Bunte Streußel",
        src: "../images/BunteStreußel.svg"
    };

    export let extrasSortiment: Sorten[] = [extra01, extra02, extra03];


    export interface Order {

        _id: string;
        Behälter: string;
        Kugel1: string;
        Kugel2: string;
        Kugel3: string;
        Kugel4: string;
        Soße: string;
        Extra: string;
        lastname: string;
        firstname: string;
        street: string;

    }
}