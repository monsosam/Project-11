const router = require("express").Router();
const path = require('path');

// Serve the notes.html page
router.get('/notes', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/notes.html'));
});

// Catch-all route to serve the index.html page
router.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

module.exports = router;