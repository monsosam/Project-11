import express from 'express';
const router = express.Router();
import { join } from 'path';

// Serve the notes.html page
router.get('/notes', function(req, res) {
  res.sendFile(join(__dirname, '../public/notes.html'));
});

// Catch-all route to serve the index.html page
router.get('*', function(req, res) {
  res.sendFile(join(__dirname, '../public/index.html'));
});

export default router;