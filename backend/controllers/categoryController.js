const Category = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (err) {
    res.status(500).json({ message: "Error fetching categories" });
  }
};

exports.addCategory = async (req, res) => {
  try {
    const { name, itemCount } = req.body;
    const imageUrl = req.file?.path;

    const category = new Category({ name, itemCount, imageUrl });
    await category.save();

    res.status(201).json(category);
  } catch (err) {
    res.status(500).json({ message: "Error adding category" });
  }
};

exports.editCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, itemCount } = req.body;
    const imageUrl = req.file?.path;

    const updated = await Category.findByIdAndUpdate(
      id,
      { name, itemCount, ...(imageUrl && { imageUrl }) },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating category" });
  }
};
