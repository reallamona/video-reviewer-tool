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
   Initialize
========================= */

function initializeFrames() {

    previousFrameBtn =
        document.getElementById(
            "previousFrame"
        );

    nextFrameBtn =
        document.getElementById(
            "nextFrame"
        );


    back5Btn =
        document.getElementById(
            "back5"
        );

    back10Btn =
        document.getElementById(
            "back10"
        );

    back30Btn =
        document.getElementById(
            "back30"
        );

    back1mBtn =
        document.getElementById(
            "back1m"
        );

    back5mBtn =
        document.getElementById(
            "back5m"
        );


    forward5Btn =
        document.getElementById(
            "forward5"
        );

    forward10Btn =
        document.getElementById(
            "forward10"
        );

    forward30Btn =
        document.getElementById(
            "forward30"
        );

    forward1mBtn =
        document.getElementById(
            "forward1m"
        );

    forward5mBtn =
        document.getElementById(
            "forward5m"
        );


    frameNumberText =
        document.getElementById(
            "frameNumber"
        );

    fpsDisplay =
        document.getElementById(
            "fps"
        );

    fpsSelect =
        document.getElementById(
            "fpsSelect"
        );


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

    if (nextFrameBtn) {

        nextFrameBtn.onclick =
            () => moveFrames(1);

    }


    if (previousFrameBtn) {

        previousFrameBtn.onclick =
            () => moveFrames(-1);

    }


    if (forward5Btn) {

        forward5Btn.onclick =
            () => moveFrames(5);

    }


    if (back5Btn) {

        back5Btn.onclick =
            () => moveFrames(-5);

    }


    if (forward10Btn) {

        forward10Btn.onclick =
            () => moveFrames(10);

    }


    if (back10Btn) {

        back10Btn.onclick =
            () => moveFrames(-10);

    }


    if (forward30Btn) {

        forward30Btn.onclick =
            () => moveFrames(30);

    }


    if (back30Btn) {

        back30Btn.onclick =
            () => moveFrames(-30);

    }


    if (forward1mBtn) {

        forward1mBtn.onclick =
            () => moveFrames(
                fps * 60
            );

    }


    if (back1mBtn) {

        back1mBtn.onclick =
            () => moveFrames(
                -(fps * 60)
            );

    }


    if (forward5mBtn) {

        forward5mBtn.onclick =
            () => moveFrames(
                fps * 300
            );

    }


    if (back5mBtn) {

        back5mBtn.onclick =
            () => moveFrames(
                -(fps * 300)
            );

    }

}


/* =========================
   FPS Selector
========================= */

function setupFPSSelector() {

    if (!fpsSelect) return;


    fpsSelect.addEventListener(
        "change",
        () => {

            fps =
                Number(
                    fpsSelect.value
                );


            if (fpsDisplay) {

                fpsDisplay.textContent =
                    fps;

            }


            updateFrameNumber();

        }
    );

}


/* =========================
   Move Frames
========================= */

function moveFrames(amount) {

    /*
        Do nothing if no video is loaded
    */

    if (
        typeof isYouTube === "function" &&
        isYouTube()
    ) {

        // YouTube video is loaded
        moveByFrames(amount);

        return;

    }


    /*
        Local video
    */

    if (
        typeof video === "undefined" ||
        !video ||
        !video.src
    ) {

        return;

    }


    video.pause();


    moveByFrames(amount);
}


/* =========================
   Move By Frames
========================= */

function moveByFrames(frames) {

    if (!fps) {

        console.log(
            "FPS is not set"
        );

        return;

    }


    const seconds =
        frames / fps;


    seekVideo(
        getCurrentTime() + seconds
    );

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
