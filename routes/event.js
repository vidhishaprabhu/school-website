const express=require('express');
const router=express.Router();
const {createEvent,getAllEvent,deleteEvent,updateEvent}=require('../controllers/event');

router.post('/api/event',createEvent);
router.get('/api/get-event',getAllEvent);
router.delete('/api/delete-event/:id',deleteEvent);
router.put('/api/update-event/:id',updateEvent);

module.exports=router;