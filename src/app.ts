import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import socket from 'socket.io'
import router from "./Routes";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api', router)

const server = http.createServer(app);

const io = new socket.Server(server, {
    path: "/socket.io",
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
})


io.on('connection', client => {
    console.log('Novo usuário conectado:', client.id);
  
    client.on('send-message', message => {
      io.emit('message', message);
    });
  
    client.on('disconnect', () => {
      console.log('Usuário desconectado:', client.id);
    });
});


mongoose.connect(`${process.env.MONGO_URL}`).then(() => {
  console.log("Connected to Mongoose")
})
.catch(err => {
  console.log(err);
})


server.listen(process.env.port, () => {
    console.log(`Listening on port ${process.env.port}`);
});