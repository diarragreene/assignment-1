import Koa from 'koa';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';
import fs from 'fs';
import path from 'path';
import assignment from "./assignment-1";

const app = new Koa();
const router = new Router();

app.use(cors());
app.use(bodyParser());

const filePath = path.resolve(__dirname, './../mcmasteful-book-list.json');
console.log("Loading books from:", filePath);

let books: {
  name: string;
  author: string;
  description: string;
  price: number;
  image: string;
}[] = [];

try {
  books = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log("Books loaded successfully");
} catch (error) {
  console.error("Error loading books:", error);
}


router.get('/books', (ctx) => {
  ctx.body = books;
});


router.get('/books/filter', (ctx) => {
const raw = ctx.query['filters[]'] ?? ctx.query.filters;
const rawFilters = typeof raw === 'string' ? [raw] : Array.isArray(raw) ? raw : [];


  if (!rawFilters || rawFilters.length === 0) {
    ctx.body = books;
    return;
  }

  const filters = rawFilters.map(f => {
    const filter: { from?: number; to?: number } = {};
    const parts = f.split(',').map(p => p.split(':'));
    for (const [key, value] of parts) {
      if (key === 'from') filter.from = Number(value);
      if (key === 'to') filter.to = Number(value);
    }
    return filter;
  });

  const filteredBooks = books.filter(book =>
    filters.some(filter =>
      (filter.from === undefined || book.price >= filter.from) &&
      (filter.to === undefined || book.price <= filter.to)
    )
  );

  ctx.body = filteredBooks;
});

// Start server
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = 3000;
app.listen(PORT, () => {
  console.log(` Server running at http://localhost:${PORT}`);
});