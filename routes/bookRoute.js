const express = require('express')
const bookModel = require('../models/books.js')
const mongoose = require('mongoose')

const { ObjectId } = mongoose.Types;

const bookRoute = express.Router();

async function  validateEntries(req,res,next){
    
    if(!req.body.title || !req.body.author || !req.body.published_year)
    return res.status(404).json({error:`resource can't be found`})
    const book = await bookModel.findOne({title:req.body.title})
    if(book)
    return res.status(404).json({error:`title already exist`})
    next()
}



bookRoute.get('/',async (req,res)=> {
    const books = await bookModel.find({})
    res.send(books)
})
bookRoute.post('/',validateEntries,async (req,res)=> {
    try {
        const book = new bookModel ({
            title:req.body.title,
            author: req.body.author,
            description :req.body.description,
            published_year:req.body.year
        })
        await book.save();
        res.status(201).send(book)  
    } catch (error) {
        console.log(error)
    } 
})

bookRoute.route('/:id')
    .get(async(req,res)=> {
            try {
            const book = await bookModel.findById(new ObjectId(req.params.id))
            if(!book) res.status(404).send("can't find infos")
            res.status(201).send(book)
            } catch (error) {
            res.status(500).json({ error:'Internal server error'});
            }
    })
    .put(validateEntries,async(req,res)=> {
        try {
            const updateBook = await bookModel.findByIdAndUpdate(
                req.params.id , 
                req.body,
                {new:true}  
            )
            if(!updateBook) res.status(404).json({error:`can't find resource`})
            res.status(200).json(updateBook)  
        } catch (error) {
            res.status(500).json({error :'Internal server error'})
        }
    })
    .delete(validateEntries,async(req,res)=> {
        try {   
            const deleteBook = await bookModel.findByIdAndDelete(new ObjectId(req.params.id))
            if (!deleteBook) res.status(404).json({error:`can't find the book`})
            res.status(200).json(deleteBook)
        } catch (error) {
             res.status(500).json({ error:'Internal server error'})
        }
    })



module.exports = bookRoute; 