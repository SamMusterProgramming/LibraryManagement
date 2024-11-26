const mongoose = require('mongoose')

const bookSchema = new mongoose.Schema({
    title:String,
    description:String,
    author:String,
    published_year:Number
})

const bookModel = mongoose.model("books",bookSchema);

module.exports = bookModel;  