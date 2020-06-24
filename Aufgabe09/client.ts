namespace A09Client {
    
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("htmlButton");
    submitButton.addEventListener("click", communicate);

    let jsonButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("jsonButton");
    jsonButton.addEventListener("click", handleJSON); 


    async function communicate(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/html" + "?" + query.toString();
        
        let response: Response = await fetch(url);
        let reply: string = await response.text();

        let paragraph: HTMLParagraphElement = document.createElement("p");
        paragraph.innerHTML = reply;
        document.body.appendChild(paragraph);


    }
    

    async function handleJSON(): Promise<void> {
        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url = url + "/json" + "?" + query.toString();

        let response: Response = await fetch(url);
        let reply: string = await response.json();
        console.log(reply);
    } 
}