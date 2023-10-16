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







module.exports = app;