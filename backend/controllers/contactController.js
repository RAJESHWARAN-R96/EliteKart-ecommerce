import contactModel from "../models/contactModel.js";

// Function for submitting a new contact query
const submitContact = async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        const contactData = {
            name,
            email,
            subject,
            message,
            date: Date.now()
        };

        const contact = new contactModel(contactData);
        await contact.save();

        res.json({ success: true, message: "Message Sent Successfully" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// Function for admin to list all contact queries
const listContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find({});
        res.json({ success: true, contacts });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

export { submitContact, listContacts };
