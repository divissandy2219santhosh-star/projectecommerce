const express = require('express');
const router = express.Router();
const postcontroller = require('../controllers/postcontroller');
const { protect } = require('../middleware/authmiddleware');
const {
    createpost,getpost,createcomment,getpostbyid,updatepost,deletepost,likepost,unlikepost
}= require('../controllers/postcontroller');

router.route('/').post(protect, createpost);
router.route('/').get(protect, getpost);
router.route('/:id').get(protect, getpostbyid);
router.route('/:id').put(protect, updatepost);
router.route('/:id').delete(protect, deletepost);
router.route('/:id/like').post(protect, likepost);
router.route('/:id/unlike').post(protect, unlikepost);
router.route('/:id/comment').post(protect, createcomment);

module.exports = router;