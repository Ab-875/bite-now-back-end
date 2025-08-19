const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['customer', 'owner'] }
})

// helper method to compare passwords
userSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.passwordHash)
}

module.exports = mongoose.model('User', userSchema)