/* =========================
   Video Controller
========================= */


/* =========================
   Check YouTube
========================= */

function isYouTube() {

    return (
        typeof player !== "undefined" &&
        player !== null
    );

}


/* =========================
   Get Current Time
========================= */

function getCurrentTime() {

    if (isYouTube()) {

        return player.getCurrentTime();

    }


    if (video) {

        return video.currentTime;

    }


    return 0;

}


/* =========================
   Get Duration
========================= */

function getDuration() {

    if (isYouTube()) {

        return player.getDuration();

    }


    if (video) {

        return video.duration || 0;

    }


    return 0;

}


/* =========================
   Seek Video
========================= */

function seekVideo(time) {

    if (isYouTube()) {

        player.seekTo(
            time,
            true
        );

        return;

    }


    if (video) {

        video.currentTime =
            time;

    }

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
