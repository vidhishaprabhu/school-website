const express=require('express');
const router=express.Router();
const {createContact,getAllContacts,deleteContact}=require('../controllers/contact');
const {authenticateJwt}=require('../middleware/auth.middleware');

router.post('/api/contact',createContact)
router.get('/api/get-contacts',authenticateJwt,getAllContacts)
router.delete('/api/delete-contact/:id',authenticateJwt,deleteContact)

module.exports=router;