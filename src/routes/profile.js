const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/student/:email', profileController.getStudentProfile);
router.get('/', profileController.getAllProfiles); 

router.put('/:id_user', profileController.updateProfile);
router.delete('/:id_user', profileController.deleteProfile);

module.exports = router;