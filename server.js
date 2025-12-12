const http = require('http');
const { Server } = require('socket.io');
const app = require('./src/app');
const setupExamSocket = require('./src/sockets/examSocket');

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

setupExamSocket(io);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
});