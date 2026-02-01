
import express from 'express';
const router = express.Router();
const books = [
  { id: 1, title: 'Sample Book', author_id: 1, category_id: 1, published_year: 2020 }
];
let nextId = 2;

// Get all books
router.get('/', (req, res) => {
  res.json(books);
});

// Add a new book
router.post('/', (req, res) => {
  const book = { id: nextId++, ...req.body };
  books.push(book);
  res.status(201).json(book);
});

// Get a specific book
router.get('/:bookId', (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.bookId));
  if (!book) return res.sendStatus(404);
  res.json(book);
});

// Update a book
router.put('/:bookId', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.bookId));
  if (idx === -1) return res.sendStatus(404);
  books[idx] = { ...books[idx], ...req.body };
  res.json(books[idx]);
});

// Delete a book
router.delete('/:bookId', (req, res) => {
  const idx = books.findIndex(b => b.id === parseInt(req.params.bookId));
  if (idx === -1) return res.sendStatus(404);
  books.splice(idx, 1);
  res.sendStatus(204);
});

export default router;
