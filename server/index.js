const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const auth = require("./routes/auth");
const projects = require("./routes/projects");
const tickets = require("./routes/tickets");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/auth", auth);
app.use("/projects", projects);
app.use("/tickets", tickets);


mongoose.connect('mongodb+srv://issuetrackingtool:wrHQiocU2TmOCn2T@cluster0.uqpnuwi.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "tracker" });

app.listen(3000, () => console.log('Server running on port 3000'));
