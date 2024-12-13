const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// GET API - get artwork stats from database
router.get('/stats', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('artwork_stats')
      .select('*');
    
    if (error) throw error;
    res.json(data);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: error.message });
  }
});

// POST API - save user feedback
router.post('/feedback', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const { data, error } = await supabase
      .from('feedback')
      .insert([{ name, email, message }]);
    
    if (error) throw error;
    res.json({ success: true, data });
  } catch (error) {
    console.error('Error saving feedback:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
