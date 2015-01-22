/**
 * Created by marigjeiloweberg on 24.11.14.
 */


/**Timer funksjoner*/
var minutes = '';
var totalMinutes = 0;
var time =0;
function startTimer(timeScience) {
    minutes = timeScience;
    setInterval(setTime, 1000);
}
function setTime(){
    ++totalMinutes;
    time = totalMinutes/60;
    minutes.innerHTML = pad(parseInt(time));
}

function timeLeft(){
    var timeLeft = 45 - time;
    commsCheck = false;
    dataCheck = false;
    oxygenCheck = true;
    if(parseFloat(contains(document.getElementById('oksygenTime').value)) - timeLeft < 4){
        document.getElementById('secure_task').style.color = "limeGreen";
        document.getElementById('oksygenTime').style.backgroundColor = "indianred";
        document.getElementById('soundRed').play();
        document.getElementById('secure_task').style.color = "red";
        document.getElementById('secure_task').innerHTML = "Kontakt kommunikasjonsteamet!";
    }

    else if(parseFloat(contains(document.getElementById('oksygenTime').value)) - timeLeft >= 4 && parseFloat(contains(document.getElementById('oksygenTime').value)) - timeLeft < 5){
        document.getElementById('secure_task').style.color = "limegreen";
        document.getElementById('oksygenTime').style.backgroundColor = "orange";
        document.getElementById('taskSecSound').play();
        setTimeout(function(){newTask('secure_task',"Følg med på CO2 nivået, blir verdien over 25% ta kontakt med kommunikasjonsteamet og be om at skrubfilteret byttes.")}, 3000);
        document.getElementById('secure_task').innerHTML = "Følg med på CO2 nivået, blir verdien over 25% ta kontakt med kommunikasjonsteamet og be om at skrubfilteret byttes.";
    }
    else {
        document.getElementById('secure_task').style.color = "limegreen";
        document.getElementById('oksygenTime').style.backgroundColor = "limegreen";
        document.getElementById('taskSecSound').play();
        setTimeout(function () {
            newTask('secure_task', "Følg med på CO2 nivået, blir verdien over 25% ta kontakt med kommunikasjonsteamet og be om at skrubfilteret byttes.")
            }, 3000);
    }
}

function pad(val){
    var valString = val + "";
    if(valString.length < 2){
        return "0" + valString + "min";
    }
    else{
        return valString + "min";
    }
}
/** Nedtellings funksjoner*/
var seconds = '';
var totalSec = 0;
var lastTotalSec = 0;

function startCountDown(secondsLabel, totalsecNew){
    totalSec = totalsecNew;
    lastTotalSec = totalsecNew;
    countOff = false;
    seconds = secondsLabel;
    this.timer = setInterval(setSec, 1000);

    if(secondsLabel.id === 'pustCountDown'){
        document.getElementById('breathSound').play();
    }
   else if(secondsLabel.id === 'heartCountDown'){
        document.getElementById('heartSound').play();
    }
    else if(secondsLabel.id === 'countDown'){
        document.getElementById('geigerSound').play();
    }
}
function setSec(){
    --totalSec;
    seconds.innerHTML = createText(totalSec%60);
}
var countOff = false;
/**Hjelpe funksjon*/
function newTask(elem, text){
    document.getElementById(elem).style.color = "black";
    document.getElementById(elem).innerHTML = text;

}
/**Lager oppgave tekster som presenteres når klokken har tellt ned til 0 */
function createText(val){

    var valText = val + "";
    if(valText.length < 2 && countOff === false){
        return "0" + valText + "sek";
    }
    else if( val < 0){



      if(seconds.id === 'pustCountDown' ){

            document.getElementById('task_astro').style.color = "limegreen";
            document.getElementById('breathSound').pause();
            document.getElementById('taskAstroSound').play();
            setTimeout(function(){newTask('task_astro',"Regn ut antall innpust astronauten vil utføre i løpet av 60sek. Hint:(60/15 x antall innpust)" )}, 3000);
            setTimeout(function(){task3()}, 120000)
        }
        else if(seconds.id === 'heartCountDown' ){
          document.getElementById('task_astro').style.color = "limegreen";
          document.getElementById('heartSound').pause();
          document.getElementById('taskAstroSound').play();
          setTimeout(function(){newTask('task_astro', "Regn ut antall hjerteslag astronauten vil ha i løpet av 60sek. Hint:(60/10 x antall hjerteslag)")}, 3000);
        }
        else if(seconds.id === 'countDown' ){
          document.getElementById('geigerSound').pause();
        }
        clearInterval(this.timer);
        return lastTotalSec + "sek";
    }
    else if(valText.length === 2 && countOff ===false){
        return valText + "sek";
    }
}



