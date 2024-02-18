const express = require('express')
const path = require('path')
const fs = require('fs')

// Constant for note data (initially read from file)
const { notes } = require('./db/db.json');

// Create an Express application
const app = express();

// Define the port for the server
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static("public"));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Get request to retrieve notes
app.get('/api/notes', (req,res) => {
    res.sendFile(path.join(__dirname,'./db/db.json'))
})

// Post request to create a new note
app.post('/api/notes', (req, res, next) => {

    req.body.id = notes.length.toString();
    notes.push(req.body);
    const notesJSON = JSON.stringify({ notes }, null, 2);
  
    fs.writeFile(path.join(__dirname, './db/db.json'), notesJSON, (err) => {
      if (err) {
        notes.pop(); 
        next(err);
      } else {
        res.json(req.body);
      }
    });
});

// Delete request to remove a note by ID
app.delete('/api/notes/:id', (req, res, next) => {
    const noteId = req.params.id;
    const noteIndex = notes.findIndex((note) => note.id === noteId);
  
    if (noteIndex !== -1) {
      notes.splice(noteIndex, 1);
      const notesJSON = JSON.stringify({ notes }, null, 2);
  
      fs.writeFile(path.join(__dirname, './db/db.json'), notesJSON, (err) => {
        if (err) {
          notes.splice(noteIndex, 0, notes[noteIndex]);
          next(err);
        } else {
          res.json({ message: 'Note deleted' });
        }
      });
    } else {
      res.status(404).json({ error: 'Note not found' });
    }
});

// Serve the notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// Catch-all route to serve the index.html file for any other routes
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});