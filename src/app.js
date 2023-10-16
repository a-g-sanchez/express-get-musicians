const express = require("express");
const app = express();
const { Musician } = require("../models/index")
const { db } = require("../db/connection")

const port = 3000;

//TODO: Create a GET /musicians route to return all musicians 

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

app.get('/musicians/:id', async(req, res, next) => {
    const id = req.params.id
    try {
        const selectedMusician = await Musician.findByPk(id)
        if(!selectedMusician){
            throw new Error('No Musician with that id')
        }
        res.json(selectedMusician)
    } catch (error) {
        next(error)
    }
})






module.exports = app;