import { Request, Response } from "express";
import Contact from "../../DB/models/contact.js";
import { emailEvent } from "../../common/utils/emails/email.event.js";


export const getAllContacts = async (req: Request, res: Response, next: Function) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
};





export const deleteContact = async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        return next(new Error("Contact not found!"));
    }
    await Contact.findByIdAndDelete(id);
    res.status(200).json({ message: "Contact deleted successfully!" });
}






export const deleteAllContacts = async (req: Request, res: Response, next: Function) => {
    await Contact.deleteMany();
    res.status(200).json({ message: "All contacts deleted successfully!" });
}








export const createContact = async (req: Request, res: Response, next: Function) => {
    const contact = new Contact(req.body);
    await contact.save();
    console.log(`Contact created: ${contact}`);

    emailEvent.emit("sendMessage", {email: contact.email, name: contact.name, phone: contact.phone, description: contact.message});

    res.status(201).json(contact);
};










export const updateContact = async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    const contact = await Contact.findById(id);
    if (!contact) {
        return next(new Error("Contact not found!"));
    }
    const { name, email, phone, message } = req.body;

    if (name) contact.name = name;
    if (email) contact.email = email;
    if (phone) contact.phone = phone;   
    if (message) contact.message = message;

    await contact.save();

    res.status(200).json(contact);
}


