import express from 'express';
import bodyParser from "body-parser";
import dbConnection from './db.js';

const port = 3000;
const app = express();
app.use(express.json());

// Import your Mongoose model here
import BookModel from './book.js';

app.listen(port, () => {
    console.log(`app listening on ${port}`);
});

// Now use the Mongoose model in your routes
app.get('/books', async (req, res) => {
    const page = req.query.page || 0;
    const booksPerPage = 3;

    try {
        const books = await BookModel.find().sort({ author: 1 }).skip(page * booksPerPage).limit(booksPerPage);
        res.status(200).json(books);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch documents" });
    }
});

app.get('/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const book = await BookModel.findById(bookId);
        res.status(200).json(book);
    } catch (err) {
        res.status(500).json({ error: "Could not fetch document" });
    }
});

app.post('/books', async (req, res) => {
    const book = req.body;

    try {
        const newBook = await BookModel.create(book);
        res.status(201).json(newBook);
    } catch (err) {
        res.status(500).json({ error: "Could not add document" });
    }
});

app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id;

    try {
        const result = await BookModel.findByIdAndDelete(bookId);
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ error: "Could not delete document" });
    }
});

app.patch('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const update = req.body;

    try {
        const result = await BookModel.findByIdAndUpdate(bookId, { $set: update }, { new: true });
        res.status(201).json(result);
    } catch (err) {
        res.status(500).json({ error: "Could not update document" });
    }
});
