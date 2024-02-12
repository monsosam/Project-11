import express from 'express';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Construct __dirname equivalent in ES module
const __dirname = dirname(fileURLToPath(import.meta.url));

// Serve the notes.html page
router.get('/notes', function(req, res) {
  res.sendFile(join(__dirname, '../public/notes.html'));
});

// Catch-all route to serve the index.html page
router.get('*', function(req, res) {
  res.sendFile(join(__dirname, '../public/index.html'));
});

export default router;