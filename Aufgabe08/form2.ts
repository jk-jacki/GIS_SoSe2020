namespace A08Server {
    
    let submitButton: HTMLButtonElement = <HTMLButtonElement>document.getElementById("submitButton");
    submitButton.addEventListener("click", communicate);

    async function communicate(): Promise<void> {

        let formData: FormData = new FormData(document.forms[0]);
        let url: string = "https://gissose2020jacquelinekoch.herokuapp.com/";
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        url += url + "?" + query.toString();
        await fetch(url);

        console.log(url);
    }
    
}