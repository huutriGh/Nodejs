const notes = require('./notes.js');
const chalk = require('chalk');
const yargs = require('yargs');

// customize yargs version
yargs.version('1.1.0');
//Creat add command
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true,
      type: 'string',
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.addNote(argv.title, argv.body);
  },
});

//Create remove command

yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Title to remove',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.removeNote(argv.title);
  },
});

// Create read command

yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Title note',
      demandOption: true,
      type: 'string',
    },
  },
  handler: function (argv) {
    notes.readNote(argv.title);
  },
});

// Create list command

yargs.command({
  command: 'list',
  describe: 'List your note',
  handler: function () {
    notes.listNotes();
  },
});

yargs.parse();
