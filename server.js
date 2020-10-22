import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import connectionURL from './db/connect.js';
import api from './api/index.js';
// express config
const server = express();
const port = process.env.PORT || 5000;

//middleware
server.use(express.json());
server.use(morgan('tiny'));

//mongodb
mongoose.connect(connectionURL, { useNewUrlParser: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'db connection error:'));
db.once('open', () => console.log('connected to the db'));

// api routes
api(server);

// listen
server.listen(port, () => console.log(`listening on port ${port}.`));
