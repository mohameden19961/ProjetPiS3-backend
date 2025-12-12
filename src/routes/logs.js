const express = require('express');
const router = express.Router();
const logController = require('../controllers/logController');

router.get('/', logController.getAllLogs);

router.get('/:matricule', logController.getLogsByMatricule);

router.delete('/:id', logController.deleteLogEntry);

router.delete('/clear', logController.clearAllLogs);

module.exports = router;