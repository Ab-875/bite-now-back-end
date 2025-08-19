const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const dotenv = require('dotenv').config()

// use process.env.SECRET in production

// POST /auth/register
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body

        // check if username taken
        const existing = await User.findOne({ username })
        if (existing) {
            return res.status(400).json({ message: 'Username already exists' })
        }

        // hash password
        const passwordHash = await bcrypt.hash(password, 10)

        // create user
        const newUser = new User({
            username,
            passwordHash,
            role: "customer"
        })

        await newUser.save()

        res.status(201).json({ message: 'User registered successfully' })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}

// POST /auth/login
exports.login = async (req, res) => {
    try {
        const SECRET = process.env.SECRET
        const { username, password } = req.body
        const user = await User.findOne({ username })

        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const isValid = await user.validatePassword(password)
        if (!isValid) {
            return res.status(401).json({ message: 'Invalid username or password' })
        }

        const payload = {
            id: user._id,
            role: user.role
            // add more fields here if needed (e.g. username, email)
        }

        const token = jwt.sign(payload, SECRET, { expiresIn: '1h' })
        res.json({ token })
    } catch (err) {
        res.status(500).json({ message: 'Server error' })
    }
}