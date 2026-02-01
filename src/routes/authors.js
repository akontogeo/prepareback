
import express from 'express';
const router = express.Router();
const authors = [
  { id: 1, name: 'John Doe' }
];
let nextId = 2;

// Get all authors
router.get('/', (req, res) => {
  res.json(authors);
});

// Add a new author
router.post('/', (req, res) => {
  const author = { id: nextId++, ...req.body };
  authors.push(author);
  res.status(201).json(author);
});

// Get a specific author
router.get('/:authorId', (req, res) => {
  const author = authors.find(a => a.id === parseInt(req.params.authorId));
  if (!author) return res.sendStatus(404);
  res.json(author);
});

// Update an author
router.put('/:authorId', (req, res) => {
  const idx = authors.findIndex(a => a.id === parseInt(req.params.authorId));
  if (idx === -1) return res.sendStatus(404);
  authors[idx] = { ...authors[idx], ...req.body };
  res.json(authors[idx]);
});

// Delete an author
router.delete('/:authorId', (req, res) => {
  const idx = authors.findIndex(a => a.id === parseInt(req.params.authorId));
  if (idx === -1) return res.sendStatus(404);
  authors.splice(idx, 1);
  res.sendStatus(204);
});

export default router;
