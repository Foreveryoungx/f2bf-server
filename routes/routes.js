const express = require('express');
const router = express.Router()
const Contact = require('../models/model')

router.post('/post', async (req, res) => {
    const data = new Contact({
        name: req.body.name,
        email: req.body.email,
        message: req.body.message
    })

    try {
            const dataToSave = await data.save();
            res.status(200).json(dataToSave)
        }catch(error) {
            res.status(400).json({message: error.message})
        }
})

router.get('/getAll', async (req, res) => {
    try {
        const data = await Contact.find()
        res.json(data)
    }catch(error) {
        res.status(500).json({message: error.message})
    }
})

router.get('/getOne/:id', (req, res) => {
    res.send(req.params.id)
})

router.patch('/update/:id', (req, res) => {
    res.send('Update by ID API')
})

router.delete('/delete/:id', (req, res) => {
    res.send('Delete by ID API')
})
module.exports = router