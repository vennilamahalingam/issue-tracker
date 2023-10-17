const mongoose = require("mongoose");
const express = require('express');
const { User, Tickets, History} = require("../db");
const { authenticateJwt } = require("../middleware/auth");


const router = express.Router();
  
  router.post('/create/', authenticateJwt, async (req, res) => {
    let ticket = new Tickets(req.body);
    await ticket.save();
    res.json({ message: 'ticket created successfully', id: ticket.id, ticket });
  });
  
  router.put('/:ticketId', authenticateJwt,  async (req, res) => {
    const ticket = await Tickets.findByIdAndUpdate(req.params.ticketId, req.body, { new: true });
    if (ticket) {
      res.json({ message: 'ticket updated successfully' });
    } else {
      res.status(404).json({ message: 'ticket not found' });
    }
  });
  
  router.get('/', authenticateJwt, async (req, res) => {
    const tickets = await Tickets.find({})
    .populate({ path: "assignee createdBy project history comments", options: { _recursed: true } });
    res.json({ tickets });
  });
  
  router.get('/:id', authenticateJwt, async (req, res) => {
    const ticketId = req.params.id;
    const ticket = await Tickets.findById(ticketId)
    .populate({ path: "assignee createdBy project history comments", options: { _recursed: true } });
    res.json({ ticket });
  });

//   //History
//   router.post('/history/', async (req, res) => {
//     const {ticketId} = req.body;
//     const history = await History.findOne({ticketId});
//     if(history)
//     {
//         history.ticketHistory.push(req.body);
//         await history.save();
//     }
//     else
//     {
//         const newEntry = new History({ticketId: req.body.ticketId, ticketHistory: [req.body]});
//         await newEntry.save();
//     }
//     res.json({ message: 'history created successfully' });
//   });
  
  module.exports = router