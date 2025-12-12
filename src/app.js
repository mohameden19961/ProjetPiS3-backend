const express = require('express');
const http = require('http'); 
const cors = require('cors');
const path = require('path');
const app = express();
const server = http.createServer(app); 
const socketIo = require('socket.io'); 


const examSocket = require('./sockets/examSocket'); 

app.use(cors()); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));


const authRoutes = require('./routes/auth');       
const profileRoutes = require('./routes/profile'); 
const ensRoutes = require('./routes/ens');         
const examRoutes = require('./routes/exam');       
const workRoutes = require('./routes/work');      
const logRoutes = require('./routes/logs'); 


const io = socketIo(server, {
    cors: {
        origin: "*", 
        methods: ["GET", "POST"]
    }
});
examSocket(io); 


app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/ens', ensRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/works', workRoutes);
app.use('/api/logs', logRoutes); 


app.use((req, res, next) => {
    res.status(404).json(
        { 
            message: "Route non trouvée sur le serveur local." 
        }
    );
});


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Une erreur interne est survenue sur le serveur du professeur." });
});


module.exports = server;