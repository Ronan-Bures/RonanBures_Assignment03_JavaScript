/*----------Dark Mode Interaction ---------- */
const darkModeToggle = document.getElementById('darkModeToggle');
darkModeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');

    //change icon when dark mode is active
    if (document.body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = 'light_mode';
        console.log("Dark Mode");
    } else {
        darkModeToggle.textContent = 'dark_mode';
        console.log("Light Mode");
    }
});

/* ----------Reset/Refresh Interaction ----------*/
const refreshButton = document.getElementById('refreshButton');
refreshButton.addEventListener('click', function() {
    location.reload();
});


/*----------PitchSlider in grid-item1----------*/
//Pitch Slider
const pitchSlider = document.getElementById('pitchSlider');
const pitchValue = document.getElementById('pitchValue');

pitchSlider.addEventListener('input', function() {
    const newPitch = parseFloat(pitchSlider.value);
    audio.playbackRate = newPitch;   // changes pitch
    pitchValue.textContent = newPitch.toFixed(2);

    console.log("Pitch set to:", newPitch);
});


/*----------Button in grid-item2----------*/
const audio = document.getElementById('mySound');
const playpauseButton = document.getElementById('playpauseButton');
const PlayPauseText = document.getElementById('PlayPauseText');

//Button Interaction Event
playpauseButton.addEventListener('click', function() {
    if (audio.paused) {
        audio.play();
        playpauseButton.textContent = 'radio_button_checked';
        PlayPauseText.textContent = 'Sound is Playing';
        console.log("Sound is Playing");
    } else {
        audio.pause();
        playpauseButton.textContent = 'radio_button_unchecked';
        PlayPauseText.textContent = '';
        console.log("Sound is Paused");
    }
});

/*-----------Crank in grid-item3----------*/
const crank = document.getElementById("crank");
let isDragging = false;
let lastAngle = 0;
let lastTime = 0;

crank.addEventListener("mousedown", startCrank);
document.addEventListener("mousemove", crankMove);
document.addEventListener("mouseup", stopCrank);


function getAngleFromCenter(e) {
    const rect = crank.parentElement.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - (rect.left + rect.width / 2);
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - (rect.top + rect.height / 2);
    return Math.atan2(y, x) * (180 / Math.PI);
}

function startCrank(e) {
    isDragging = true;
    lastAngle = getAngleFromCenter(e);
    lastTime = performance.now();
}

function crankMove(e) {
    if (!isDragging) return;

    const angle = getAngleFromCenter(e);
    const now = performance.now();

    crank.style.transform = `rotate(${angle}deg)`;

    // compute crank speed
    const deltaAngle = angle - lastAngle;
    const deltaTime = now - lastTime;

    let speed = Math.abs(deltaAngle / deltaTime); // angle-change per ms

    lastAngle = angle;
    lastTime = now;
}

function stopCrank() {
    isDragging = false;
}