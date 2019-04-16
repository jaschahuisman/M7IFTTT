// html elementen
var geefWater = document.querySelector("#geefwater");
var image = document.querySelector('#plantenstatus img');
var cirkelStatus = document.querySelector("#plantenstatus svg path");
var menuBurger = document.querySelector('#topbar .menu');
var settings = document.querySelector('#settings');
var plantInput = settings.querySelector('#plantID')
var appInput = settings.querySelector('#appID');
var saveBtn = settings.querySelector('#save');
var resetBtn = settings.querySelector('#reset');

// configuratie
var server = "http://www.cmd.camp:12345"; // het adres van de server
var getKey = "ZM5hJfzp"; // de get key om data uit de server te halen
var sendKey = "7JrpHFhd"; // de send key om data naar de server te sturen
var frequentie = 2000; // het aantal milliseconden waarop de pagina de data herlaadt

// status
var knopClickStatus = false;
image.style.opacity = '0';

// settings toggle 
menuBurger.addEventListener('click', function(){
    settings.classList.toggle('active');
});

saveBtn.addEventListener('click', function(){
    if (plantInput.value && appInput.value){
        getKey = plantInput.value;
        sendKey = appInput.value;
        settings.classList.remove('active');
    };
});

resetBtn.addEventListener('click', function(){
    console.log("EE")
    location.reload();
});

// de functie om de data te verkrijgen
function getData() {
    // console.log('De functie getData is gestart', getKey);
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.addEventListener("load", function () { // als de request is geladen, voer dan deze functie uit
        var data = parseInt(this.responseText);
        image.style.opacity = '1';

        if (data <= 200) { // verander de voorwaarden waaraan de data moet voldoen
            // Als de ontvangen arduino waarde kleiner is dan 400, activeer de knop
            if (!knopClickStatus) {
                geefWater.innerHTML = "Geef me water.";
                geefWater.classList.remove("disabled");
                geefWater.setAttribute("onclick", `sendData(1); knopClick()`);
                cirkelStatus.classList.add("emergency");
            }
        } else if (data > 200 && data < 700) {
            // als de data niet voeldoet aan de voorwaarden, voer dan onderstaande code uit
            cirkelStatus.classList.remove("emergency");
            if (!knopClickStatus) {
                geefWater.innerHTML = "Geef me een beetje water.";
                geefWater.classList.remove("disabled");
                geefWater.setAttribute("onclick", `sendData(1); knopClick()`);
            };
        } else if (data >= 700) {
            geefWater.setAttribute("onclick", 'null');
            geefWater.classList.add("disabled");
            geefWater.innerHTML = `Vochtigheid = ${data}`;
            cirkelStatus.classList.remove("emergency");
            cirkelStatus.classList.remove("progress");
            if (knopClickStatus) {
                knopClickStatus = false;
            };
        };

        var percentage = data / 10.23;
        cirkelStatus.setAttribute("stroke-dasharray", `${percentage} 100`);
    });
    oReq.open("GET", `${server}/get/${getKey}`); // definieer het request en de server
    oReq.send(); // verstuur request
};

function knopClick() {
    geefWater.classList.add('disabled');
    cirkelStatus.classList.remove("emergency");
    cirkelStatus.classList.add("progress");
    geefWater.setAttribute("onclick", 'null');
    knopClickStatus = true;

    let waitmessage = function () { geefWater.innerHTML = "Water in laten trekken..." }
    setTimeout(waitmessage, 3000);
    geefWater.innerHTML = "Water geven...";
}

function sendData(data) {
    console.log("Senddata executed")
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.open("GET", `${server}/send/${sendKey}/${data}`); // definieer het request en de server
    oReq.send(); // verstuur request
}

window.setInterval(getData, 2000); // laad elk x aantal seconden de getData() functie
