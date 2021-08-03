const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const saltRounds = 10

const subSchema = mongoose.Schema({
    hp: {type: Number, default: 100},
    optionals: {    // not sure what model to put in. won't even use until later
        statuses: {type:Array},
        items: {type:Array},
        plothooks: {type:Array}
    }
})

const userSchema = mongoose.Schema({
    name: {type: String, required: [true, "User needs a name"], unique: [true, "There is already a user with that name."]},
    decks: {type: Array},
    email: {type: String, required: [true, "Email is required"], unique:[true, "A user with that email already exists."]},
    password: {type: String, required: [true, 'Password is required']},
    games: {
        type: subSchema
    }
},{timestamps: true})

userSchema.pre('save', function(next) {
    this.password = bcrypt.hashSync(this.password, saltRounds)
    next()
})

module.exports = mongoose.model("Users", userSchema)