const mongoose = require("mongoose");

const projectsSchema = new mongoose.Schema({
    projectName: String,
    projectManager: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    },
    description: String,
    team:[{
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User'
    }]
    },{
      toJSON: { virtuals: true },
      toObject: { virtuals: true }
    });
projectsSchema.virtual("tickets", {
  ref: 'Tickets',
  localField: "_id",
  foreignField: "project"
})
const ticketsSchema = new mongoose.Schema({
    ticketNumber: String,
    ticketTitle: String,
    description: String,
    ticketStatus: String,
    createdOn: {
      type: Date,
      default: () => new Date.now()
  },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
      },
    assignee: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User'
    },
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Projects'},
    priority: String,
    ticketType: String,
    history: [{
              date: {
              type: Date,
              default: () => new Date().now()
            },
            newValue:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            oldValue:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            property: String,
      }],
    comments:[{
        commenter: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        message: String,
        timestamp: Number
    }
    ]
  });
// ticketsSchema.virtual("history", {
//   ref: 'History',
//   localField: "_id",
//   foreignField: 'ticketId'
// })
// const historySchema = new mongoose.Schema(
// {
//     ticketId : {type: mongoose.Schema.Types.ObjectId, ref: 'Tickets'},
//     ticketHistory: [{
//       date: {
//       type: Date,
//       default: () => new Date().now()
//     },
//     newValue:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     oldValue:{ type: mongoose.Schema.Types.ObjectId, ref: 'User' },
//     property: String,
//   }]
// });
const userSchema = new mongoose.Schema({
    email: String,
    role: String,
    password: String,
    timestamp: Number,
    name: String
  });

const User = mongoose.model('User', userSchema);
const Projects = mongoose.model('Projects', projectsSchema);
const Tickets = mongoose.model('Tickets', ticketsSchema);

  
  module.exports = {
    User,
    Projects,
    Tickets
  }