import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    name: String,
    message: String
});

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    pages: {
        type: Number,
        min: 1
    },
    genres: {
        type: [String],
        default: []
    },
    reviews: {
        type: [reviewSchema],
        default: []
    }
});

const BookModel = mongoose.model('Book', bookSchema);

export default BookModel;
