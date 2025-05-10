# Assignment Hints

## Book List
The book list is stored in the file `mcmasteful-book-list.json`:

```json
[
  {
    "name": "Giant's Bread",
    "author": "Agatha Christie",
    "price": 21.86
  },
  {
    "name": "Appointment with Death",
    "author": "Agatha Christie",
    "price": 19.63
  }
]
```

## Hint 1: Importing the Book List

You can import the books stored in `mcmasteful-book-list.json` into `assignment-1.ts` as follows:

```typescript
import books from'./../mcmasteful-book-list.json';
```

This will import the JSON data as an array of book objects.

## Hint 2: Working with the Books Array

Here are some common array methods you can use to manipulate the `books` array:

### 1. **Filter**: Find Books by a Specific Author

Use `filter` to return books that meet a specific condition.

Example with traditional function:
```typescript
books.filter(function(book) {
  return book.author === 'Agatha Christie';
});
```

Example with arrow function: () => {}
```typescript
const booksByAuthor = books.filter(book => book.author === 'Agatha Christie');
console.log(booksByAuthor);
```

### 2. **Map**: Create an Array of Book Titles

Use `map` to transform each book object into something else, like extracting the book titles.

```typescript
const bookTitles = books.map(book => book.name);
console.log(bookTitles);
```

### 3. **forEach**: Print Each Book Title

Use `forEach` to loop through each book and perform an action.

```typescript
books.forEach(book => {
  console.log(book.name);
});
```

### 4. **Reduce**: Calculate the Total Price of All Books

Use `reduce` to accumulate a single value from the array.

```typescript
const totalPrice = books.reduce((sum, book) => sum + book.price, 0);
console.log(totalPrice);
```

### 5. **Find**: Locate the First Book by a Specific Author

Use `find` to locate the first book that matches a certain condition.

```typescript
const firstBookByAuthor = books.find(book => book.author === 'Agatha Christie');
console.log(firstBookByAuthor);
```

### 6. **Some**: Check if Any Books Meet a Condition

Use `some` to check if any books in the list meet a certain condition.

```typescript
const hasBooksByAuthor = books.some(book => book.author === 'Agatha Christie');
console.log(hasBooksByAuthor); // Returns true or false
```

### 7. **Every**: Check if All Books Meet a Condition

Use `every` to check if all books meet a certain condition.

```typescript
const allByAuthor = books.every(book => book.author === 'Agatha Christie');
console.log(allByAuthor); // Returns true or false
```

### 8. **Sort**: Order Books Alphabetically by Title

Use `sort` to order the books based on a property.

```typescript
const sortedBooks = books.sort((a, b) => a.name.localeCompare(b.name));
console.log(sortedBooks);
```

### 9. **Filter by Price Range**: Return Books Within a Price Range

Create a function to return all books matching a specified price range.

```typescript
interface Book {
  name: string;
  author: string;
  price: number;
}

function listBooks(filters?: { from?: number; to?: number }[]): Book[] {
  if (!filters || filters.length === 0) {
    return books; // No filters, return all books
  }

  return books.filter(book =>
    filters.some(filter =>
      (filter.from === undefined || book.price >= filter.from) &&
      (filter.to === undefined || book.price <= filter.to)
    )
  );
}

// Example usage:
const filteredBooks = listBooks([{ from: 20, to: 25 }]);
console.log(filteredBooks);
```

**Explanation:**

- The `listBooks` function takes an optional array of filters.
- If no filters are provided, it returns all books.
- It uses `filter` and `some` to check if a book's price falls within any of the specified ranges.

## Additional Hints

### A. **Destructuring Objects**

Simplify your code using object destructuring.

```typescript
books.forEach(({ name, author }) => {
  console.log(`Title: ${name}, Author: ${author}`);
});
```

### B. **Using TypeScript Interfaces**

Define interfaces for better type checking and code readability.

```typescript
interface Book {
  name: string;
  author: string;
  price: number;
}

const books: Book[] = require('./../mcmasteful-book-list.json');
```

### C. **Optional Chaining**

Safely access nested object properties without worrying about `undefined` or `null`.

```typescript
const firstBookAuthor = books[0]?.author;
console.log(firstBookAuthor);
```

### D. **Nullish Coalescing Operator**

Provide default values when dealing with `null` or `undefined`.

```typescript
const bookPrice = books[0]?.price ?? 0;
console.log(bookPrice);
```

### E. **Asynchronous Functions**

If you need to perform asynchronous operations, use `async/await`.

```typescript
async function fetchBooks(): Promise<Book[]> {
  // Simulate fetching data
  return new Promise(resolve => {
    setTimeout(() => resolve(books), 1000);
  });
}

fetchBooks().then(data => console.log(data));
```

### F. **Error Handling**

Always handle potential errors, especially when working with external data.

```typescript
async function getBooks() {
  try {
    const data = await fetchBooks();
    console.log(data);
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

getBooks();
```

### G. **Template Literals**

Use template literals for easier string interpolation.

```typescript
books.forEach(book => {
  console.log(`Title: ${book.name}, Author: ${book.author}, Price: $${book.price}`);
});
```

### H. **Arrow Functions**

Use arrow functions for concise function expressions.

```typescript
const getBookNames = () => books.map(book => book.name);
console.log(getBookNames());
```

### I. **Default Parameters**

Provide default values for function parameters.

```typescript
function calculateDiscountedPrice(price: number, discount: number = 0.1): number {
  return price - price * discount;
}

console.log(calculateDiscountedPrice(100)); // Uses default discount of 10%
```

### J. **Rest and Spread Operators**

Use rest parameters and spread syntax for flexibility.

```typescript
function sumPrices(...prices: number[]): number {
  return prices.reduce((total, price) => total + price, 0);
}

const total = sumPrices(...books.map(book => book.price));
console.log(total);
```
