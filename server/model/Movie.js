const mongoose = require('mongoose');
const {Schema, model} = mongoose;

const movieSchema = new Schema({
    title: String,
    year: Number,
    genre: String,
    plot: String,
    actors: Array,
    writers: Array,
    directors: Array,
    type: String,
    rating: Number,
    runtime: Number,
    poster: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Movie = model('Movie', movieSchema);

module.exports = Movie;