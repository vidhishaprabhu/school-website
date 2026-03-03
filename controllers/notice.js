const Notice=require('../models/Notice.Model');

exports.createNotice=async(req,res)=>{
  try{
    const {title,description,date,category}=req.body;
    if(!title || !description || !date || !category){
      return res.status(400).json({message:'All fields are required'})
    }
    const notice=new Notice({
      title,
      description,
      date,
      category
    })
    await notice.save();
    return res.status(201).json({message:'Notice created successfully',notice})

  }
  catch(error){
    res.status(500).json({message:'Server Error'})
  }
}
exports.getAllNotice=async(req,res)=>{
  try{
    const notice=await Notice.find();
    if(!notice || notice.length===0){
      return res.status(404).json({message:'No notice found'})
    }
    return res.status(200).json({message:'Notice fetched successfully',notice})

  }
  catch(error){
    console.log(err);
    res.status(500).json({ message: "Internal Server error", error: err.message });
  }
}
exports.deleteNotice=async(req,res)=>{
  const id=req.params.id;
  try{
    const notice=await Notice.findByIdAndDelete(id);
    if(!notice){
      return res.status(404).json({message:'Notice not found'});
    }
    return res.status(200).json({message:'Notice deleted successfully'})
  }
  catch(error){
    res.status(500).json({message:'Server Error'})
  }
}
exports.updateNotice=async(req,res)=>{
  const id=req.params.id;
  try{
    const {title,description,date,category}=req.body;
    if(!title || !description || !date || !category){
      return res.status(400).json({message:'All fields are required'})
    }
    const notice=await Notice.findById(id);
    if(!notice){
      return res.status(404).json({message:'Notice not found'})
    }
    const updatedNotice=await Notice.findByIdAndUpdate(id,{title,description,date,category},{new:true});
    return res.status(200).json({message:'Notice updated successfully',notice:updatedNotice
    })
  }
  catch(error){
    res.status(500).json({message:'Server Error'})
  }
}