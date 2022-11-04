const express = require('express');
const router = express.Router();
const Author = require('../models/author');
const Book = require('../models/book');

//All Authors Route
router.get('/', async (req, res) => {
    let searchOptions = {};
    if(req.query.name != null && req.query.name !== ''){//since this is a router.get we use query to actually get the input
        searchOptions.name = { name: RegExp(req.query.name, 'i')}
    }
    try{
        const authors = await Author.find(searchOptions.name)
        res.render("authors/index", {
            authors: authors,
            searchOptions: req.query
        })

    }catch{
        res.redirect('/')
    }

    
})

//New Author Route
router.get('/new', (req,res) => {
    res.render('authors/new', {author: new Author() })
})

//Create Author Route
router.post('/', async (req,res) => {
    const author = new Author({
        name: req.body.name
    })
        try{
            const newAuthor = await author.save()
            res.redirect(`/authors/${newAuthor.id}`)
            // res.redirect('authors')
            
        }catch{
            res.render('authors/new', {
            author: author,
            errorMessage: "Error creating Author"
            })
        }
})

//View
router.get('/:id', async(req,res) =>{
    try{
        const author = await Author.findById(req.params.id)
        const books = await Book.find({author: author.id}).exec()
        res.render('authors/show', {
            author: author,
            booksByAuthor: books
        })
    }catch{
        res.redirect('/')
    }
})

//Edit
router.get('/:id/edit', async (req,res)=>{
    try{
        const author = await Author.findById(req.params.id)
        res.render('authors/edit', {author: author })
    }catch{
        res.redirect('/authors')
    }
})

//Update
router.post('/:id',async(req,res)=>{
    let author
    try{
        author = await Author.findById(req.params.id) //finds name by id
        author.name = req.body.name //updates and changes the name
        await author.save()
        res.redirect(`/authors/${author.id}`)
    }catch{
        if(author == null){
            res.redirect('/')
        }
        else{
            res.render('authors/edit', {
                author: author,
                errorMessage: "Error updating Author"
            })
        } 
    }
})

//Delete
router.delete('/:id', async (req,res)=>{
    let author
    try{
        author = await Author.findById(req.params.id) //finds name by id
        await author.remove()
        res.redirect(`/authors`)
    }catch{
        if(author == null){
            res.redirect('/')
        }
        else{
            res.redirect(`/authors/${author.id}`)
        } 
    }
})

module.exports = router;