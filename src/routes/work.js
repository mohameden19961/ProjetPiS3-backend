const express = require('express');
const router = express.Router();
const workController = require('../controllers/workController');
const upload = require('../middlewares/upload');

router.post('/submit', upload.array('files'), workController.submitWork);

router.get('/all-submissions', workController.getProfessorDashboard);
router.get('/submission/:id_etud', workController.getSubmissionByStudent);

router.delete('/submission/:id', workController.deleteSubmission);

module.exports = router;