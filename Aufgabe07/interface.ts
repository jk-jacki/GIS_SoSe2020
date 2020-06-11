namespace Aufgabe07 {
    export interface ShopArtikel {
        kategorie: number; //1 = new; 2 = bestseller; 3 = old
        name: string;
        image: string;
        preis: number;
        beschreibung: string;
    }
    export let sortiment: ShopArtikel[];

    
}