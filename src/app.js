
import express from 'express';
import bodyParser from 'body-parser';
import booksRouter from './routes/books.js';
import authorsRouter from './routes/authors.js';
import categoriesRouter from './routes/categories.js';

const app = express();
app.use(bodyParser.json());

app.use('/books', booksRouter);
app.use('/authors', authorsRouter);
app.use('/categories', categoriesRouter);

if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
