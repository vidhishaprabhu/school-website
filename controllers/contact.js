const Contact = require("../models/Contact.Model");
exports.createContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    console.log(req.body);
    if (!name || !email || !phone || !subject || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newContact = new Contact({
      name,
      email,
      phone,
      subject,
      message,
    });
    await newContact.save();
    return res
      .status(201)
      .json({ message: `Thank you ${name} we will contact you soon!`, contact: newContact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error", error: err.message });
  }
};
exports.getAllContacts = async (req, res) => {
  try {
    const contacts=await Contact.find();
    if(!contacts || contacts.length===0){
      return res.status(404).json({message:"No contacts found"});
    }
    return res
      .status(201)
      .json({ message: "All Contacts retrieved successfully", contacts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error", error: err.message });
  }
}
exports.deleteContact=async(req,res)=>{
  const id=req.params.id;
  try {
    const contact=await Contact.findByIdAndDelete(id);
    if(!contact){
      return res.status(404).json({message:"Contact not found"});
    }
    return res
      .status(201)
      .json({ message: "Contact deleted successfully", contact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error", error: err.message });
  }
  
}