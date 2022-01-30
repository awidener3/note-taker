const router = require('express').Router();
const { readAndAppend, readFromFile } = require('../helpers/fsUtils.js')

router.get('/notes', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
})

module.exports = router;