const Gallery=require('../models/Gallery.Model');

exports.createGallery=async(req,res)=>{
  try{
    const {title,imageUrl,date}=req.body;
    // if(!title || !imageUrl || !date){
    //   return res.status(400).json({message:'All fields are required'})
    // }
    const gallery=await Gallery.create({
      title,
      imageUrl,
      date
    })
    gallery.save();
    return res.status(201).json({message:'Gallery created successfully',gallery})

  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}
exports.getAllGallery=async(req,res)=>{
  try{
    const gallery=await Gallery.find();
    if(!gallery || gallery.length===0){
      return res.status(404).json({message:'No gallery found'});
    }
    return res.status(200).json({message:'Gallery fetched successfully',gallery})

  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}
exports.deleteGallery=async(req,res)=>{
  const id=req.params.id;
  try{
    const gallery=await Gallery.findByIdAndDelete(id);
    if(!gallery){
      return res.status(404).json({message:'Gallery not found'});
    }
    return res.status(200).json({message:'Gallery deleted successfully',gallery})

  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}
exports.updateGallery=async(req,res)=>{
  const id=req.params.id;
  try{
    const {title,imageUrl,date}=req.body;
    const gallery=await Gallery.findById(id);
    if(!title || !imageUrl || !date){
      return res.status(400).json({message:'All fields are required'})
    }
    const galleryUpdate=await Gallery.findByIdAndUpdate(id,{title,imageUrl,date},{new:true});
    if(!galleryUpdate){
      return res.status(404).json({message:'Gallery not found'});
    }
    if(galleryUpdate){
      return res.status(200).json({message:'Gallery updated successfully',galleryUpdate })
    }
  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }

}