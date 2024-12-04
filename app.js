const express = require('express')
const db= require('./config/database_connection')
const dotenv = require("dotenv")
const userRoutes = require("./routes/user_routes");
const http = require('http');
const socketIO = require('socket.io');
const orgRoutes = require("./routes/organization_routes");
const projectRoutes = require("./routes/project_routes");
const  {getMessages,saveMessage}= require("./controller/chat_controller");
dotenv.config()


db(process.env.DATABASE_URL);

const app = express()
const port = process.env.PORT || 3000
app.use(express.json()); 

const server = http.createServer(app);
const io = socketIO(server);
app.use("/api/u/",userRoutes);
app.use("/operable/org/",orgRoutes);
app.use("/operable/org/p/",projectRoutes);

app.get('/', (req, res) => res.json('Welcome to Track Lab!'))



const Message = require('./model/message_model');
io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
  
    // Join organization-specific room
    socket.on('joinOrganization', ({ organizationId, userId }) => {
      socket.join(organizationId); // Join organization room
      console.log(`User ${userId} joined organization ${organizationId}`);
    });
  
    // Handle chat message
    socket.on('chatMessage', async (data) => {
      try {
        const savedMessage = await chatController.saveMessage(data);
        // Emit to all members in the organization room
        io.to(data.organizationId).emit('chatMessage', savedMessage);
      } catch (error) {
        console.error('Error processing chat message:', error);
      }
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.id);
    });
  });
  
  // API Route to fetch messages
  app.get('/api/org/messages/', getMessages);
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));