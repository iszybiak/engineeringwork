const { Router } = require('express')
const ListItem = require('../../models/ListItem')
const User = require("../../models/ListItem");
const {hash, compare} = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config()

const router = Router()

//GET
router.get('/', async (req, res) => {
    try {
        const listItems = await ListItem.find()
        /*const sorted = listItems.sort((a,b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime()
        })*/
        res.status(200).json(listItems)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
//GET BY ID
router.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const itemById = await ListItem.findById(id)
        res.status(200).json(itemById)
    } catch (error) {
        res.status(500).json({message : error.message})
    }
})

router.get('/token', async (req, res) => {
    const token = req.headers.authorization;

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(401);
        res.json(user);
    });
})




//POST
router.post('/auth', async (req, res) => {
    try{
        const user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).send("Użytkownik z podanym e-mailem już istnieje.");
        }

    }catch {
        return res.status(400).send();
    }
    // create user
    try{
        const password = await hash(req.body.password, 10);
        const user = new User( {
            name: req.body.name,
            surname: req.body.surname,
            email: req.body.email,
            password: password,
            number : req.body.number
        })
        console.log(user)
        await user.save();
        res.status(201).send()
    }catch {
        res.status(422).send()
    }
})

router.post('/sign', async (req, res) => {
    const user = await User.findOne({email: req.body.email})

    if(user == null){
        return res.status(404).send("Adres e-mail lub hasło jest nieprawidłowe")
    }
        if(await compare(req.body.password, user.password)){
            const accessToken = jwt.sign({
                    email: req.body.email,
                    role: user.role
                },
                process.env.ACCESS_TOKEN_SECRET);
            res.status(200).json({
                accessToken: accessToken,
                role: user.role
            });
        }else{
            res.status(404).send("Adres e-mail lub hasło jest nieprawidłowe");
        }
});

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