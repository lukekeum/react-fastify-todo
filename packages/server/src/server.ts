import './config/dotenv';
import app from './app';
import Database from './database';

app.start(); // Start fastify server

// Connect to mongoDB with mongoose
const database = new Database();

database.connect({ useNewUrlParser: true, useUnifiedTopology: true });
