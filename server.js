const express = require('express');
const projectRouter = require('./routes/projectRouter.js');
const actionsRouter = require('./routes/actionsRouter.js');
const server = express();

server.use(express.json());

server.use('/api/project', projectRouter);
server.use('/api/actions', actionsRouter);

server.get('/', (req, res) => {
  res.send(`Server is running`)
});

module.exports= server;