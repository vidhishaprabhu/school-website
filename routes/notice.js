const express=require('express');
const router=express.Router();
const {createNotice,getAllNotice,deleteNotice,updateNotice}=require('../controllers/notice');

router.post('/api/notice',createNotice);
router.get('/api/get-notice',getAllNotice);
router.delete('/api/delete-notice/:id',deleteNotice);
router.put('/api/update-notice/:id',updateNotice);

module.exports=router;