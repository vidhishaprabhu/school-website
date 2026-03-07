const express=require('express');
const router=express.Router();
const {createGallery,getAllGallery,deleteGallery,updateGallery}=require('../controllers/gallery');
const {authenticateJwt}=require('../middleware/auth.middleware');

router.post('/api/gallery',authenticateJwt,createGallery);
router.get('/api/get-gallery',getAllGallery);
router.delete('/api/delete-gallery/:id',authenticateJwt,deleteGallery);
router.put('/api/update-gallery/:id',authenticateJwt,updateGallery);

module.exports=router;