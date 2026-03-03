const Teacher=require('../models/Teacher.Model');

exports.createTeacher=async(req,res)=>{
  try{
    const {name,subject,designation,bio,image}=req.body;
    if(!name || !subject || !designation || !bio || !image){
      return res.status(400).json({message:'All fields are required'})
    }
    const teacher=new Teacher({
      name,
      subject,
      designation,
      bio,
      image
    })
    await teacher.save();
    return res.status(201).json({message:'Teacher created successfully',teacher})

  }
  
  catch(error){
    res.status(500).json({message:'Internal Server Error', error:error.message})
  }
}
exports.getAllTeachers=async(req,res)=>{
  try{
    const teachers=await Teacher.find();
    if(!teachers || teachers.length===0){
      return res.status(404).json({message:'No teachers found'})
    }
    return res.status(200).json({message:'Teachers fetched successfully',teachers})
  }
  catch(error){
    console.log(error);
    res.status(500).json({ message: "Internal Server error", error: error.message });
  }
}
exports.deleteTeacher=async(req,res)=>{
  const id=req.params.id;
  try{
    const teacher=await Teacher.findByIdAndDelete(id);
    if(!teacher){
      return res.status(404).json({message:'Teacher not found'});
    }
    return res.status(200).json({message:'Teacher deleted successfully'})
  }
  catch(error){
    res.status(500).json({message:'Server Error', error:error.message})
  }
}
exports.updateTeacher=async(req,res)=>{
  const id=req.params.id;
  try{
    const {name,subject,designation,bio,image}=req.body;
    if(!name || !subject || !designation || !bio || !image){
      return res.status(400).json({message:'All fields are required'})
    }
    const teacher=await Teacher.findById(id);
    if(!teacher){
      return res.status(404).json({message:'Teacher not found'})
    }
    const updatedTeacher=await Teacher.findByIdAndUpdate(id,{name,subject,designation,bio,image},{new:true});
    return res.status(200).json({message:'Teacher updated successfully',teacher:updatedTeacher
    })
  }
  catch(error){
    res.status(500).json({message:'Server Error', error:error.message})
  }
}