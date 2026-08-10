/* =========================
    Notes Module
========================= */

let notes = [];

let noteInput;
let addNoteBtn;
let notesList;


/* =========================
   Initialize
========================= */

function initializeNotes() {

    noteInput = document.getElementById("noteInput");

    addNoteBtn = document.getElementById("addNoteBtn");

    notesList = document.getElementById("notesList");


    notes =
        JSON.parse(
            localStorage.getItem("notes")
        ) || [];


    addNoteBtn.addEventListener(
        "click",
        addNote
    );


    renderNotes();

}



/* =========================
   Add Note
========================= */

function addNote() {

    const text =
        noteInput.value.trim();


    if (!text) return;


    notes.push({

        time:
            getCurrentTime(),

        text:
            text

    });


    saveNotes();

    renderNotes();


    noteInput.value = "";

}



/* =========================
   Save Notes
========================= */

function saveNotes() {

    localStorage.setItem(
        "notes",
        JSON.stringify(notes)
    );

}



/* =========================
   Display Notes
========================= */

function renderNotes() {

    notesList.innerHTML = "";


    notes.forEach((note, index) => {


        const item =
            document.createElement("li");


        const header =
            document.createElement("div");

        header.className =
            "item-header";


        const timestamp =
            document.createElement("strong");

        timestamp.textContent =
            formatTime(note.time);



        const deleteBtn =
            document.createElement("button");

        deleteBtn.className =
            "delete-btn";

        deleteBtn.textContent =
            "Delete";



        header.appendChild(timestamp);

        header.appendChild(deleteBtn);



        const content =
            document.createElement("p");

        content.textContent =
            note.text;



        item.appendChild(header);

        item.appendChild(content);



        // Jump to timestamp

        item.addEventListener(
            "click",
            (event) => {


                if (
                    event.target === deleteBtn
                ) {

                    return;

                }


                video.currentTime =
                    note.time;


                video.play();

            }
        );



        // Delete note

        deleteBtn.addEventListener(
            "click",
            () => {


                notes.splice(
                    index,
                    1
                );


                saveNotes();

                renderNotes();

            }
        );



        notesList.appendChild(item);


    });

}
