const mongoose = require("mongoose");
const express = require('express');
const { User, Projects, Tickets} = require("../db");
const { authenticateJwt } = require("../middleware/auth");


const router = express.Router();
  
  router.post('/create/', authenticateJwt, async (req, res) => 
  {
    const project = new Projects(req.body);
    project.team.push(project.projectManager, req.body.developer, req.body.submitter);
    await project.save();
    res.json({ message: 'project created successfully', id: project.id , project});
  });
  router.put('/:projectId', authenticateJwt, async (req, res) => 
  {
    const postData = req.body;
    const {projectManager, developer, submitter} = postData;
    postData.team.push(projectManager, developer, submitter);

    const project = await Projects.findByIdAndUpdate(req.params.projectId, req.body, { new: true });
    if (project) {
      res.json({ message: 'project updated successfully' });
    } else {
      res.status(404).json({ message: 'project not found' });
    }
  });
  
  router.get('/',  authenticateJwt, async (req, res) => {
    const projects = await Projects.find({}).populate("projectManager");
    res.json({ projects });
  });
  
  router.get('/:id', authenticateJwt, async (req, res) => {
    const projectId = req.params.id;
    const project = await Projects.findById(projectId)
    .populate({ path: 'projectManager team', select:"name email role"})
    .populate({
      path: "tickets", 
      select: "ticketTitle description createdOn ticketStatus assignee",
      populate: {path: "assignee" , select: "name"},
      options: { _recursed: true } 
    });

    res.json({ project });
  });

  module.exports = router