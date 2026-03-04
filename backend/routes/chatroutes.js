const express = require('express');
const{protect} = require('../middleware/authmiddleware');
const router = express.Router();
const {accesschat,sendmessage,getuserchats,getchatmessages}= require('../controllers/chatcontrollers');

router.route('/').post(protect, accesschat);
router.route('/').get(protect, getuserchats);
router.route('/:chatId').get(protect, getchatmessages);
router.route('/').post(protect, sendmessage);

module.exports = router;