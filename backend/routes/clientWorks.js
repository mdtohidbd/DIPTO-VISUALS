import express from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all client works (public)
router.get('/', async (req, res) => {
  try {
    const clientWorks = await db.getClientWorks();
    return res.json(clientWorks);
  } catch (error) {
    console.error('Fetch client works error:', error);
    return res.status(500).json({ message: 'Failed to fetch client works.' });
  }
});

// POST add a client work (protected)
router.post('/', auth, async (req, res) => {
  const { title, description, image, link, buttonText, techStack } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const newWork = await db.saveClientWork({
      title,
      description,
      image,
      link,
      buttonText: buttonText || 'View Live Project',
      techStack: Array.isArray(techStack) ? techStack : []
    });
    return res.status(201).json(newWork);
  } catch (error) {
    console.error('Add client work error:', error);
    return res.status(500).json({ message: 'Failed to add client work.' });
  }
});

// PUT update a client work (protected)
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { title, description, image, link, buttonText, techStack } = req.body;

  if (!title || !description) {
    return res.status(400).json({ message: 'Title and description are required.' });
  }

  try {
    const updatedWork = await db.saveClientWork({
      id,
      title,
      description,
      image,
      link,
      buttonText: buttonText || 'View Live Project',
      techStack: Array.isArray(techStack) ? techStack : []
    });
    return res.json(updatedWork);
  } catch (error) {
    console.error('Update client work error:', error);
    return res.status(500).json({ message: 'Failed to update client work.' });
  }
});

// DELETE a client work (protected)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteClientWork(id);
    return res.json({ message: 'Client work deleted successfully.' });
  } catch (error) {
    console.error('Delete client work error:', error);
    return res.status(500).json({ message: 'Failed to delete client work.' });
  }
});

export default router;
