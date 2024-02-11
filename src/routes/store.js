import { promises as fs } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert the URL of the current module to a file path
const __filename = fileURLToPath(import.meta.url);

// Get the directory name of the current module
const __dirname = dirname(__filename);

const filePath = join(__dirname, '../db/db.json');

class Store {
    async getNotes() {
        const data = await fs.readFile(filePath, 'utf8');
        return JSON.parse(data).notes || [];
    }

    async addNote(note) {
        const notes = await this.getNotes();
        notes.push(note);
        await fs.writeFile(filePath, JSON.stringify({ notes }, null, 2));
        return note;
    }

    async removeNote(id) {
        let notes = await this.getNotes();
        notes = notes.filter(note => note.id !== id);
        await fs.writeFile(filePath, JSON.stringify({ notes }, null, 2));
    }
}

export default new Store();