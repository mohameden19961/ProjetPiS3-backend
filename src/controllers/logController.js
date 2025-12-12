const db = require('../database/db');

exports.getAllLogs = (req, res) => {
    const sql = "SELECT * FROM logs ORDER BY id DESC";
    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.getLogsByMatricule = (req, res) => {
    const { matricule } = req.params;
    const sql = "SELECT * FROM logs WHERE matricule = ? ORDER BY id DESC";
    db.all(sql, [matricule], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(rows);
    });
};

exports.deleteLogEntry = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM logs WHERE id = ?";
    db.run(sql, [id], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        if (this.changes === 0) return res.status(404).json({ message: "Entrée de log non trouvée." });
        res.status(200).json({ message: `Log ID ${id} supprimé.` });
    });
};

exports.clearAllLogs = (req, res) => {
    const sql = "DELETE FROM logs";
    db.run(sql, [], function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json({ message: `Toutes les ${this.changes} entrées de log ont été supprimées.` });
    });
};