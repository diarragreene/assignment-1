import books from './../mcmasteful-book-list.json';

export interface Book {
    name: string,
    author: string,
    description: string,
    price: number,
    image: string,
};

async function listBooks(filters?: Array<{from?: number, to?: number}>) : Promise<Book[]>{
        if (!filters || filters.length === 0) {
        return books; // No filters, return all books
        }
        console.log("running listBooks")
        return books.filter(book =>
         filters.some(filter =>
            (filter.from === undefined || book.price >= filter.from) &&
            (filter.to === undefined || book.price <= filter.to)
         )
     );
    throw new Error("Todo")
}

const assignment = "assignment-1";

export default {
    assignment,
    listBooks
};
