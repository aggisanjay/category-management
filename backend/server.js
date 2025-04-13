const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // static folder for images

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/categories', categoryRoutes);

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connected to MongoDB'))
  .then(() => {
    app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));
  })
  .catch((err) => console.error(err));
