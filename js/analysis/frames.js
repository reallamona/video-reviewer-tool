/* =========================
   Frame Controller
========================= */

let fps = 30;

let fpsDisplay;
let fpsSelect;

let frameNumberText;


/* =========================
   Frame Buttons
========================= */

let previousFrameBtn;
let nextFrameBtn;

let back5Btn;
let back10Btn;
let back30Btn;
let back1mBtn;
let back5mBtn;

let forward5Btn;
let forward10Btn;
let forward30Btn;
let forward1mBtn;
let forward5mBtn;


/* =========================
   Initialize Frames
========================= */

function initializeFrames() {

    previousFrameBtn =
        document.getElementById("previousFrame");

    nextFrameBtn =
        document.getElementById("nextFrame");


    back5Btn =
        document.getElementById("back5");

    back10Btn =
        document.getElementById("back10");

    back30Btn =
        document.getElementById("back30");

    back1mBtn =
        document.getElementById("back1m");

    back5mBtn =
        document.getElementById("back5m");


    forward5Btn =
        document.getElementById("forward5");

    forward10Btn =
        document.getElementById("forward10");

    forward30Btn =
        document.getElementById("forward30");

    forward1mBtn =
        document.getElementById("forward1m");

    forward5mBtn =
        document.getElementById("forward5m");


    frameNumberText =
        document.getElementById("frameNumber");

    fpsDisplay =
        document.getElementById("fps");

    fpsSelect =
        document.getElementById("fpsSelect");


    setupFrameButtons();
    setupFPSSelector();


    setInterval(
        updateFrameNumber,
        100
    );

}


/* =========================
   Frame Button Events
========================= */

function setupFrameButtons() {

    nextFrameBtn.onclick =
        () => moveFrames(1);


    previousFrameBtn.onclick =
        () => moveFrames(-1);


    forward5Btn.onclick =
        () => moveFrames(5);

    back5Btn.onclick =
        () => moveFrames(-5);


    forward10Btn.onclick =
        () => moveFrames(10);

    back10Btn.onclick =
        () => moveFrames(-10);


    forward30Btn.onclick =
        () => moveFrames(30);

    back30Btn.onclick =
        () => moveFrames(-30);


    forward1mBtn.onclick =
        () => moveFrames(fps * 60);

    back1mBtn.onclick =
        () => moveFrames(-(fps * 60));


    forward5mBtn.onclick =
        () => moveFrames(fps * 300);

    back5mBtn.onclick =
        () => moveFrames(-(fps * 300));

}


/* =========================
   FPS Selector
========================= */

function setupFPSSelector() {

    fpsSelect.addEventListener(
        "change",
        () => {

            fps =
                Number(
                    fpsSelect.value
                );


            fpsDisplay.textContent =
                fps;


            updateFrameNumber();

        }
    );

}


/* =========================
   Move Frames
========================= */

function moveFrames(amount) {

    if (!isYouTube()) {

        video.pause();

    }


    moveByFrames(amount);

}


/* =========================
   Update Frame Display
========================= */

function updateFrameNumber() {

    const frame =
        Math.floor(
            getCurrentTime() * fps
        );


    if (frameNumberText) {

        frameNumberText.textContent =
            frame;

    }


    if (fpsDisplay) {

        fpsDisplay.textContent =
            fps;

    }

}
