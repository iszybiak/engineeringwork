const { Router } = require('express')
const ListItem = require('../../models/ListItem')

const router = Router() 

//GET
router.get('/', async (req, res) => {
    try {
        const listItems = await ListItem.find() 
        if(!listItems) throw new Error('No listItem')
        const sorted = listItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })
        res.status(200).json(sorted)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

//POST
router.post('/', async (req, res) => {
    const newlistItem = new ListItem(req.body)
    try {
        const listItem = await newlistItem.save()
        if(!listItem) throw new Error("Coś poszło nie tak :(")
        res.status(200).json(listItem)
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
})

//PUT 
router.put('/:id', async(req,res) => {
    const {id} = req.params
    try {
        const response = await ListItem.findByIdAndUpdate(id, req.body)
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
        const removed = await ListItem.findByIdAndDelete(id)
        if(!removed) throw Error('Coś poszło nie tak')
        res.status(200).json(removed)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

module.exports = router