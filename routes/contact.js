const express=require('express');
const router=express.Router();
const {createContact}=require('../controllers/contact');

router.post('/api/contact',createContact)
// router.get('/',(req,res)=>{

// })
// router.put('/',(req,res)=>{

// })
// router.delete('/',(req,res)=>{

// })


module.exports=router;