/** Security team*/
var value = '';
var totalValue;
var ok;
var commsCheck = false;
var dataCheck = false;
var oxygenCheck = false;
/**Generer oppgave 2 for sikkerhetsteamet.*/
function task2Security(){
    document.getElementById('secure_task').style.color = "limegreen";
    document.getElementById('taskSecSound').play();
    setTimeout(function(){newTask('secure_task', "Test kommunikasjonstatusen til satelitten.")}, 3000);
}
/**setter verdier på progressbaren*/
function startTest(valueLabel, check){
        document.getElementById('comms_btn').disabled = true;
        document.getElementById('data_btn').disabled = true;
        if(valueLabel.id === 'data'){
            document.getElementById('dataSound').play();
        }
        else if(valueLabel.id === 'comms'){
            document.getElementById('commsSound').play();
        }
        value = valueLabel;
        totalValue = 0;
        this.values = setInterval(setValue, 100);
        ok = check;
}
/**Plaseerer verdien på progressbaren*/
function setValue(){
    ++totalValue;
    value.innerHTML = makeValueLabel(parseInt(totalValue));
    if(value.innerHTML === "Feilet!" || value.innerHTML === "OK!"){
        document.getElementById('dataSound').pause();
        document.getElementById('commsSound').pause();
      setTimeout(function(){clearProgressbar()}, 20000);
    }


}
/**lager verdien på progressbaren*/
function makeValueLabel(val){
    var valString = val + "";
    value.style.width = valString + "%";
    if(val === 100 && ok){
        value.style.backgroundColor = "green";
        clearInterval(this.values);
        if(value.id === "comms"){
            document.getElementById('secure_task').style.color = "limegreen";
            commsCheck = true;
            dataCheck = false;
            oxygenCheck = false;
            document.getElementById('taskSecSound').play();
            setTimeout(function(){newTask('secure_task',"Test datakvaliteten.")}, 3000);
        }
        else if(value.id === "data"){
            document.getElementById('secure_task').style.color = "limegreen";
            commsCheck = false;
            dataCheck = true;
            oxygenCheck = false;
            document.getElementById('taskSecSound').play();
            setTimeout(function(){newTask('secure_task',"Før inn %oksygen forbruk pr minutt som dere får oppgitt fra astronautteamet.")}, 3000);
            setTimeout(function () { document.getElementById('secure_task').innerHTML = "Regn ut hvor mange minutter oksyget som er igjen i tanken vil holde til. Hint:(%oksygen igjen/%oksygenforbruk pr min)" ;}, 20000);
        }
        return "OK!";
    }
    else if (val === 100 && !ok){
        if(value.id === "comms"){
            document.getElementById('secure_task').style.color = "limegreen";
            commsCheck = true;
            dataCheck = false;
            oxygenCheck = false;
            document.getElementById('taskSecSound').play();
            setTimeout(function(){newTask('secure_task',"Test datakvaliteten.")}, 3000);
        }
        else if(value.id === "data"){
            document.getElementById('secure_task').style.color = "limegreen";
            commsCheck = false;
            dataCheck = true;
            oxygenCheck = false;
            document.getElementById('taskSecSound').play();
            setTimeout(function(){newTask('secure_task',"Før inn %oksygen forbruk pr minutt som dere får oppgitt fra astronautteamet.")}, 3000);
            setTimeout(function () { document.getElementById('secure_task').innerHTML = "Regn ut hvor mange minutter oksyget som er igjen i tanken vil holde til. Hint:(%oksygen igjen/%oksygenforbruk pr min)" ;}, 20000);
        }
        document.getElementById('secure_task').style.color = "limegreen";
        value.style.backgroundColor = "indianred";
       clearInterval(this.values);
        document.getElementById('soundRed').play();
        document.getElementById('secure_task').style.color = "red";
        document.getElementById('secure_task').innerHTML = "Kontakt kommunikasjonsteamet!";
        return"Feilet!";

    }
    else {
        return valString + "%";
    }
}
/**Setter oppgaver for når sikkerhetsteamet når de avslutter en samtale.*/
function setSecurityTask(){
    if(commsCheck){
        document.getElementById('secure_task').style.color = "limegreen";
        document.getElementById('taskSecSound').play();
        setTimeout(function(){newTask('secure_task',"Test datakvaliteten.")}, 3000);
    }
    else if(dataCheck){
        document.getElementById('secure_task').style.color = "limegreen";
        document.getElementById('taskSecSound').play();
        setTimeout(function(){newTask('secure_task',"Før inn %oksygen forbruk pr minutt som dere får oppgitt fra astronautteamet.")}, 3000);
        setTimeout(function () { document.getElementById('secure_task').innerHTML = "Regn ut hvor mange minutter oksyget som er igjen i tanken vil holde til. Hint:(%oksygen igjen/%oksygenforbruk pr min)" ;}, 20000);
    }
    else if(oxygenCheck){
        document.getElementById('secure_task').style.color = "limegreen";
        document.getElementById('taskSecSound').play();
        setTimeout(function(){newTask('secure_task',"Følg med på CO2 nivået, blir verdien over 25% ta kontakt med kommunikasjonsteamet og be om at skrubfilteret byttes.")}, 3000);
    }
}
/**Tilbakestiller progressbarene*/
function clearProgressbar(){
  value.innerHTML = "0%";
  value.style.width = (0 + "%");
  value.style.backgroundColor = "#4286ca";
  document.getElementById('comms_btn').disabled = false;
  document.getElementById('data_btn').disabled = false;

}
/**Gir ut bildene av oksygentankens status etterhverandre.*/
var count_pic = 0;
function updateOksygenTank(){

    x = xmlDoc.getElementsByTagName("PICTURE");
    document.getElementById("oksygentank").src = x[0].getElementsByTagName("URL")[count_pic].innerHTML;
    updatePic();

}

