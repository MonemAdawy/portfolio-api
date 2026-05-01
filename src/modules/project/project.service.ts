import e, { Request, Response } from "express";
import Project from "../../DB/models/project.js";
import { env } from "process";
import cloudinary from "../../common/file uploading/cloudinary.config.js";

export const getProjects = async (req: Request, res: Response, next: Function) => {
  const projects = await Project.find();
  res.status(200).json(projects);
};

// export const updateProject = async (req: Request, res: Response, next: Function) => {
//   const { id } = req.params;
//   const project = await Project.findById(id);
//   if (!project) {
//     return next(new Error("Project not found!"));
//   }
//   if (req.files && (req.files as Express.Multer.File[]).length > 0) {
//     const cloudFolder = `${env.CLOUD_ROOT_FOLDER}/project/${req.body.title || project.title}`;
//     const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
//       cloudinary.uploader.upload(file.path, {
//         folder: cloudFolder,
//       })
//     );
//     const results = await Promise.all(uploadPromises);
//     const uploadedImages = results.map((result) => ({
//       secure_url: result.secure_url,
//       public_id: result.public_id,
//     }));
//     project.images.push(...uploadedImages);
//   }
//   await project.save();
//   res.status(200).json(project);
// };

export const updateProject = async (req: Request, res: Response, next: Function) => {
    const { id } = req.params;
    const project = await Project.findById(id);
    
    if (!project) {
      return next(new Error("Project not found!"));
    }
    
    // Update basic fields
    if (req.body.title) project.title = req.body.title;
    if (req.body.description) project.description = req.body.description;
    
    // Parse and update techStack if provided
    if (req.body.techStack) {
      let techStack = req.body.techStack;
      if (typeof techStack === 'string') {
        try {
          techStack = JSON.parse(techStack);
        } catch (e) {
          techStack = techStack.split(',').map((s: string) => s.trim()).filter((s: string) => s);
        }
      }
      project.techStack = techStack;
    }
    
    // Parse and update links if provided
    if (req.body.links) {
      let links = req.body.links;
      if (typeof links === 'string') {
        try {
          links = JSON.parse(links);
        } catch (e) {
          links = { github: '', live: '' };
        }
      }
      project.links = links;
    }
    
    // Handle new images
    if (req.files && (req.files as Express.Multer.File[]).length > 0) {
      const cloudFolder = `${env.CLOUD_ROOT_FOLDER}/project/${req.body.title || project.title}`;
      const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
        cloudinary.uploader.upload(file.path, {
          folder: cloudFolder,
        })
      );
      const results = await Promise.all(uploadPromises);
      const uploadedImages = results.map((result) => ({
        secure_url: result.secure_url,
        public_id: result.public_id,
      }));
      project.images.push(...uploadedImages);
    }
    
    await project.save();
    res.status(200).json(project);
};






export const deleteProject = async (req: Request, res: Response, next: Function) => {
  const { id } = req.params;
  const project = await Project.findById(id);
  if (!project) {
    return next(new Error("Project not found!"));
  }
  const deletePromises = project.images.map((image) =>
    cloudinary.uploader.destroy(image.public_id)
  );
  await Promise.all(deletePromises);
  await Project.findByIdAndDelete(id);
  res.status(200).json({ message: "Project deleted successfully!" });
};


export const deleteProjectImage = async (req: Request, res: Response, next: Function) => {
  const { public_id, project_id } = req.query;
  console.log(`Deleting image with public_id: ${public_id} from project_id: ${project_id}`);
  const project = await Project.findById(project_id);
  if (!project) {
    return next(new Error("Project not found!"));
  } 
  const image = project.images.find((img) => img.public_id === public_id);
  if (!image) {
    return next(new Error("Image not found in project!"));
  }
  await cloudinary.uploader.destroy(public_id as string);
  project.images = project.images.filter((img) => img.public_id !== public_id);
  await project.save();
  res.status(200).json({ message: "Image deleted successfully!" });
}

// export const createProject = async (req: Request, res: Response, next: Function) => {

//   console.log(`Received project creation request with title: ${req.body.title}`);
//   if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
//     return next(new Error("No file uploaded!"))
//   }

//   const existingProject = await Project.findOne({ title: req.body.title });
//   if (existingProject) {
//     return next(new Error("Project with this title already exists!"));
//   }

//   const cloudFolder = `${env.CLOUD_ROOT_FOLDER}/project/${req.body.title}`;

//   const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
//     cloudinary.uploader.upload(file.path, {
//       folder: cloudFolder,
//     })
//   );

//   const results = await Promise.all(uploadPromises);

//   const uploadedImages = results.map((result) => ({
//     secure_url: result.secure_url,
//     public_id: result.public_id,
//   }));

//   const project = new Project({
//     ...req.body,
//     images: uploadedImages,
//   });

//   await project.save();

//   res.status(201).json(project);
// };








export const createProject = async (req: Request, res: Response, next: Function) => {
    console.log(`Received project creation request with title: ${req.body.title}`);
    
    // Parse JSON strings from form data
    let techStack = req.body.techStack;
    let links = req.body.links;
    
    // Parse techStack if it's a string
    if (typeof techStack === 'string') {
      try {
        techStack = JSON.parse(techStack);
      } catch (e) {
        // If parsing fails, treat as comma-separated string
        techStack = techStack.split(',').map((s: string) => s.trim()).filter((s: string) => s);
      }
    }
    
    // Parse links if it's a string
    if (typeof links === 'string') {
      try {
        links = JSON.parse(links);
      } catch (e) {
        links = { github: '', live: '' };
      }
    }
    
    // Validate required fields
    if (!req.body.title || !req.body.description) {
      return next(new Error("Title and description are required!"));
    }
    
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      return next(new Error("At least one image is required!"));
    }

    const existingProject = await Project.findOne({ title: req.body.title });
    if (existingProject) {
      return next(new Error("Project with this title already exists!"));
    }

    const cloudFolder = `${env.CLOUD_ROOT_FOLDER}/project/${req.body.title}`;

    const uploadPromises = (req.files as Express.Multer.File[]).map((file) =>
      cloudinary.uploader.upload(file.path, {
        folder: cloudFolder,
      })
    );

    const results = await Promise.all(uploadPromises);

    const uploadedImages = results.map((result) => ({
      secure_url: result.secure_url,
      public_id: result.public_id,
    }));

    const project = new Project({
      title: req.body.title,
      description: req.body.description,
      techStack: techStack,
      links: links,
      images: uploadedImages,
    });

    await project.save();

    res.status(201).json(project);
};