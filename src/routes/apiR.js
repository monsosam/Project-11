const router = require("express").Router();
import Store from "./store.js"; 
import { v4 as uuidv4 } from 'uuid';



router.get("/notes", async (req, res) => {
  try {
      const notes = await Store.getNotes();
      res.json(notes);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.post("/notes", async (req, res) => {
  try {
      const { title, text } = req.body;
      if (!title || !text) {
          return res.status(400).json({ error: "Please provide both a title and text for the note." });
      }
      
      const newNote = { title, text, id: uuidv4() };
      const note = await Store.addNote(newNote);
      res.json(note);
  } catch (err) {
      res.status(500).json(err);
  }
});

router.delete("/notes/:id", async (req, res) => {
  try {
      await Store.removeNote(req.params.id);
      res.json({ ok: true });
  } catch (err) {
      res.status(500).json(err);
  }
});
  
export default router;