import express from 'express';
// import Career from '../models/Career.js'; // REMOVE
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Get all careers
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('careers').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get a single career by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('careers').select('*').eq('id', req.params.id);
    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(data[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create a new career
router.post('/', async (req, res) => {
  try {
    const { title, category, description, salary, growth, demand, duration, skills, icon, color } = req.body;
    const { data, error } = await supabase.from('careers').insert([{ title, category, description, salary, growth, demand, duration, skills, icon, color }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 