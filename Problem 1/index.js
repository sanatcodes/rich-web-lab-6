//imports
const { fromEvent, interval, merge, EMPTY } = rxjs;

const noteListDiv = document.querySelector(".note-list");
noteInput = document.querySelector(".note-input");
heading = noteInput.querySelector(".title");
noteTitle = noteInput.querySelector("#note-title");
noteContent = noteInput.querySelector("#note-content");
addNoteBtn = noteInput.querySelector("#add-note-btn");

let isEdited = false;
let editId;

let noteID = 0;
function Note(id, title, content){
  this.id = id;
  this.title = title;
  this.content = content;
}

// Add eventListeners 
  document.addEventListener("DOMContentLoaded", displayNotes);
  // document.getElementById("add-note-btn").addEventListener("click", addNewNote); 
  const addNoteObs = fromEvent(addNoteBtn, "click");
  
  // noteListDiv.addEventListener("click", noteActions);
  const noteListObs = fromEvent(noteListDiv, "click");

  const addNoteSubscriber = addNoteObs.subscribe(addNewNote);
  const noteListSubscriber = noteListObs.subscribe(noteActions);


// get item from storage 

function getDataFromStorage(){
  return localStorage.getItem("notes") ? JSON.parse(localStorage.getItem("notes")) : [];
}



// add a new note in the list 

function addNewNote(){

  const noteTitle = document.getElementById("note-title");
  const noteContent = document.getElementById("note-content");
  
    if(noteTitle.value || noteContent.value){
        
        let notes = getDataFromStorage();
        const notes2  = [...notes]
        let noteItem;
        
        if(!isEdited){
            noteItem = new Note(noteID, noteTitle.value, noteContent.value);
            console.log(noteItem);
            notes2.push(noteItem);
            noteID++;
            createNote(noteItem);
            saveNotes(notes2);
        } else {
            isEdited = false;
            const targetNote = notes2.filter(item => {
              return item.id == editId;
            });
            console.log(targetNote);
            targetNote.title = noteTitle.value;
            targetNote.content = noteContent.value;
            notes2.forEach(item => {
              if(item.id == editId) {
                item.title = noteTitle.value;
                item.content = noteContent.value;
              }
            })
            console.log(notes2);
            saveNotes(notes2);
            displayNotes();
        }
        
        
        console.log(notes);
    }
  
}
// saving in the local storage 
function saveNotes(notes){
  console.log(notes);
  localStorage.setItem("notes", JSON.stringify(notes));
  noteTitle.value = "";
  noteContent.value = "";
}

// create a new note div
function createNote(noteItem){
  const div = document.createElement("div");
  div.classList.add("note-item");
  div.setAttribute("data-id", noteItem.id);
  div.innerHTML = `
        <h3>${noteItem.title}</h3>
        <p>${noteItem.content}</p>
        <button type = "button" class = "btn delete-note-btn"> Delete </buttton>
        <button type = "button" class = "btn blue-note-btn"> Blue </buttton>
        <button type = "button" class = "btn red-note-btn"> Red </buttton>
        <button type = "button" class = "btn green-note-btn"> Green </buttton>
        <button type = "button" class = "btn edit-note-btn"> Edit </buttton>
  `;
  noteListDiv.appendChild(div);
}


// display all the notes from the local storage
function displayNotes(){
    heading.innerText = "Add a new Note";
    addNoteBtn.innerText = "Add Note";
  let notes = getDataFromStorage();
  if(notes.length > 0) {
    noteID = notes[notes.length - 1].id;
    noteID++;
  }else {
    noteID = 1;
  }
  noteListDiv.innerHTML = ""
  notes.forEach(item => {
    createNote(item);
  });
}


// note actions
function noteActions(e){
  //delete note
  if (e.target.classList.contains("delete-note-btn")) {
    e.target.parentElement.remove();
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromStorage();
    let newNotesList = notes.filter(item => {
      return item.id !== parseInt(divID);
    });
    localStorage.setItem("notes", JSON.stringify(newNotesList));
  }
  //change colours
  if(e.target.classList.contains("blue-note-btn")){
    e.target.parentElement.style.backgroundColor = "#7ec4cf";
  }
  if(e.target.classList.contains("red-note-btn")){
    e.target.parentElement.style.backgroundColor = "#ff7477";
  }
  if(e.target.classList.contains("green-note-btn")){
    e.target.parentElement.style.backgroundColor = "#98b08b";
  }
  //edit note
  if(e.target.classList.contains('edit-note-btn')){
    isEdited = true;
    let divID = e.target.parentElement.dataset.id;
    let notes = getDataFromStorage();
    console.log(notes)
    let targetNote = notes.filter(item => {
      return item.id == parseInt(divID);
    });
    editId = targetNote[0].id;
   
    heading.innerText = "Update choosen Note";
    addNoteBtn.innerText = "Update Note";
    noteTitle.value = targetNote[0].title;
    noteContent.value = targetNote[0].content;
    noteTitle.focus();
    console.log(isEdited);
    console.log(targetNote[0].id, targetNote[0].title, targetNote[0].content);
  }
}
