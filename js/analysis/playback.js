/* =========================
   Playback
========================= */


/* =========================
   Check YouTube
========================= */

function isYouTube() {

    return (
        typeof player !== "undefined" &&
        player !== null &&
        typeof player.getCurrentTime === "function" &&
        typeof player.seekTo === "function"
    );

}


/* =========================
   Get Current Time
========================= */

function getCurrentTime() {

    if (isYouTube()) {

        return player.getCurrentTime();

    }


    if (
        typeof video !== "undefined" &&
        video
    ) {

        return video.currentTime || 0;

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


    if (
        typeof video !== "undefined" &&
        video
    ) {

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
            Math.max(0, time),
            true
        );

        return;

    }


    if (
        typeof video !== "undefined" &&
        video
    ) {

        video.currentTime =
            Math.max(0, time);

    }

}
