// html elementen
var geefWater = document.querySelector ("#geefwater");


// configuratie
var server = "http://www.cmd.camp:12345"; // het adres van de server
var getKey = "ZM5hJfzp"; // de get key om data uit de server te halen
var sendKey = "7JrpHFhd"; // de send key om data naar de server te sturen
var frequentie = 2000; // het aantal milliseconden waarop de pagina de data herlaadt



// de functie om de data te verkrijgen
function getData() {
    console.log('De functie getData is gestart', getKey);
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.addEventListener("load", function () { // als de request is geladen, voer dan deze functie uit
        var data = this.responseText;

        console.log(data);

        if (data == "0" ) { // verander de voorwaarden waaraan de data moet voldoen
            geefWater.addEventListener("click", function (){
                console.log("DATA IS VERSTUURD DOOR DE KNOP")
                sendData(1);
            })

            // enable button geefwater

        } else {
            // als de data niet voeldoet aan de voorwaarden, voer dan onderstaande code uit yup

        };
    });
    oReq.open("GET", `${server}/get/${getKey}`); // definieer het request en de server
    oReq.send(); // verstuur request
};

function sendData(data) {
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.open("GET", `${server}/send/${sendKey}/${data}`); // definieer het request en de server
    oReq.send(); // verstuur request
}

window.setInterval(getData, 2000); // laad elk x aantal seconden de getData() functie
