import express from 'express';
import db from '../db.js';
import auth from '../middleware/auth.js';

const router = express.Router();

// GET active theme settings (public endpoint for frontend & admin preview)
router.get('/theme', async (req, res) => {
  try {
    const theme = await db.getTheme();
    res.json(theme);
  } catch (error) {
    console.error('Failed to get theme settings:', error);
    res.status(500).json({ message: 'Failed to retrieve theme settings' });
  }
});

// PUT update theme settings (protected route for admin)
router.put('/theme', auth, async (req, res) => {
  try {
    const { presetId, name, bgPrimary, bgSurface, accentPrimary, accentSecondary, glowIntensity, bgStyle } = req.body;
    const updated = await db.saveTheme({
      presetId,
      name,
      bgPrimary,
      bgSurface,
      accentPrimary,
      accentSecondary,
      glowIntensity,
      bgStyle
    });
    res.json(updated);
  } catch (error) {
    console.error('Failed to update theme settings:', error);
    res.status(500).json({ message: 'Failed to update theme settings' });
  }
});

// GET site profile and content configuration (public endpoint)
router.get('/config', async (req, res) => {
  try {
    const config = await db.getSiteConfig();
    res.json(config);
  } catch (error) {
    console.error('Failed to get site config:', error);
    res.status(500).json({ message: 'Failed to retrieve site configuration' });
  }
});

// PUT update site profile and content configuration (protected route for admin)
router.put('/config', auth, async (req, res) => {
  try {
    const updated = await db.saveSiteConfig(req.body);
    res.json(updated);
  } catch (error) {
    console.error('Failed to update site config:', error);
    res.status(500).json({ message: 'Failed to update site configuration' });
  }
});

export default router;
