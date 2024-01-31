const router = require('express').Router();
const Book = require('../../models/Book');

// Post request for creating a new book
router.post('/', async (req, res) => {
    try{
        const bookData = await Book.create(req.body);

        res.status(200).json(bookData);
    }catch(err){
        res.status(400).json(err);
    }
});