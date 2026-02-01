class Book {
  constructor({ id, title, author_id, category_id, published_year }) {
    this.id = id;
    this.title = title;
    this.author_id = author_id;
    this.category_id = category_id;
    this.published_year = published_year;
  }
}

module.exports = Book;
