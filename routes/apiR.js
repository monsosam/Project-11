const router = require("express").Router();
const store = require("../db/store");

router.get("/notes", function(req, res) {
    store.getNotes().then(notes => res.json(notes)).catch(err => res.status(500).json(err));
});

router.post("/notes", (req, res) => {
  const { title, text } = req.body;

  // Check for presence
  if (!title || !text) {
    return res.status(400).json({ error: "Please provide both a title and text for the note." });
  }
  
  store.addNote(req.body)
    .then((note) => res.json(note))
    .catch(err => res.status(500).json(err));
  });

router.delete("/notes/:id", function(req, res) {
    store.removeNote(req.params.id).then(() => res.json({ ok: true })).catch(err => res.status(500).json(err));
  });
  
module.exports = router;