import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import { MongoClient } from 'mongodb';

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

const uri = 'mongodb://mongo:27017'; // from docker-compose service name
const client = new MongoClient(uri);
const dbName = 'bookstore';

type Book = {
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
};

let books: Book[] = [];

async function loadBooks() {
  try {
    await client.connect();
    const db = client.db(dbName);
    books = await db.collection<Book>('books').find().toArray();
    console.log("Books loaded from MongoDB");
  } catch (error) {
    console.error("Error loading books from DB:", error);
  }
}

router.get('/books', (ctx) => {
  ctx.body = books;
});

router.get('/books/filter', (ctx) => {
  try {
    const raw = ctx.query['filters[]'] ?? ctx.query.filters;
    const rawFilters = typeof raw === 'string' ? [raw] : Array.isArray(raw) ? raw : [];

    if (!rawFilters.length) {
      ctx.body = books;
      return;
    }

    const filters = rawFilters.map((f) => {
      const filter: { from?: number; to?: number } = {};
      const parts = f.split(',').map((p) => p.split(':'));
      for (const [key, value] of parts) {
        if (key === 'from') filter.from = Number(value);
        if (key === 'to') filter.to = Number(value);
      }
      return filter;
    });

    const filteredBooks = books.filter((book) =>
      filters.some(
        (filter) =>
          (filter.from === undefined || book.price >= filter.from) &&
          (filter.to === undefined || book.price <= filter.to)
      )
    );

    ctx.body = filteredBooks;
  } catch (err) {
    ctx.status = 500;
    ctx.body = { error: 'Failed to filter books' };
  }
});

(async () => {
  await loadBooks();

  app.use(router.routes());
  app.use(router.allowedMethods());

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
})();
