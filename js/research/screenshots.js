/* =========================
   Screenshot Module
========================= */

let canvas;
let ctx;

let captureBtn;
let screenshots;

let savedScreenshots = [];



/* =========================
   Initialize
========================= */

function initializeScreenshots() {


    canvas =
        document.getElementById("canvas");


    ctx =
        canvas.getContext("2d");



    captureBtn =
        document.getElementById("captureBtn");


    screenshots =
        document.getElementById("screenshots");



    savedScreenshots =
        JSON.parse(
            localStorage.getItem("screenshots")
        ) || [];



    captureBtn.addEventListener(
        "click",
        captureFrame
    );



    renderScreenshots();

}



/* =========================
   Capture Frame
========================= */

function captureFrame() {


    if (isYouTube()) {


        const videoId =
            player.getVideoData().video_id;


        const image =
            `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;



        savedScreenshots.push({

            image: image,

            time:
                getCurrentTime()

        });



        saveScreenshots();

        renderScreenshots();


        return;

    }



    if (!video.videoWidth) return;



    canvas.width =
        video.videoWidth;


    canvas.height =
        video.videoHeight;



    ctx.drawImage(
        video,
        0,
        0
    );



    const image =
        canvas.toDataURL(
            "image/png"
        );



    savedScreenshots.push({

        image: image,

        time:
            getCurrentTime()

    });



    saveScreenshots();


    renderScreenshots();

}



/* =========================
   Save Screenshots
========================= */

function saveScreenshots() {

    localStorage.setItem(
        "screenshots",
        JSON.stringify(savedScreenshots)
    );

}



/* =========================
   Display Screenshots
========================= */

function renderScreenshots() {


    screenshots.innerHTML = "";



    savedScreenshots.forEach(
        (shot, index) => {


        const container =
            document.createElement("div");



        const img =
            document.createElement("img");


        img.src =
            shot.image;



        const header =
            document.createElement("div");


        header.className =
            "item-header";



        const label =
            document.createElement("strong");


        label.textContent =
            formatTime(shot.time);



        const deleteBtn =
            document.createElement("button");


        deleteBtn.textContent =
            "Delete";


        deleteBtn.className =
            "delete-btn";



        deleteBtn.onclick = () => {


            savedScreenshots.splice(
                index,
                1
            );


            saveScreenshots();

            renderScreenshots();


        };



        header.appendChild(label);

        header.appendChild(deleteBtn);



        const download =
            document.createElement("a");



        download.href =
            shot.image;



        download.download =
            `frame-${Math.floor(shot.time)}.png`;



        download.textContent =
            "Download Screenshot";



        container.appendChild(img);

        container.appendChild(header);

        container.appendChild(download);



        screenshots.prepend(container);


    });

}
