const express=require('express');
const router=express.Router();
const {createTeacher,getAllTeachers,deleteTeacher,updateTeacher}=require('../controllers/teacher');

router.post('/api/teacher',createTeacher);
router.get('/api/get-teacher',getAllTeachers);
router.delete('/api/delete-teacher/:id',deleteTeacher);
router.put('/api/update-teacher/:id',updateTeacher);

module.exports=router;