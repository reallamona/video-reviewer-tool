/* =========================
   URL Import
========================= */

let player = null;

let videoURL;
let loadURLBtn;

let youtubeTimeInterval = null;


/* =========================
   Initialize
========================= */

function initializeURLImport() {

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

    const url =
        videoURL.value.trim();


    if (url === "") return;


    if (
        url.includes("youtube.com") ||
        url.includes("youtu.be")
    ) {

        loadYouTube(url);

        return;

    }


    // Load direct video URL

    if (player) {

        player.destroy();

        player = null;

    }


    document.getElementById(
        "youtubePlayer"
    ).style.display =
        "none";


    video.style.display =
        "block";


    video.src = url;


}


/* =========================
   Load YouTube
========================= */

function loadYouTube(url) {

    const id =
        getYouTubeID(url);


    if (!id) {

        console.log(
            "Invalid YouTube URL"
        );

        return;

    }


    // Hide local video

    video.style.display =
        "none";


    document.getElementById(
        "youtubePlayer"
    ).style.display =
        "block";


    video.pause();

    video.removeAttribute(
        "src"
    );

    video.load();


    if (player) {

        player.destroy();

        player = null;

    }


    player =
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
                    onReady: youtubeReady
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


    setTimeout(
    updateYouTubeDuration,
    500
    
    );


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

    if (!player) return;


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

    if (!player) return;


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
   Extract ID
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
