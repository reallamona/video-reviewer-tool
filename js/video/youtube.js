/* =========================
   YouTube
========================= */

let youtubePlayer = null;

let videoURL = null;
let loadURLBtn = null;

let youtubeTimeInterval = null;


/* =========================
   Initialize
========================= */

function initializeYouTube() {

    videoURL =
        document.getElementById("videoURL");

    loadURLBtn =
        document.getElementById("loadURLBtn");


    if (loadURLBtn) {

        loadURLBtn.addEventListener(
            "click",
            loadURLVideo
        );

    }

}


/* =========================
   Load URL
========================= */

function loadURLVideo() {

    if (!videoURL) return;


    const url =
        videoURL.value.trim();


    if (!url) return;


    if (isYouTubeURL(url)) {

        loadYouTube(url);

        return;

    }


    loadDirectVideo(url);

}


/* =========================
   Check YouTube URL
========================= */

function isYouTubeURL(url) {

    return (
        url.includes("youtube.com") ||
        url.includes("youtu.be")
    );

}


/* =========================
   Load Direct Video
========================= */

function loadDirectVideo(url) {

    destroyYouTube();


    const youtubeContainer =
        document.getElementById(
            "youtubePlayer"
        );


    if (youtubeContainer) {

        youtubeContainer.style.display =
            "none";

    }


    if (video) {

        video.style.display =
            "block";

        video.src =
            url;

        video.load();

    }

}


/* =========================
   Load YouTube
========================= */

function loadYouTube(url) {

    const id =
        getYouTubeID(url);


    if (!id) {

        console.error(
            "Invalid YouTube URL"
        );

        return;

    }


    if (
        typeof YT === "undefined" ||
        !YT.Player
    ) {

        console.error(
            "YouTube API is not ready"
        );

        return;

    }


    destroyYouTube();


    if (video) {

        video.pause();

        video.removeAttribute(
            "src"
        );

        video.load();

        video.style.display =
            "none";

    }


    const youtubeContainer =
        document.getElementById(
            "youtubePlayer"
        );


    if (!youtubeContainer) {

        console.error(
            "YouTube player container not found"
        );

        return;

    }


    youtubeContainer.innerHTML = "";

    youtubeContainer.style.display =
        "block";


    youtubePlayer =
        new YT.Player(
            "youtubePlayer",
            {

                width: "100%",

                height: "100%",

                videoId: id,

                playerVars: {
                    controls: 1
                },

                events: {
                    onReady:
                        youtubeReady
                }

            }
        );

}


/* =========================
   YouTube Ready
========================= */

function youtubeReady() {

    console.log(
        "YouTube Player Ready"
    );


    updateYouTubeDuration();


    if (youtubeTimeInterval) {

        clearInterval(
            youtubeTimeInterval
        );

    }


    youtubeTimeInterval =
        setInterval(
            updateYouTubeTime,
            100
        );

}


/* =========================
   Update Time
========================= */

function updateYouTubeTime() {

    if (
        !youtubePlayer ||
        typeof youtubePlayer.getCurrentTime !==
            "function"
    ) {

        return;

    }


    const currentTime =
        document.getElementById(
            "currentTime"
        );


    if (currentTime) {

        currentTime.textContent =
            formatTime(
                youtubePlayer.getCurrentTime()
            );

    }

}


/* =========================
   Update Duration
========================= */

function updateYouTubeDuration() {

    if (
        !youtubePlayer ||
        typeof youtubePlayer.getDuration !==
            "function"
    ) {

        return;

    }


    const duration =
        document.getElementById(
            "duration"
        );


    if (duration) {

        duration.textContent =
            formatTime(
                youtubePlayer.getDuration()
            );

    }

}


/* =========================
   Destroy YouTube
========================= */

function destroyYouTube() {

    if (youtubeTimeInterval) {

        clearInterval(
            youtubeTimeInterval
        );

        youtubeTimeInterval =
            null;

    }


    if (
        youtubePlayer &&
        typeof youtubePlayer.destroy ===
            "function"
    ) {

        youtubePlayer.destroy();

    }


    youtubePlayer =
        null;

}


/* =========================
   Get YouTube Player
========================= */

function getYouTubePlayer() {

    return youtubePlayer;

}


/* =========================
   Extract YouTube ID
========================= */

function getYouTubeID(url) {

    const regex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^?&\/]+)/;


    const match =
        url.match(regex);


    return match
        ? match[1]
        : null;

}
