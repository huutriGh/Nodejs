const fs = require('fs');

const getNotes = function () {
  return 'Your notes...';
};

const addNote = function (title, body) {
  const notes = loadNotes();
  const duplicateNotes = notes.find(function (note) {
    return note.title === title;
  });
  if (!duplicateNotes) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
  } else {
    console.log('Note title taken');
  }
};
const readNote = function (title) {
  debugger
  const notes = loadNotes();
  const duplicateNotes = notes.find(function (note) {
    return note.title === title;
  });
  if (duplicateNotes) {
    console.log(duplicateNotes);
  } else {
    console.log('Note dose not exist!');
  }
};

const removeNote = function (title) {
  const notes = loadNotes();
  const notesAfterRemoved = notes.filter(function (note) {
    return note.title !== title;
  });
  console.log(notes);
  console.log(notesAfterRemoved);
  if (notesAfterRemoved.length < notes.length) {
    saveNotes(notesAfterRemoved);
    console.log(`${title} is removed!`);
  } else {
    console.log(`${title} dose not existed !`);
  }
};

const saveNotes = function (notes) {
  const dataJSON = JSON.stringify(notes);

  fs.writeFileSync('notes.json', dataJSON);
};

const loadNotes = function () {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (error) {
    return [];
  }
};
const listNotes = function () {
  const notes = loadNotes();
  notes.forEach((element) => {
    console.log(element.title);
  });
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes,
  readNote
};
