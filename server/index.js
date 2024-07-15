const express = require('express');
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./Models/Users');
const cors = require('cors');

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://alpmelihilgin:Alpmelih@cluster0.xnmumh6.mongodb.net/MernStack?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
        console.log('MongoDB Connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

app.get("/getUsers", async (req, res) => {
    try {
        const users = await UserModel.find({}); // Async/await kullanımı
        res.json(users);
    } catch (err) {
        console.error("Error fetching users:", err);
        res.status(500).json({ error: "Internal Server Error", message: err.message });
    }
});

app.post('/createUser', async (req, res) => {
    const user = req.body;
    const newUser = new UserModel(user);
    await newUser.save();
    res.json(user);
});

app.listen(3001, () => {
    console.log('Server is running on port 3001');
});
