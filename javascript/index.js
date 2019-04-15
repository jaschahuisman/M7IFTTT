// html elementen


// configuratie
var server = "http://www.cmd.camp:12345"; // het adres van de server
var getKey = "2aQEMEDk"; // de get key om data uit de server te halen
var sendKey = "3TMw3wYR"; // de send key om data naar de server te sturen
var frequentie = 2000; // het aantal milliseconden waarop de pagina de data herlaadt

window.setInterval(getData(getKey), frequentie); // laad elk x aantal seconden de getData() functie

// de functie om de data te verkrijgen
function getData(getKey) {
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.addEventListener("load", function () { // als de request is geladen, voer dan deze functie uit
        var data = this.responseText;
        if (data) { // verander de voorwaarden waaraan de data moet voldoen
            // als de data voeldoet aan de voorwaarden, voer dan onderstaande code uit

        } else {
            // als de data niet voeldoet aan de voorwaarden, voer dan onderstaande code uit yup

        };
    });
    oReq.open("GET", `${server}/get/${getKey}`); // definieer het request en de server
    oReq.send(); // verstuur request
};

function sendData(sendKey, data) {
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.open("GET", `${server}/send/${sendKey}/${data}`); // definieer het request en de server
    oReq.send(); // verstuur request
}
