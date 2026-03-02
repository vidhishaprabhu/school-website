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
      .json({ message: `Thank you ${name} for contacting us!`, contact: newContact });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal Server error", error: err.message });
  }
};
