const fs = require('fs').promises;
const path = require('path');

const filePath = path.join(__dirname, '../db/db.json');

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

module.exports = new Store();