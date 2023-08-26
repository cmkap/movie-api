const mongoose =require('mongoose');
const { Schema } = mongoose;

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

module.exports = Genre