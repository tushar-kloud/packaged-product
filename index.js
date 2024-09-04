import express from 'express'; 

// packging  dependencies
import path from 'path';
import {fileURLToPath} from 'url';


import { createServer } from 'node:http'; 
import bodyParser from 'body-parser'; 
import cors from 'cors'; 
import dotenv from 'dotenv'; 
import { Server } from 'socket.io';

import labClockTracker from './sockets/labClockTracker.js';
import commandTerminal from './sockets/commandTerminal.js';

import logger from './config/logger.js'; 
import connectDb from './config/connectDb.js';

import userRouter from './routers/userRouter.js';
import labRouter from './routers/labRouter.js';
import AzureTerminal from './sockets/AzureTerminal.js'

dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
const PORT = process.env.PORT || 8080;

const server = createServer(app);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Added for single packaging
app.use(express.static(path.join(__dirname,'dev-frontend/dist')));

// Middleware to log all incoming requests
app.use((req, res, next) => {
  logger.info(`HTTP ${req.method} ${req.url}`);
  next();
});

// Error handler
app.use((err, req, res, next) => {
  logger.error(err.stack);
  res.status(500).send('Something broke!');
});

export const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
  allowEIO3: true
});


connectDb(DATABASE_URL);
labClockTracker(io);
AzureTerminal(io);

// Routes
app.use('/api/auth', userRouter);
app.use('/api/training', labRouter);

// Catch-all handler for any requests that don't match an API route
app.get('*',(req,res)=>{
   res.sendFile(path.join(__dirname,'dev-frontend/dist','index.html'));
})


// Start the server
server.listen(process.env.PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`);
});
