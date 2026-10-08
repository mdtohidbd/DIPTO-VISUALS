import express from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all projects (public)
router.get('/', async (req, res) => {
  try {
    const projects = await db.getProjects();
    return res.json(projects);
  } catch (error) {
    console.error('Fetch projects error:', error);
    return res.status(500).json({ message: 'Failed to fetch projects.' });
  }
});

// POST add a project (protected)
router.post('/', auth, async (req, res) => {
  const { title, desc, image, videoUrl, category, aspectRatio, duration, views, tools, live, github } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const newProject = await db.saveProject({
      title,
      desc,
      image,
      videoUrl,
      category,
      aspectRatio,
      duration,
      views,
      tools,
      live,
      github
    });
    return res.status(201).json(newProject);
  } catch (error) {
    console.error('Add project error:', error);
    return res.status(500).json({ message: 'Failed to add project.' });
  }
});

// PUT update a project (protected)
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, desc, image, videoUrl, category, aspectRatio, duration, views, tools, live, github } = req.body;

  if (!title || !desc) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const updatedProject = await db.saveProject({
      id,
      title,
      desc,
      image,
      videoUrl,
      category,
      aspectRatio,
      duration,
      views,
      tools,
      live,
      github
    });
    return res.json(updatedProject);
  } catch (error) {
    console.error('Update project error:', error);
    return res.status(500).json({ message: 'Failed to update project.' });
  }
});

// DELETE a project (protected)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteProject(id);
    return res.json({ message: 'Project deleted successfully.' });
  } catch (error) {
    console.error('Delete project error:', error);
    return res.status(500).json({ message: 'Failed to delete project.' });
  }
});

export default router;
