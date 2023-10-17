const express = require('express');
const musiciansRouter = express.Router();
const Musician = require('../models/Musician')

//get
musiciansRouter.get("/:id", async (req, res, next) => {
    const id = req.params.id;
    try {
      const selectedMusician = await Musician.findByPk(id);
      if (!selectedMusician) {
        throw new Error("No Musician with that id");
      }
      res.send(selectedMusician);
    } catch (error) {
      next(error);
    }
  });

musiciansRouter.get('/', async (req, res, next) => {
    try {
        const musicians = await Musician.findAll()
        if(!musicians){
            throw new Error("The selected band does not exist.")
        } 
        res.json(musicians)
    } catch(error) {
        next(error)
    }
})
  
  //put
musiciansRouter.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);
    try {
      const updatedMusician = await musician.update(req.body);
      if (!updatedMusician) {
        throw new Error("Musician was not updated");
      }
      res.send(updatedMusician);
    } catch (error) {
      next(error);
    }
  });
  
  //post
musiciansRouter.post("/", async (req, res, next) => {
    try {
      const newMusician = await Musician.create(req.body);
      if (!newMusician) {
        throw new Error("Musician not created");
      }
      res.send(newMusician);
    } catch (error) {
      next(error);
    }
  });
  
  //delete
  
 musiciansRouter.delete("/:id", async (req, res, next) => {
    try {
      const id = req.params.id;
      const musician = await Musician.findByPk(id);
      const deletedMusician = await musician.destroy();
      if (!deletedMusician) {
        throw new Error("Musician still exists");
      }
      res.send(deletedMusician);
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = musiciansRouter;
  