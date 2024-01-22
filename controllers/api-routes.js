const app = require('express').Router();
const User = require('../models/User');
const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction');

// Get all users
app.get("/api/users", async (req, res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});