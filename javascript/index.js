// html elementen
var geefWater = document.querySelector("#geefwater");
var image = document.querySelector('#plantenstatus img');
var cirkelStatus = document.querySelector("#plantenstatus svg path");
var menuBurger = document.querySelector('#topbar .menu');
var settings = document.querySelector('#settings');
var plantInput = document.querySelector('#plantID')
var appInput = document.querySelector('#appID');
var saveBtn = document.querySelector('#save');
var resetBtn = document.querySelector('#reset');

// configuratie
var server = "http://www.cmd.camp:12345"; // het adres van de server
var getKey = "ZM5hJfzp"; // de get key om data uit de server te halen
var sendKey = "7JrpHFhd"; // de send key om data naar de server te sturen
var frequentie = 1000; // het aantal milliseconden waarop de pagina de data herlaadt

// status
var knopClickStatus = false; // boolean
image.style.opacity = '0';

// settings toggle 
menuBurger.addEventListener('click', function(){
    settings.classList.toggle('active');
});

// sla de nieuwe settings op
saveBtn.addEventListener('click', function(){
    if (plantInput.value && appInput.value){
        getKey = plantInput.value;
        sendKey = appInput.value;
        settings.classList.remove('active');
    };
});

// reset alle instellingen naar standaard
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
        console.log(data);
        image.style.opacity = '1';

        if (data <= 50) {
            // als de ontvangen arduino waarde kleiner is dan 50, activeer de knop
            if (!knopClickStatus) {
                geefWater.innerHTML = "Geef me water.";
                geefWater.classList.remove("disabled");
                geefWater.setAttribute("onclick", `sendData(1); knopClick()`);
                cirkelStatus.classList.add("emergency");
            }
        } else if (data > 50 && data < 300) {
            // als de ontvangen arduino waarde tussen de 50 en de 300 is, activeer de knop
            cirkelStatus.classList.remove("emergency");
            if (!knopClickStatus) {
                geefWater.innerHTML = "Geef me een beetje water.";
                geefWater.classList.remove("disabled");
                geefWater.setAttribute("onclick", `sendData(1); knopClick()`);
            };
        } else if (data >= 300) {
            // als de ontvangen arduino waarde groter is dan 300, activeer de knop
            geefWater.setAttribute("onclick", 'null');
            geefWater.classList.add("disabled");
            geefWater.innerHTML = `Vochtigheid = ${data}`;
            cirkelStatus.classList.remove("emergency");
            cirkelStatus.classList.remove("progress");
            if (knopClickStatus) {
                knopClickStatus = false;
            };
        };

        // updaten van de percentagecirkel
        var percentage = (data / 6);
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
    let terugsturen = function () {
        resetData(0);
    };

    setTimeout(waitmessage, 3000);
    geefWater.innerHTML = "Water geven...";
    setTimeout(terugsturen, 5000);
}

function sendData(data) {
    console.log("Senddata executed")
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.open("GET", `${server}/send/${sendKey}/${data}`); // definieer het request en de server
    oReq.send(); // verstuur request
}

function resetData(data) {
    console.log("Senddata executed")
    var oReq = new XMLHttpRequest(); // maak een nieuw request aan
    oReq.open("GET", `${server}/send/${sendKey}/${data}`); // definieer het request en de server
    oReq.send(); // verstuur request
}

window.setInterval(getData, 2000); // laad elk x aantal seconden de getData() functie
