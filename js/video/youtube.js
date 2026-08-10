/* =========================
   YouTube
========================= */

let player = null;
let youtubeAPIReady = false;

let videoURL;
let loadURLBtn;

let youtubeTimeInterval = null;


/* =========================
   YouTube API Ready
========================= */

function onYouTubeIframeAPIReady() {

    youtubeAPIReady = true;

    console.log(
        "YouTube API Ready"
    );

}

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
            loadYouTubeURL
        );

    }

}


/* =========================
   Load URL
========================= */

function loadYouTubeURL() {

    if (!videoURL) {
        return;
    }


    const url =
        videoURL.value.trim();


    if (!url) {
        return;
    }


    const videoId =
        getYouTubeID(url);


    if (!videoId) {

        console.warn(
            "Invalid YouTube URL"
        );

        return;
    }


    loadYouTube(videoId);

}


/* =========================
   Load YouTube
========================= */

function loadYouTube(videoId) {

    if (!youtubeAPIReady) {

    console.warn(
        "YouTube API is not ready"
    );

    return;
}


    if (player) {

        player.destroy();

        player = null;

    }


    if (video) {

        video.pause();

        video.removeAttribute("src");

        video.load();

        video.style.display =
            "none";

    }


    const youtubeContainer =
        document.getElementById(
            "youtubePlayer"
        );


    if (!youtubeContainer) {
        return;
    }


    youtubeContainer.innerHTML = "";

    youtubeContainer.style.display =
        "block";


    player =
        new YT.Player(
            "youtubePlayer",
            {

                width: "100%",

                height: "100%",

                videoId: videoId,

                playerVars: {
                    controls: 1
                },

                events: {
                    onReady:
                        onYouTubeReady
                }

            }
        );

}


/* =========================
   YouTube Ready
========================= */

function onYouTubeReady() {

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
        !player ||
        typeof player.getCurrentTime !==
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
                player.getCurrentTime()
            );

    }

}


/* =========================
   Update Duration
========================= */

function updateYouTubeDuration() {

    if (
        !player ||
        typeof player.getDuration !==
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
                player.getDuration()
            );

    }

}


/* =========================
   Get YouTube ID
========================= */

function getYouTubeID(url) {

    const regex =
        /(?:youtube\.com\/(?:watch\?v=|shorts\/|embed\/)|youtu\.be\/)([^?&/]+)/;


    const match =
        url.match(regex);


    return match
        ? match[1]
        : null;

}
