const router = require('express').Router();
const { readAndAppend, readFromFile, writeToFile } = require('../helpers/fsUtils.js')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const { parse } = require('path');
const { request } = require('http');

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

router.post('/notes', (req, res) => {
    // res.json(req.body)
    const { title, text } = req.body;

    if (title && text) {
        const newNote = {
            title,
            text,
            id: uuidv4(),
        }
        readAndAppend(newNote, './db/db.json');
    
        const response = {
            status: 'success',
            body: newNote
        }
    
        res.json(response);
    } else {
        res.json('Error in adding note');
    }
})

router.delete('/notes/:id', (req, res) => {
    const notes = JSON.parse(fs.readFileSync('./db/db.json'));

    const note = notes.find(note => note.id === req.params.id)
    if (!note) return res.status(404).send(`Sorry! There is no course with the id ${req.params.id}`);

    const index = notes.indexOf(note);
    notes.splice(index, 1);
    writeToFile('./db/db.json', notes);

    res.send(note)
})

module.exports = router;