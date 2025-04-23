const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Environment variables
const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/student_feedback';
const SECRET = process.env.SECRET || 'mysecret';

// MongoDB connection
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Models
const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
});
const User = mongoose.model('User', UserSchema);

const FeedbackSchema = new mongoose.Schema({
  name: String,
  feedback: String,
});
const Feedback = mongoose.model('Feedback', FeedbackSchema);

// Routes

// Register
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({ username, password: hashedPassword });
  await user.save();
  res.send({ message: 'User registered' });
});

// Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(401).send({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).send({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, SECRET);
  res.send({ token });
});

// Submit Feedback
app.post('/submit-feedback', async (req, res) => {
  const { name, feedback } = req.body;
  const fb = new Feedback({ name, feedback });
  await fb.save();
  res.send({ message: 'Feedback submitted' });
});

// Get all feedbacks
app.get('/feedbacks', async (req, res) => {
  const feedbacks = await Feedback.find();
  res.send(feedbacks);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
