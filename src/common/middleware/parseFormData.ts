


export const parseFormData = (req: any, res: any, next: any) => {
  // Parse techStack if it's a string
  if (req.body.techStack && typeof req.body.techStack === 'string') {
    try {
      req.body.techStack = JSON.parse(req.body.techStack);
    } catch (e) {
      // If parsing fails, treat as comma-separated string
      req.body.techStack = req.body.techStack.split(',').map((s: string) => s.trim()).filter((s: string) => s);
    }
  }
  
  // Parse links if it's a string
  if (req.body.links && typeof req.body.links === 'string') {
    try {
      req.body.links = JSON.parse(req.body.links);
    } catch (e) {
      req.body.links = { github: '', live: '' };
    }
  }
  
  next();
};