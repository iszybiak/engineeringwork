const { Router } = require('express')
const ListMeet = require('../../models/ListMeet')
const ListMeetSquad = require('../../models/ListMeetSquad')
const ListItem = require("../../models/ListItem");

const router = Router() 

//GET
router.get('/', async (req, res) => {
    try {
        const listMeets = await ListMeet.find() 
        if(!listMeets) throw new Error('No listMeets')
        /*const sorted = listMeets.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(listMeets)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//POST
router.post('/', async (req, res) => {
    const newlistMeet = new ListMeet(req.body)
    try {
        const listMeet = await newlistMeet.save()
        res.status(200).json(listMeet)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})



//PUT 
router.put('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const response = await ListMeet.findByIdAndUpdate(id, req.body)
        const updated = { ... reponse._doc, ... req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//DELETE

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await ListMeet.findByIdAndDelete(id)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})






///SQUAD

router.get('/squad/', async (req, res) => {
    try {
        const listMeetsSquad = await ListMeetSquad.find()
        if(!listMeetsSquad) throw new Error('No listMeets')

        res.status(200).json(listMeetsSquad)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/squad/:meetID/:friendID', async (req, res) => {
    const { meetID, friendID} = req.params
    try {
        const meetSquadById = await ListMeetSquad.findOne( {meetID, friendID})
        res.status(200).json(meetSquadById)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})
//POST
router.post('/squad/', async (req, res) => {
    const newlistMeetSquad = new ListMeetSquad(req.body)
    try {
        const listMeetSquad = await newlistMeetSquad.save()
        res.status(200).json(listMeetSquad)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

router.put('/squad/:id', async(req,res) => {
    const {id} = req.params
    try {
        const response = await ListMeetSquad.findByIdAndUpdate(id, req.body)
        const updated = { ... reponse._doc, ... req.body}
        res.status(200).json(updated)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})


//DELETE

router.delete('/squad/:id', async (req, res) => {
    const {id} = req.params
    try {
        const removed = await ListMeetSquad.findByIdAndDelete(id)
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})



module.exports = router