const fs = require('fs');


//load notes - reusable function
const loadNotes = () => {
  var data = fs.readFileSync('notes.json');
  return JSON.parse(data);
}

//save function -  reusable function
const saveNotes = (notes) => {
  //Write Notes to JSON
  var currentNotes = loadNotes();

  currentNotes.push(notes);

  let dataJSON = JSON.stringify(currentNotes);

  fs.writeFileSync('notes.json', dataJSON);

}

const noDuplicate = (title) => {
  const newNote = loadNotes();
  //add a new note by checking if there are no duplicates
  const noDuplicateNotes = newNote.filter(function
    (note) {
    return note.title === title;
  });
  if (noDuplicateNotes.length === 0) {
    return true;
  }
  else {
    return false;
  }
}

//Add a new note
const addNote = function (title, author, desc) {

  if (noDuplicate(title)) {
    var newNote =
    {
      title: title,
      author: author,
      desc: desc
    }
    saveNotes(newNote);
    console.log('New Note Added')
  }
  else {
    console.log('New Title already exsists')
  }
}


//Remove Note
const removeNote = function (title) {
  //remove notes first by checking if it exists
  const notes = loadNotes()
  const notesToKeep = notes.filter(function (note) {
    return note.title != title
  })

  console.log(notesToKeep)

  if (notes.length > notesToKeep.length) {
    console.log('Note removed')
    let dataJSON = JSON.stringify(notesToKeep);

    fs.writeFileSync('notes.json', dataJSON);

    return true;
  }
  else {
    console.log('No note found')
    return false;
  }

}

//List Notes
const listNotes = function (title)
//print all notes from .json file
{
  const notes = loadNotes()
  console.log("Your Note(s) Is/Are Listed Here");

  notes.forEach((note) => {
    console.log("Title: " + note.title + "Author : " + (note.author + " Description : " + note.desc));
  });
}

//read notes
const readNote = (title) => {
  var notes = loadNotes();
  const note = notes.filter((note) => note.title == title)
  if (note) {
    console.log(note.title + " : " + note.author + " : " + note.desc);
  } else {
    console.log("Note Not Found!");
  }

  return note;
}


const checkIfExists = (title) => {
  var notes = loadNotes();
  const note = notes.filter((note) => note.title == title)

  if (note) {
    return true;
  }
  else {
    return false;
  }
}


module.exports = {
  // the command functions
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  checkIfExists: checkIfExists,
  loadNotes: loadNotes
}