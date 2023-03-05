import Timer from "./timer.js";

const tempoDisplay = document.querySelector('.tempo');
const tempoSlider = document.querySelector('.slider');
const tempoDecrease = document.querySelector('.decrease');
const tempoIncrease = document.querySelector('.increase');
const startStop = document.querySelector('.startStop');
const measureCount = document.querySelector('.measure-count');
const subtractBeats = document.querySelector('.subtract-steppers');
const addBeats = document.querySelector('.add-steppers');

const click1 = new Audio('Click1.mp3');
const click2 = new Audio('Click2.mp3');


let bpm = 140;
let beatsPerMeasure = 4;
let count = 0;
let isRunning = false;

tempoDecrease.addEventListener("click", () => {
    if (bpm <= 20) {
        return;
    }
    bpm--;
    return updateTempo();
});
tempoIncrease.addEventListener("click", () => {
    if (bpm >= 280) {
        return;
    }
    bpm++;
    return updateTempo();

});
tempoSlider.addEventListener("change", () => {
    bpm = tempoSlider.value;
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
});

subtractBeats.addEventListener("click", () => {
    if (beatsPerMeasure <= 1) {return};
    beatsPerMeasure--;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});
addBeats.addEventListener("click", () => {
    if (beatsPerMeasure >= 19) {return}
    beatsPerMeasure++;
    measureCount.textContent = beatsPerMeasure;
    count = 0;
});

startStop.addEventListener("click", () => {
    count = 0;
    if (!isRunning) {
        metronome.start();
        isRunning = true;
        startStop.textContent = "STOP";
    } else {
        metronome.stop();
        isRunning = false;
        startStop.textContent = "START"; 
    }

})

function updateTempo() {
    tempoDisplay.textContent = bpm;
    tempoSlider.value = bpm;
    metronome.timeInterval = 60000 / bpm;

};

function playClick() {

    if (count === beatsPerMeasure) {
        click1.play();
    } else if (count === 0) {
        click1.play();
        
    } else {
        click2.play();
        click2.currentTime = 0;
        count = 0;   //this was added just now. creates click2 on count 1
    }
    count++;
}

const metronome = new Timer(playClick, 60000 / bpm, {immediate: true}); 



//click2 keeps going on count 1 after first iteration
//slider doesn't affect the tempo immediately after sliding. I HAVE to press down on the + or - side button
//tried an else if on the second statement with click2. loop ends after count/beats iteration.