const express = require('express');
const {signup} = require('../controllers/authcontrollers');
const router = express.Router();
const {protect} =require('../middleware/authmiddleware');


router.post('/signup', signup);
router.post('/login', login);
router.post('/enabletwofactorauth', protect, enabletwofactorauth);
router.post('/verifytwofactorauth', protect, verifytwofactorauth);
router.post('/uploadprofilepicture', protect, uploadProfilepicture);
router.get('/getprofilepicture', protect, getProfilepicture);


module.exports = router;