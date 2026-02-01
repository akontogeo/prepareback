
import express from 'express';
const router = express.Router();
const categories = [
  { id: 1, name: 'Fiction' }
];
let nextId = 2;

// Get all categories
router.get('/', (req, res) => {
  res.json(categories);
});

// Add a new category
router.post('/', (req, res) => {
  const category = { id: nextId++, ...req.body };
  categories.push(category);
  res.status(201).json(category);
});

// Get a specific category
router.get('/:categoryId', (req, res) => {
  const category = categories.find(c => c.id === parseInt(req.params.categoryId));
  if (!category) return res.sendStatus(404);
  res.json(category);
});

// Update a category
router.put('/:categoryId', (req, res) => {
  const idx = categories.findIndex(c => c.id === parseInt(req.params.categoryId));
  if (idx === -1) return res.sendStatus(404);
  categories[idx] = { ...categories[idx], ...req.body };
  res.json(categories[idx]);
});

// Delete a category
router.delete('/:categoryId', (req, res) => {
  const idx = categories.findIndex(c => c.id === parseInt(req.params.categoryId));
  if (idx === -1) return res.sendStatus(404);
  categories.splice(idx, 1);
  res.sendStatus(204);
});

export default router;
