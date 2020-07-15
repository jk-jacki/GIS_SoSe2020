namespace Endabgabe {

    export interface Eissorten {
        index: number;
        alt: string;
        src: string;
    }

    export let sorte01: Eissorten = {
        index: 0,
        alt: "Blaubeereis",
        src: "../images/BlaubeerEis.svg"
    };
    export let sorte02: Eissorten = {
        index: 1,
        alt: "Zitroneneis",
        src: "../images/ZitronenEis.svg"
    };
    export let sorte03: Eissorten = {
        index: 2,
        alt: "Erdbeereis",
        src: "../images/ErdbeerEis.svg"
    };
    export let sorte04: Eissorten = {
        index: 3,
        alt: "Minteis",
        src: "../images/MintEis.svg"
    };
    export let sorte05: Eissorten = {
        index: 4,
        alt: "Mangoeis",
        src: "../images/MangoEis.svg"
    };
    export let sorte06: Eissorten = {
        index: 5,
        alt: "Schlumpfeis",
        src: "../images/SchlumpfEis.svg"
    };
    export let sorte07: Eissorten = {
        index: 6,
        alt: "Schokoeis",
        src: "../images/SchokoEis.svg"
    };
    export let sorte08: Eissorten = {
        index: 7,
        alt: "Vanilleeis",
        src: "../images/VanilleEis.svg"
    };

    export let eisSortiment: Eissorten[] = [sorte01, sorte02, sorte03, sorte04, sorte05, sorte06, sorte07, sorte08];


    export interface Soßensorten {
        index: number;
        alt: string;
        src: string;
    }

    export let soße01: Soßensorten = {
        index: 0,
        alt: "Himbeersoße",
        src: "../images/HimbeerSoße.svg"
    };
    export let soße02: Soßensorten = {
        index: 1,
        alt: "Karamellsoße",
        src: "../images/CaramelSoße.svg"
    };
    export let soße03: Soßensorten = {
        index: 2,
        alt: "Erdbeersoße",
        src: "../images/ErdbeerSoße.svg"
    };
    export let soße04: Soßensorten = {
        index: 3,
        alt: "Mangosoße",
        src: "../images/MangoSoße.svg"
    };
    export let soße05: Soßensorten = {
        index: 4,
        alt: "Schokosoße",
        src: "../images/SchokoSoße.svg"
    };
    export let soße06: Soßensorten = {
        index: 5,
        alt: "Apfelsoße",
        src: "../images/ApfelSoße.svg"
    };

    export let soßenSortiment: Soßensorten[] = [soße01, soße02, soße03, soße04, soße05, soße06];

    export interface Extras {
        index: number;
        alt: string;
        src: string;
    }

    let extra01: Extras = {
        index: 0,
        alt: "Schoko Streußel",
        src: "../images/SchokoStreußel.svg"
    };
    let extra02: Extras = {
        index: 1,
        alt: "Sahne",
        src: "../images/Sahne.svg"
    };
    let extra03: Extras = {
        index: 2,
        alt: "Bunte Streußel",
        src: "../images/BunteStreußel.svg"
    };

    export let extrasSortiment: Extras[] = [extra01, extra02, extra03];

}