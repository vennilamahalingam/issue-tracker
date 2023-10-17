const mongoose = require("mongoose");
const express = require('express');
const { User} = require("../db");
const jwt = require('jsonwebtoken');
const { SECRET } = require("../middleware/auth")
const { authenticateJwt } = require("../middleware/auth");


const router = express.Router();

// router.get("/me", authenticateJwt, async (req, res) => {
//     const admin = await Admin.findOne({ username: req.user.username });
//     if (!admin) {
//       res.status(403).json({msg: "Admin doesnt exist"})
//       return
//     }
//     res.json({
//         username: admin.username
//     })
// });
router.get("/userdet", authenticateJwt, async (req, res) => {
  console.log(req.user.name);
    const user = await User.findOne({ name: req.user.name });
    if (!user) {
      res.status(403).json({msg: "User doesnt exist"})
      return
    }
    res.json(user)
});

router.post('/signup',  (req, res) => {
    const { name, email, password, role } = req.body;
    function callback(user) {
      if (user) {
        res.status(403).json({ message: 'user already exists' });
      } else {
        const obj = { name, email, password, role };
        const newUser = new User(obj);
        newUser.save();

        const token = jwt.sign({ name, role }, SECRET, { expiresIn: '12h' });
        res.json({ message: 'User created successfully', token });
      }
  
    }
    User.findOne({ name }).then(callback);
  });
  
  router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (user) {
      const token = jwt.sign({ email, role: 'developer' }, SECRET, { expiresIn: '12h' });
      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  });
  
  router.get('/getAllUsers', async(req, res) => {
    const users = await User.find({}).select("name _id email role");
    res.json({ users });
  })
  module.exports = router
