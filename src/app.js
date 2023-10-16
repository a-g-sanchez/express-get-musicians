const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 
app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.get('/musicians', async(req, res, next) => {
    try{
        const musicians = await Musician.findAll()
        if(!musicians){
            throw new Error('No Musicians found')
        }
        res.json(musicians)
    }catch(err){
        next(err)
    }
})

//get
app.get('/musicians/:id', async (req, res) => {
    const id = req.params.id
    try {
        const selectedMusician = await Musician.findByPk(id)
        if (!selectedMusician) {
            throw new Error ('No Musician with that id')
        }
        res.json(selectedMusician)
    } catch (error) {
        next(error)
    }
})

//put
app.put('/musicians/:id', async (req, res, next) => {
    const id = req.params.id
    const musician = await Musician.findByPk(id)
    try {
        const updatedMusician = await musician.update(req.body)
        if (!updatedMusician) {
            throw new Error ('Musician was not updated')
        }
        res.json(updatedMusician)
    } catch (error) {
        next(error)
    }
})

//post
app.post('/musicians', async (req, res, next) => {
    try {
        const newMusician = await Musician.create(req.body)
        if (!newMusician) {
            throw new Error ('Musician not created')
        }
        res.send(newMusician)
    } catch (error) {
        next(error)
    }
})








module.exports = app;