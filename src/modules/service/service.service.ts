import { Request, Response } from "express";
import Service from "../../DB/models/service.js";

export async function createService(req: Request, res: Response, next: Function) {
    const { title, description, features } = req.body;

    const existingService = await Service.findOne({ title });
    if (existingService) {
        return next(new Error("Service with this title already exists!"));
    }

    const newService = new Service({
        title,
        description,
        features
    });

    await newService.save();

    res.status(201).json({ message: "Service created successfully", service: newService });
}


export async function updateService(req: Request, res: Response, next: Function) {
    const { id } = req.params;
    const { title, description, features } = req.body;
    const service = await Service.findById(id);
    if (!service) {
        return next(new Error("Service not found!"));
    }
    if (title) service.title = title;
    if (description) service.description = description;
    if (features) service.features = features;
    await service.save();
    res.status(200).json(service);
}


export async function deleteService(req: Request, res: Response, next: Function) {
    const { id } = req.params;
    const service = await Service.findById(id);
    if (!service) {
        return next(new Error("Service not found!"));
    }
    await Service.findByIdAndDelete(id);
    res.status(200).json({ message: "Service deleted successfully!" });
}


export async function getAllServices(req: Request, res: Response, next: Function) {
    const services = await Service.find().sort({ createdAt: -1 });
    res.status(200).json(services);
}