const express=require('express');
const router=express.Router();
const {createEvent,getAllEvent,deleteEvent,updateEvent}=require('../controllers/event');
const {authenticateJwt}=require('../middleware/auth.middleware');

router.post('/api/event',authenticateJwt,createEvent);
router.get('/api/get-event',getAllEvent);
router.delete('/api/delete-event/:id',authenticateJwt,deleteEvent);
router.put('/api/update-event/:id',authenticateJwt,updateEvent);

module.exports=router;