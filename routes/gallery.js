const express=require('express');
const router=express.Router();
const {createGallery,getAllGallery,deleteGallery,updateGallery}=require('../controllers/gallery');

router.post('/api/gallery',createGallery);
router.get('/api/get-gallery',getAllGallery);
router.delete('/api/delete-gallery/:id',deleteGallery);
router.put('/api/update-gallery/:id',updateGallery);

module.exports=router;