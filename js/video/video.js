/* =========================
   Local Video
========================= */

let video = null;
let videoUpload = null;

let currentTimeText = null;
let durationText = null;

let localVideoURL = null;


/* =========================
   Initialize
========================= */

function initializeVideo() {

    video =
        document.getElementById("video");

    videoUpload =
        document.getElementById("videoUpload");

    currentTimeText =
        document.getElementById("currentTime");

    durationText =
        document.getElementById("duration");


    if (videoUpload) {

        videoUpload.addEventListener(
            "change",
            loadLocalVideo
        );

    }


    if (video) {

        addVideoListeners();

    }

}


/* =========================
   Video Events
========================= */

function addVideoListeners() {

    video.addEventListener(
        "loadedmetadata",
        updateVideoDuration
    );


    video.addEventListener(
        "timeupdate",
        updateVideoTime
    );

}


/* =========================
   Update Duration
========================= */

function updateVideoDuration() {

    if (!durationText) return;


    durationText.textContent =
        formatTime(video.duration);

}


/* =========================
   Update Time
========================= */

function updateVideoTime() {

    if (!currentTimeText) return;


    currentTimeText.textContent =
        formatTime(video.currentTime);

}


/* =========================
   Load Local Video
========================= */

function loadLocalVideo(event) {

    const file =
        event.target.files[0];


    if (!file || !video) return;


    releaseLocalVideo();


    localVideoURL =
        URL.createObjectURL(file);


    video.style.display =
        "block";


    video.src =
        localVideoURL;


    video.load();

}


/* =========================
   Release Local Video
========================= */

function releaseLocalVideo() {

    if (!video) return;


    video.pause();


    video.removeAttribute(
        "src"
    );


    video.load();


    if (localVideoURL) {

        URL.revokeObjectURL(
            localVideoURL
        );

        localVideoURL = null;

    }

}


/* =========================
   Remove Local Video
========================= */

function removeLocalVideo() {

    releaseLocalVideo();


    if (videoUpload) {

        videoUpload.value = "";

    }


    if (currentTimeText) {

        currentTimeText.textContent =
            "00:00:00.000";

    }


    if (durationText) {

        durationText.textContent =
            "00:00:00.000";

    }

}


/* =========================
   Format Time
========================= */

function formatTime(seconds) {

    if (
        !seconds ||
        isNaN(seconds)
    ) {

        return "00:00:00.000";

    }


    const hours =
        Math.floor(
            seconds / 3600
        );


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const secs =
        Math.floor(
            seconds % 60
        );


    const milliseconds =
        Math.floor(
            (seconds % 1) * 1000
        );


    return (
        String(hours).padStart(2, "0")
        + ":"
        +
        String(minutes).padStart(2, "0")
        + ":"
        +
        String(secs).padStart(2, "0")
        + ":"
        +
        String(milliseconds).padStart(3, "0")
    );

}
