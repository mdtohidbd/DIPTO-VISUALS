import express from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET all testimonials (public)
router.get('/', async (req, res) => {
  try {
    const testimonials = await db.getTestimonials();
    return res.json(testimonials);
  } catch (error) {
    console.error('Fetch testimonials error:', error);
    return res.status(500).json({ message: 'Failed to fetch testimonials.' });
  }
});

// POST add a testimonial (protected)
router.post('/', auth, async (req, res) => {
  const { name, role, rating, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ message: 'Name and text are required.' });
  }

  try {
    const newTestimonial = await db.saveTestimonial({
      name,
      role: role || 'Client',
      rating: Number(rating) || 5,
      text
    });
    return res.status(201).json(newTestimonial);
  } catch (error) {
    console.error('Add testimonial error:', error);
    return res.status(500).json({ message: 'Failed to add testimonial.' });
  }
});

// PUT update a testimonial (protected)
router.put('/:id', auth, async (req, res) => {
  const { id } = req.params;
  const { name, role, rating, text } = req.body;

  if (!name || !text) {
    return res.status(400).json({ message: 'Name and text are required.' });
  }

  try {
    const updatedTestimonial = await db.saveTestimonial({
      id,
      name,
      role: role || 'Client',
      rating: Number(rating) || 5,
      text
    });
    return res.json(updatedTestimonial);
  } catch (error) {
    console.error('Update testimonial error:', error);
    return res.status(500).json({ message: 'Failed to update testimonial.' });
  }
});

// DELETE a testimonial (protected)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteTestimonial(id);
    return res.json({ message: 'Testimonial deleted successfully.' });
  } catch (error) {
    console.error('Delete testimonial error:', error);
    return res.status(500).json({ message: 'Failed to delete testimonial.' });
  }
});

export default router;
