const express = require('express');
const {signup} = require('../controllers/authcontrollers');
const router = express.Router();
const {protect} =require('../middleware/authmiddleware');
const {uploadProfilepicture, getProfilepicture,updateuserprofile,searchusers,unfollowr,followers} = require('../controllers/profilecontrollers');


router.post('/signup', signup);
router.post('/login', login);   
router.post('/enabletwofactorauth', protect, enabletwofactorauth);
router.post('/verifytwofactorauth', protect, verifytwofactorauth);
router.post('/uploadprofilepicture', protect, uploadProfilepicture);
router.get('/getprofilepicture', protect, getProfilepicture);
router.put('/updateuserprofile', protect, updateuserprofile);
router.get('/searchusers', protect, searchusers);
router.post('/unfollow', protect, unfollowr);
router.get('/followers', protect, followers);

module.exports = router;

