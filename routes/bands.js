const express = require('express')
const { Musician, Band } = require('../models')
const router = express.Router()

//GET /bands endpoint that returns all the Band instances including the Musician instances that are part of that Band
router.get('/', async (req, res, next) => {
    try {
        const bandsWithMusicians = await Band.findAll({include: Musician})
        if(!bandsWithMusicians){
            throw new Error("The selected band does not exist.")
        } 
        res.send(bandsWithMusicians)
    } catch(error) {
        next(error)
    }
})

router.get('/:id', async (req, res, next) => {
    const id = req.params.id
    try {
        const oneBand = await Band.findByPk(id, {include: Musician})
        if(!oneBand) {
            throw new Error("Band not found")
        }
        res.send(oneBand)
    } catch(error){
        next(error)
    }
})

router.put('/:bandId/:musicianId', async (req, res, next) => {
    const bandId = req.params.bandId
    const musicianId = req.params.musicianId
    const oneBand = await Band.findByPk(bandId, {include: Musician})
    const musician = await Musician.findByPk(musicianId)
    await oneBand.addMusicians(musician)
    const getBandWithMusician = await oneBand.getMusicians()
    res.send(getBandWithMusician)
})

module.exports = router