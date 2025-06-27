import express from 'express';
// import User from '../models/User.js'; // REMOVE
// import College from '../models/College.js'; // REMOVE
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createClient } from '@supabase/supabase-js';

const router = express.Router();
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_KEY);

// User signup
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { data: existingUser, error: findError } = await supabase.from('users').select('*').eq('email', email);
    if (findError) throw findError;
    if (existingUser && existingUser.length > 0) {
      return res.status(409).json({ error: 'Email already in use' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const { data, error } = await supabase.from('users').insert([{ name, email, password: hashedPassword }]).select('id, name, email, isadmin, createdat');
    if (error) throw error;
    res.status(201).json(data[0]);
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: err.message });
  }
});

// User login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { data: userRes, error } = await supabase.from('users').select('*').eq('email', email);
    if (error) throw error;
    if (!userRes || userRes.length === 0) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const user = userRes[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    const { password: _, ...userObj } = user;
    res.json({ token, user: userObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin login
router.post('/admin/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    const { data: userRes, error } = await supabase.from('users').select('*').eq('email', email);
    if (error) throw error;
    if (!userRes || userRes.length === 0 || !userRes[0].isadmin) {
      return res.status(401).json({ error: 'Not an admin or invalid credentials' });
    }
    const user = userRes[0];
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user.id, isAdmin: true }, process.env.JWT_SECRET || 'secret', { expiresIn: '7d' });
    const { password: _, ...userObj } = user;
    res.json({ token, user: userObj });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// JWT auth middleware
function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }
  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret');
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Get current user
router.get('/me', auth, async (req, res) => {
  try {
    const { data: userRes, error } = await supabase.from('users').select('id, name, email, isadmin, createdat').eq('id', req.user.userId);
    if (error) throw error;
    if (!userRes || userRes.length === 0) return res.status(404).json({ error: 'User not found' });
    res.json(userRes[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Save a college
router.post('/saved-colleges/:collegeId', auth, async (req, res) => {
  try {
    // Prevent duplicates
    const { data: exists, error: existsError } = await supabase.from('saved_colleges').select('*').eq('user_id', req.user.userId).eq('college_id', req.params.collegeId);
    if (existsError) throw existsError;
    if (!exists || exists.length === 0) {
      await supabase.from('saved_colleges').insert([{ user_id: req.user.userId, college_id: req.params.collegeId }]);
    }
    const { data: saved, error: savedError } = await supabase.from('saved_colleges').select('college_id').eq('user_id', req.user.userId);
    if (savedError) throw savedError;
    res.json({ savedColleges: saved.map(r => r.college_id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Remove a saved college
router.delete('/saved-colleges/:collegeId', auth, async (req, res) => {
  try {
    await supabase.from('saved_colleges').delete().eq('user_id', req.user.userId).eq('college_id', req.params.collegeId);
    const { data: saved, error: savedError } = await supabase.from('saved_colleges').select('college_id').eq('user_id', req.user.userId);
    if (savedError) throw savedError;
    res.json({ savedColleges: saved.map(r => r.college_id) });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get saved colleges (populated)
router.get('/saved-colleges', auth, async (req, res) => {
  try {
    const { data: saved, error } = await supabase.rpc('get_saved_colleges', { user_id: req.user.userId });
    if (error) throw error;
    res.json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a test result
router.post('/test-results', auth, async (req, res) => {
  try {
    const { testName, score } = req.body;
    await supabase.from('test_results').insert([{ user_id: req.user.userId, test_name: testName, score, completed_at: new Date() }]);
    const { data: results, error } = await supabase.from('test_results').select('*').eq('user_id', req.user.userId);
    if (error) throw error;
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get test results
router.get('/test-results', auth, async (req, res) => {
  try {
    const results = await supabase.from('test_results').select('*').eq('user_id', req.user.userId);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a recommendation
router.post('/recommendations', auth, async (req, res) => {
  try {
    const { career, reason, score, recommendedColleges } = req.body;
    await supabase.from('recommendations').insert([{ user_id: req.user.userId, career, reason, score, recommended_colleges: recommendedColleges }]);
    const { data: recs, error } = await supabase.from('recommendations').select('*').eq('user_id', req.user.userId);
    if (error) throw error;
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get recommendations
router.get('/recommendations', auth, async (req, res) => {
  try {
    const { data: recs, error } = await supabase.from('recommendations').select('*').eq('user_id', req.user.userId);
    if (error) throw error;
    res.json(recs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin-only middleware
export function isAdmin(req, res, next) {
  if (!req.user || !req.user.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
}

export { auth };

export default router; 