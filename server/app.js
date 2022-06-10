const express = require('express');
const {Server, Socket} = require('socket.io');
const cors = require('cors');
const http = require('http');


const app = express();

app.use(cors());

const server = http.createServer(app);




const io = new Server(server,{
    cors: {
        origin:"http://localhost:3000",
        methods: ["GET","POST"]
    },
});
 io.on('connection',(Socket)=>{
     console.log('user connected to ' +Socket.id);
   

    Socket.on("join_Room",(Data)=>{

        //Making connection between the clients
        Socket.join(Data);
        // console.log(Data);

    })

    Socket.on("Message",(data)=>{
        // console.log(data);
        Socket.to(data.room).emit("ReceiveData",data);
    })

    

     //receive from client
     Socket.on("disconnect",()=>{
         console.log("User disconnected",Socket.id);
     })

    

 });

 server.listen(3001,()=>{
     console.log('Successfully connected to the server!!');
 })
