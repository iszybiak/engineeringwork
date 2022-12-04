const { Router } = require('express')
const ListMeet = require('../../models/ListMeet')

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
        if(!listMeet) throw new Error("Coś poszło nie tak :(")
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
        if(!response) throw Error('Coś poszło nie tak')
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
        if(!removed) throw Error('Coś poszło nie tak')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = router