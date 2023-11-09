const router = require("express").Router();
const store = require("../db/store");

// GET "/api/notes" responds with all notes from the database
router.get("/notes", function(req, res) {
  store.getNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;