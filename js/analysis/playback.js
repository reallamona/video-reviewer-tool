/* =========================
   Playback
========================= */


/* =========================
   Check YouTube
========================= */

function isYouTube() {

    const youtube =
        getYouTubePlayer();

    return (
        youtube !== null &&
        typeof youtube.getCurrentTime === "function"
    );

}


/* =========================
   Get Current Time
========================= */

function getCurrentTime() {

    if (isYouTube()) {

        return getYouTubePlayer()
            .getCurrentTime();

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

        return getYouTubePlayer()
            .getDuration() || 0;

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

        getYouTubePlayer()
            .seekTo(
                time,
                true
            );

        return;

    }


    if (
        typeof video !== "undefined" &&
        video
    ) {

        video.currentTime =
            time;

    }

}
