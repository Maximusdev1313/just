const Outlay = require('../models/outlays')


const asyncHandler = require("express-async-handler");

module.exports = class Outlays {
    // fetch all posts
    static fetchAllOutlay = asyncHandler(async (req, res) => {
        try {
            const outlays = await Outlay.find()
            res.status(200).json(outlays)
        } catch (err) {
            res.status(404).json({ message: err.message })
        }
    })
    static createOutlay = asyncHandler(async (req, res) => {
        const outlays = req.body

        try {
            await Outlay.create(outlays)
            res.status(201).json({ message: 'outlay created' })
        } catch (error) {
            res.status(400).json({ message: error.message })
        }
    })
    static async deleteOutlay(req, res) {
        const id = req.params.id;
        try {
            const result = await Outlay.findByIdAndDelete(id)

            res.status(200).json({ message: result })
        } catch (err) {
            res.status(404).json({ message: err })
        }
    }

}
