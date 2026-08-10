/* =========================
   Video Player
========================= */

let video;
let videoUpload;
let currentTimeText;
let durationText;

let localVideoURL = null;


/* =========================
   Initialize Player
========================= */

function initializePlayer() {

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
            loadVideo
        );

    }


    if (video) {

        addVideoListeners();

    }

}


/* =========================
   Add Video Events
========================= */

function addVideoListeners() {

    video.addEventListener(
        "loadedmetadata",
        () => {

            if (durationText) {

                durationText.textContent =
                    formatTime(video.duration);

            }

        }
    );


    video.addEventListener(
        "timeupdate",
        () => {

            if (currentTimeText) {

                currentTimeText.textContent =
                    formatTime(video.currentTime);

            }

        }
    );

}


/* =========================
   Load Local Video
========================= */

function loadVideo(event) {

    const file =
        event.target.files[0];


    if (!file) return;


    // Remove YouTube

    if (typeof player !== "undefined" && player) {

        player.destroy();

        player = null;

    }


    const youtubePlayer =
        document.getElementById(
            "youtubePlayer"
        );


    if (youtubePlayer) {

        youtubePlayer.innerHTML = "";

        youtubePlayer.style.display =
            "none";

    }


    // Release previous file memory

    if (localVideoURL) {

        URL.revokeObjectURL(
            localVideoURL
        );

    }


    localVideoURL =
        URL.createObjectURL(file);


    video.style.display =
        "block";


    video.src =
        localVideoURL;


    video.load();

}


/* =========================
   Time Format
========================= */

function formatTime(seconds) {

    if (!seconds || isNaN(seconds)) {

        return "00:00:00:000";

    }


    const hours =
        Math.floor(seconds / 3600);


    const minutes =
        Math.floor(
            (seconds % 3600) / 60
        );


    const secs =
        Math.floor(seconds % 60);


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
