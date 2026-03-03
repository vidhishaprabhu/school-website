const express=require('express');
const router=express.Router();
const {createContact,getAllContacts,deleteContact}=require('../controllers/contact');

router.post('/api/contact',createContact)
router.get('/api/get-contacts',getAllContacts)
router.delete('/api/delete-contact/:id',deleteContact)

module.exports=router;