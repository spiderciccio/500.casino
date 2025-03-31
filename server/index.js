import 'dotenv/config'
import express from 'express';
import mongoose from "mongoose";
import cors from 'cors'
import http from 'http';
import { Server } from 'socket.io';

import createTodoRouter from './routes/todos.js';

const PORT = process.env.PORT;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors())
app.use(express.json());

app.use("/api/todos", createTodoRouter(io));

app.get('/', (_, res) => {
  res.send('Server Ready');
});


io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

try {
  await mongoose.connect(process.env.MONGO_CONNECTION_STRING)
  console.log('MongoDB connected')
  server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
} catch(e) {
  console.error(e);
}