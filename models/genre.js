const mongoose =require('mongoose');
const { Schema } = mongoose;
const Joi = require("joi");


const schema = Joi.object({
  name: Joi.string().min(5).max(30).required(),
});

const genreSchema  = new Schema({
    name: {
        type: String,
        required: true,
        enum: [
            'Action',
            'Comedy',
            'Drama',
            'Adventure',
            'Science Fiction',
            'Thriller',
            'Horror',
            'Romance',
            'Fantasy',
            'Animations'
        ]
    }
})

const Genre = mongoose.model('Genre', genreSchema)

module.exports = {Genre, schema, genreSchema}