const express=require('express');
const router=express.Router();
const {createTeacher,getAllTeachers,deleteTeacher,updateTeacher}=require('../controllers/teacher');
const {authenticateJwt}=require('../middleware/auth.middleware');

router.post('/api/teacher',authenticateJwt,createTeacher);
router.get('/api/get-teacher',getAllTeachers);
router.delete('/api/delete-teacher/:id',authenticateJwt,deleteTeacher);
router.put('/api/update-teacher/:id',authenticateJwt,updateTeacher);

module.exports=router;