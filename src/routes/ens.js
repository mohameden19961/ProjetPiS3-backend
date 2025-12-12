const express = require('express');
const router = express.Router();
const profileController = require('../controllers/profileController');

router.get('/', profileController.getAllEns); 
router.get('/:email', profileController.getEnsByEmail);

router.put('/:id', profileController.updateEns);
router.delete('/:id', profileController.deleteEns);

module.exports = router;