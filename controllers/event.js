const Event=require('../models/Event.Model');

exports.createEvent=async(req,res)=>{
  try{
    const {title,description,shortDescription,date,location}=req.body;
    if(!title || !description || !shortDescription || !date || !location){
      return res.status(400).json({message:'All fields are required'})
    }
    const event=await Event.create({
      title,
      description,
      shortDescription,
      date,
      location
    })
    event.save();
    return res.status(201).json({message:'Event created successfully',event})
  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}

exports.getAllEvent=async(req,res)=>{
  try{
    const events=await Event.find();
    if(!events || events.length===0){
      return res.status(404).json({message:'No events found'});
    }
    return res.status(200).json({message:'Events fetched successfully',events})

  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}

exports.deleteEvent=async(req,res)=>{
  const id=req.params.id;
  try{
    const event=await Event.findByIdAndDelete(id);
    if(!event){
      return res.status(404).json({message:'Event not found'});
    }
    return res.status(200).json({message:'Event deleted successfully',event })

  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}
exports.updateEvent=async(req,res)=>{
  const id=req.params.id;
  try{
    const {title,description,shortDescription,date,location}=req.body;
    const event=await Event.findById(id,{title,description,shortDescription,date,location});
    if(!title || !description || !shortDescription || !date || !location){
      return res.status(400).json({message:'All fields are required'})
    }
    const eventUpdate=await Event.findByIdAndUpdate(id,{title,description,shortDescription,date,location},{new:true});
    if(!eventUpdate){
      return res.status(404).json({message:'Event not found'});
    }
    if(eventUpdate){ 
      return res.status(200).json({message:'Event updated successfully',eventUpdate })
    }
   
  }
  catch(error){
    return res.status(500).json({message:'Internal Server Error',error:error.message})
  }
}