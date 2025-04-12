const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getCategories, addCategory, editCategory } = require('../controllers/categoryController');
const auth = require('../middleware/authMiddleware');

// Configure multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

router.get('/', auth, getCategories);
router.post('/', auth, upload.single('image'), addCategory);
router.put('/:id', auth, upload.single('image'), editCategory);

module.exports = router;
