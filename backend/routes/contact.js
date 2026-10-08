import express from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// POST submit contact message (public)
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields (name, email, message) are required.' });
  }

  try {
    const newMessage = await db.saveMessage({ name, email, message });
    return res.status(201).json({
      message: 'Message submitted successfully!',
      data: newMessage
    });
  } catch (error) {
    console.error('Contact submit error:', error);
    return res.status(500).json({ message: 'Failed to submit message. Please try again.' });
  }
});

// GET all contact messages (protected)
router.get('/', auth, async (req, res) => {
  try {
    const messages = await db.getMessages();
    // Sort by newest first
    const sortedMessages = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return res.json(sortedMessages);
  } catch (error) {
    console.error('Fetch contact messages error:', error);
    return res.status(500).json({ message: 'Failed to fetch contact messages.' });
  }
});

// DELETE a contact message (protected)
router.delete('/:id', auth, async (req, res) => {
  const { id } = req.params;

  try {
    await db.deleteMessage(id);
    return res.json({ message: 'Message deleted successfully.' });
  } catch (error) {
    console.error('Delete message error:', error);
    return res.status(500).json({ message: 'Failed to delete message.' });
  }
});

export default router;
