const express = require("express");
const router = express.Router();

let notes = require("./notes"); 

//base route, lists all current notes
router.get('/', (req, res) => {
    res.json(notes.loadNotes());
});

//read note from title
router.get('/read/:title', (req, res) => {
    const found = notes.readNote(req.params.title);
    if (found) {
        res.json(found);
    }
    else {
        res.sendStatus(400);
    }
});

//Add Notes to file
router.post('/', (req, res) => {
    notes.addNote(req.body.title, req.body.author, req.body.description);

    if (notes.checkIfExists(req.params.title) === true) {
        res.sendStatus(200);
    }
});

//remove note
router.delete('/remove/:title', (req, res) => {
    var removed = notes.removeNote(req.params.title)

    if (removed === true) {
        res.sendStatus(200);
    }
    else
    {
        res.sendStatus(400)
    }
})

module.exports = router;