const { Musician } = require('../../models')
const express = require('express')
const router = express.Router()

router.get("/", async (req, res, next) => {
    try {
      const musicians = await Musician.findAll();
      if (!musicians) {
        throw new Error("No Musicians found");
      }
      res.json(musicians);
    } catch (err) {
      next(err);
    }
  });
  
  //get
  router.get("/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const selectedMusician = await Musician.findByPk(id);
      if (!selectedMusician) {
        throw new Error("No Musician with that id");
      }
      res.json(selectedMusician);
    } catch (error) {
      next(error);
    }
  });
  
  //put
  router.put("/:id", async (req, res, next) => {
    const id = req.params.id;
    const musician = await Musician.findByPk(id);
    try {
      const updatedMusician = await musician.update(req.body);
      if (!updatedMusician) {
        throw new Error("Musician was not updated");
      }
      res.json(updatedMusician);
    } catch (error) {
      next(error);
    }
  });
  
  //post
  router.post("/musicians", async (req, res, next) => {
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
  
  router.delete("/:id", async (req, res, next) => {
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

  module.exports = router