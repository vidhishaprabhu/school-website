const express=require('express');
const router=express.Router();
const {createNotice,getAllNotice,deleteNotice,updateNotice}=require('../controllers/notice');
const {authenticateJwt}=require('../middleware/auth.middleware');

router.post('/api/notice',authenticateJwt,createNotice);
router.get('/api/get-notice',getAllNotice);
router.delete('/api/delete-notice/:id',authenticateJwt,deleteNotice);
router.put('/api/update-notice/:id',authenticateJwt,updateNotice);

module.exports=router;