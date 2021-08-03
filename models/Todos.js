const mongoose = require('mongoose')


const schema = mongoose.Schema({
    creator: { type: String, required: [true, "Creator is required"] },

    title: { type: String, required: [true, "Title is required"] },

    complete: { type: Boolean, default: [false], required: [true, "Items are either complete or incomplete"] },

    notes: { type: String }
})

module.exports = mongoose.model("Todos", schema)