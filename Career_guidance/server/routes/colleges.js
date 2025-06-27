import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// Get all colleges
router.get('/', async (req, res) => {
  try {
    const { data, error } = await supabase.from('colleges').select('*');
    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch colleges' });
  }
});

// JWT auth middleware for colleges
function collegeAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.college = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Get current college profile
router.get('/me', collegeAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('colleges').select('*').eq('id', req.college.collegeId);
    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: 'College not found' });
    const college = data[0];
    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch college profile' });
  }
});

// Get a single college by ID
router.get('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('colleges').select('*').eq('id', req.params.id);
    if (error) throw error;
    if (data.length === 0) return res.status(404).json({ error: 'Not found' });
    const college = data[0];
    res.json(college);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch college' });
  }
});

// Create a new college
router.post('/', async (req, res) => {
  try {
    const { name, country, description } = req.body;
    const { data, error } = await supabase.from('colleges').insert([{ name, country, description }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Update a college
router.put('/:id', async (req, res) => {
  try {
    const { name, country, description, students, location, type, tuition, acceptanceRate, established, website, phone, topPrograms, testimonials } = req.body;
    const { data, error } = await supabase.from('colleges').update({ name, country, description, students, location, type, tuition, acceptanceRate, established, website, phone, topPrograms, testimonials }).eq('id', req.params.id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: err.message });
  }
});

// Delete a college
router.delete('/:id', async (req, res) => {
  try {
    const { data, error } = await supabase.from('colleges').delete().eq('id', req.params.id).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'College deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete college' });
  }
});

// College signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, country, description, students, location, type, tuition, acceptanceRate, established, website, phone, topPrograms } = req.body;
    if (!name || !email || !password || !country) {
      return res.status(400).json({ error: 'All required fields must be filled' });
    }
    const { data: existing, error: findError } = await supabase.from('colleges').select('*').eq('email', email);
    if (findError) throw findError;
    if (existing && existing.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.from('colleges').insert([{ name, email, password: hashedPassword, country, description, students, location, type, tuition, acceptanceRate, established, website, phone, topPrograms }]).select();
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// College login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { data, error } = await supabase.from('colleges').select('*').eq('email', email);
    if (error) throw error;
    if (!data || data.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const college = data[0];
    const isMatch = await bcrypt.compare(password, college.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ collegeId: college.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    res.json({ token, college });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// Delete current college account
router.delete('/me', collegeAuth, async (req, res) => {
  try {
    const { data, error } = await supabase.from('colleges').delete().eq('id', req.college.collegeId).select();
    if (error) throw error;
    if (!data || data.length === 0) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Account deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete account' });
  }
});

export default router; 