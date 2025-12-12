const db = require('../database/db');

module.exports = (io) => {
    io.on('connection', (socket) => {
        
        socket.on('join_exam', (data) => {
            const { matricule } = data;
            const time = new Date().toLocaleString('fr-FR');

            db.run(`INSERT INTO logs (matricule, action, timestamp) VALUES (?, ?, ?)`, 
                [matricule, 'CONNEXION', time]
            );

            socket.join("exam_room");
            io.emit('student_connected', { matricule, time });
        });

        socket.on('disconnect', () => {
            const time = new Date().toLocaleString('fr-FR');
            io.emit('student_disconnected', { 
                id: socket.id, 
                time: time 
            });
        });
    });
};