function updatePic () {
    if(count_pic < 7) {
        count_pic++;
    }
    else{
        count_pic = 0;
    }

}

var xmlDoc=loadXMLDoc("config.xml");

/** Lese fra XML config filen*/
function loadXMLDoc(filename)
{
    if (window.XMLHttpRequest)
    {
        xhttp=new XMLHttpRequest();
    }
    else // code for IE5 and IE6
    {
        xhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xhttp.open("GET",'config.xml',false);
    xhttp.send();
    return xhttp.responseXML;
}


/** Science team*/

var count = 0;
/**Gir ut noen ferdig definerte test verdier fra stårlingsgrafen*/
function takeTests(){

    var test1 = document.getElementById('test1');
    var test2 = document.getElementById('test2');
    var test3 = document.getElementById('test3');
    var test4 = document.getElementById('test4');

    x=xmlDoc.getElementsByTagName("TEST");


       if(count === 0){
           test1.value = x[0].getElementsByTagName("VALUE")[count].innerHTML;
           count++;

       }
       else if(count === 1){
           test2.value = x[0].getElementsByTagName("VALUE")[count].innerHTML;
           count++;
       }
       else if(count === 2){
           test3.value = x[0].getElementsByTagName("VALUE")[count].innerHTML;
           count++;

       }
       else if(count === 3){
           document.getElementById('task_Science').style.color = "limegreen";
           test4.value = x[0].getElementsByTagName("VALUE")[count].innerHTML;
           count = 0;
           document.getElementById('taskSound').play();
           setTimeout(function(){newTask('task_Science',"Regn ut og evaluer gjennomsnittet av de fire målingene som ble tatt.")}, 3000);
       }

}

function contains(elem) {
    return elem.replace(/[,.]/g, function (x) {
        return x == "," ? "." : ",";
    });
}

var orangeNum = 0;
var radiation1 = false;
var bodyradiation = false;
/**Sjekker den gjennomsnitlige stårlingen*/
function radiation(elem){
    if(elem){

    }
    radiation1 = true;
    bodyradiation = false;
    var value = contains(elem.value);
    x = xmlDoc.getElementsByTagName("RADIATION");

    if(value < parseInt(x[0].getElementsByTagName("VALUE")[0].innerHTML)){
        document.getElementById('task_Science').style.color = "limegreen";
        elem.style.background = "limegreen";
        //elem.value = value;
        orangeNum = 0
        document.getElementById('taskSound').play();
        setTimeout(function(){newTask('task_Science',"Legg til 0 på det total strålingsnivået astronauten har blitt utsatt for.")}, 3000);
    }
    else if (value >= parseInt((x[0].getElementsByTagName("VALUE")[0].innerHTML)) && value < parseInt( x[0].getElementsByTagName("VALUE")[1].innerHTML)){
        elem.style.background="orange";
        if(orangeNum === 2){
            document.getElementById('sound').play();
            elem.style.background = "indianred";
            document.getElementById('task_Science').style.color = "red";
            document.getElementById('task_Science').innerHTML = "Kontakt sikkerhetsteamet!";
            orangeNum = 0;
        }
        else {
            document.getElementById('task_Science').style.color = "limegreen";
            orangeNum++;
            document.getElementById('taskSound').play();
            setTimeout(function(){newTask('task_Science',"Legg til 15 på det total strålingsnivået astronauten har blitt utsatt for.")}, 3000);
        }
    }
    else if(value >= parseInt( x[0].getElementsByTagName("VALUE")[1].innerHTML)){
        elem.style.background="indianred";
        document.getElementById('sound').play();
        orangeNum = 0;
        document.getElementById('task_Science').style.color = "red";
        document.getElementById('task_Science').innerHTML = "Kontakt sikkerhetsteamet!";
    }
}
/**Sjekker stårlingsverdien i kroppen*/
function radiationBody(elem){
    bodyradiation = true;
    radiation1 = false;
    x = xmlDoc.getElementsByTagName("RADBODY");
    var value = contains(elem.value);

    if(value < parseInt(x[0].getElementsByTagName("VALUE")[0].innerHTML)){
        document.getElementById('task_Science').style.color = "limegreen";
        elem.style.background = "limegreen";
        document.getElementById('taskSound').play();
        setTimeout(function(){newTask('task_Science',"Start klokken og ta 4 målinger gjevntfordelt i løpet av de 30 sekundene.")}, 3000);
    }
    else if (value > parseInt((x[0].getElementsByTagName("VALUE")[0].innerHTML)) && value < parseInt( x[0].getElementsByTagName("VALUE")[1].innerHTML)){
        document.getElementById('task_Science').style.color = "limegreen";
        elem.style.background = "orange";
        document.getElementById('taskSound').play();
        setTimeout(function(){newTask('task_Science',"Start klokken og ta 4 målinger gjevntfordelt i løpet av de 30 sekundene.")}, 3000);
    }
    else if(value > parseInt( x[0].getElementsByTagName("VALUE")[1].innerHTML) ){
        elem.style.background = "indianred";
        document.getElementById('sound').play();
        document.getElementById('clock_btn').disabled = true;
        document.getElementById('average_radiation').disabled = true;
        document.getElementById('body_radiation').disabled = true;
        document.getElementById('sample_btn').disabled = true;

        document.getElementById('task_Science').innerHTML = "SVÆRT FARLIG STÅRLINGSNIVÅ! MELD FRA TIL SIKKERHETSTEAMET. OPPDRAGET MÅ KANSKJE AVBRYTES.";
        document.getElementById('task_Science').style.color = "red";
    }
}
/**Gir ut riktig oppgave til forsknings teamet etter at de har ringt.*/
function setScienceTask(){
    if(radiation1){
        document.getElementById('task_Science').style.color = "limegreen";
        document.getElementById('taskSound').play();
        setTimeout(function(){newTask('task_Science',"Legg til 50 på det total strålingsnivået astronauten har blitt utsatt for.")}, 3000);
    }
    else if(bodyradiation){
        document.getElementById('task_Science').style.color = "limegreen";
        document.getElementById('taskSound').play();
        setTimeout(function(){newTask('task_Science',"Start klokken og ta 4 målinger gjevntfordelt i løpet av de 30 sekundene.")}, 3000);
    }
}

/**Astronaut support team*/
var heartcheck= false;
var respiratincheck = false;

/**Lager oppgave 3 til astronaut skjermen*/
function task3(){
    document.getElementById('task_astro').style.color = "limegreen";
    document.getElementById('taskAstroSound').play();
    setTimeout(function(){newTask('task_astro',"Regn ut og evaluer oksygenforbruket pr minutt i %. Gjennomsnittlig oksygenforbruk med 25 innpust er 0,5%. Hint:(antall innpust pr minutt / (25/0.5))")}, 3000);
}

/**Sjekker respirasjonen*/
function respiration(value){
    respiratincheck = true;
    heartcheck = false;
    x = xmlDoc.getElementsByTagName("RESPIRATION");
    var elem = document.getElementById('o2Used');
    if(parseFloat(contains(value)) < parseFloat(x[0].getElementsByTagName("VALUE")[0].innerHTML)){
        document.getElementById('task_astro').style.color = "limegreen";
        elem.style.background = "limegreen";
        elem.value = value;
        document.getElementById('taskAstroSound').play();
        setTimeout(function(){newTask('task_astro',"Start klokken og tell antall hjerteslag(spisse topper) det er i løpet av 10 sekunder.")}, 3000);
    }
    else{
        elem.style.background = "indianred";
        document.getElementById('sound').play();
        elem.value = value;
        document.getElementById('task_astro').style.color = "red";
        document.getElementById('task_astro').innerHTML = "Kontakt sikkerhetsteamet!"
    }
}
/**Sjekker hjertefrekvensen*/
function heartRate(value){
    respiratincheck = false;
    heartcheck = true;
    var elem = document.getElementById('heart');
    x = xmlDoc.getElementsByTagName("HEART");
    if(parseFloat(contains(value)) < parseFloat(x[0].getElementsByTagName("VALUE")[0].innerHTML)){
        document.getElementById('task_astro').style.color = "limegreen";
        elem.style.background = "limegreen";
        elem.value = value;
        document.getElementById('taskAstroSound').play();
        setTimeout(function(){newTask('task_astro',"Start klokken, og tell antall innpust (topper) på pustegrafen.")}, 3000);
    }
    else if(parseFloat(contains(value)) >= parseFloat(x[0].getElementsByTagName("VALUE")[0].innerHTML) && parseFloat(contains(value)) < parseFloat(x[0].getElementsByTagName("VALUE")[1].innerHTML)){
        document.getElementById('task_astro').style.color = "limegreen";
        document.getElementById('taskAstroSound').play();
        elem.style.background = "orange";
        elem.value = value;
        setTimeout(function(){newTask('task_astro',"Start klokken, og tell antall innpust (topper) på pustegrafen.")}, 3000);
    }
    else {

        elem.style.background = "indianred";
        elem.value = value;
        document.getElementById('sound').play();
        document.getElementById('task_astro').style.color = "red";
        document.getElementById('task_astro').innerHTML = "Kontakt sikkerhetsteamet!"
    }
}
/**Setter Astronaut oppgaver etter at man har ringt.*/
function setAstroTask(){
    if(heartcheck){
        document.getElementById('task_astro').style.color = "limegreen";
        document.getElementById('taskAstroSound').play();
        setTimeout(function(){newTask('task_astro',"Start klokken, og tell antall innpust (topper) på pustegrafen.")}, 3000);
    }
    else if(respiratincheck){
        document.getElementById('task_astro').style.color = "limegreen";
        document.getElementById('taskAstroSound').play();
        setTimeout(function(){newTask('task_astro',"Start klokken og tell antall hjerteslag(spisse topper) det er i løpet av 10 sekunder.")}, 3000);
    }
}
var y = 0;
/**Leser inn og setter noen ferdig definerte oksygen verdier*/
function oksygenLeft(){
    x = xmlDoc.getElementsByTagName("OKSYGENLEFT");
    if(y < 7){
        document.getElementById('oksygenLeft').value = x[0].getElementsByTagName('VALUE')[y].innerHTML;
        y++;
    }
    else{
        y = 0;
    }
}
/**Communication*/
var frekvensOmraade = '';
var satName = '';

/**Holder orden på hvilken satelitt som er valgt*/
function chooseSatelitt(sat) {
    document.getElementById('comms_task').style.color = "limegreen";
    if(sat === "sat1" ){
        frekvensOmraade = document.getElementById('satelitt1');
        satName = "Satelitt 1";
    }
    else if(sat === "sat2"){
        frekvensOmraade = document.getElementById('satelitt2');
        satName = "Satelitt 2";
    }
    else if(sat === "sat3"){
        frekvensOmraade = document.getElementById('satelitt3');
        satName = "Satelitt 3";
    }
    document.getElementById('taskCommsSound').play();
    setTimeout(function(){newTask('comms_task',"Sett en frekvens for den valgte satelitten(Median av frekvensomårde).")}, 3000);
}
/**Sjekker gyldigheten av det valgte frekvens område*/
function satelitt(value){
    var frekvens = 0;
    var frekMin = 0;
    var frekMax = 0;

    frekMin = frekvensOmraade.innerHTML.charAt(0) + frekvensOmraade.innerHTML.charAt(1) + frekvensOmraade.innerHTML.charAt(2);
    frekMax = frekvensOmraade.innerHTML.charAt(6) + frekvensOmraade.innerHTML.charAt(7) + frekvensOmraade.innerHTML.charAt(8);
    frekvens = Math.round(((parseFloat(frekMax) + parseFloat(frekMin))/2)*10)/10;


    if(parseFloat(contains(value)) === frekvens){
        document.getElementById('comms_task').style.color = "limegreen";
        document.getElementById('frekvens').style.background = "limegreen";
        document.getElementById('satLabel').innerHTML = 'Tilkoblet: '  + satName;
        document.getElementById('taskCommsSound').play();
        document.getElementById('satLabel').style.color = "black";
        setTimeout(function(){newTask('comms_task',"Velg den satelitten med best signal.")}, 3000);
    }
    else if(parseFloat(contains(value)) >= frekMin && parseFloat(contains(value)) <= frekMax){
        document.getElementById('comms_task').style.color = "limegreen";
        document.getElementById('frekvens').style.background = "orange";
        document.getElementById('satLabel').innerHTML = 'Tilkoblet: ' + satName;
        document.getElementById('taskCommsSound').play();
        document.getElementById('satLabel').style.color = "black";
        setTimeout(function(){newTask('comms_task',"Velg den satelitten med best signal.")}, 3000);
    }
    else{
        document.getElementById('frekvens').style.background = "indianred";
        document.getElementById('satLabel').innerHTML = 'Kan ikke koble til';
        document.getElementById('satLabel').style.color = "red";
        document.getElementById('sound').play();
    }
}
/**Gir ut noen tilfeldige satelitt signaler*/
function newSateliteValue(){
    x = xmlDoc.getElementsByTagName("SATELITT");
     document.getElementById('satelit_1').style.marginTop = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
     document.getElementById('satelit_2').style.marginTop = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
     document.getElementById('satelit_3').style.marginTop = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
     document.getElementById('satelliteSound').play();
}
/**Gir ut noen tilfeldige frekvens verdier*/
function newFrekvens(){
    x = xmlDoc.getElementsByTagName("FREKVENS");
    document.getElementById('satelitt1').innerHTML = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
    document.getElementById('satelitt2').innerHTML = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
    document.getElementById('satelitt3').innerHTML = x[0].getElementsByTagName('VALUE')[Math.floor((Math.random() * 10) + 1)].innerHTML;
}


