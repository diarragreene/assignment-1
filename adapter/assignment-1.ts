export interface Book {
    name: string,
    author: string,
    description: string,
    price: number,
    image: string,
};

async function listBooks(filters?: Array<{from?: number, to?: number}>) : Promise<Book[]>{
   
    let query = filters?.map(({from, to}, index) => {
        let result = "";
        if (from) {
            result += `&filters[${index}][from]=${from}`;
        }
        if (to) {
            result += `&filters[${index}][to]=${to}`
        }
        return result;
    }).join("&") ?? "";

   
    let result = await fetch(`http://localhost:3000/books?${query}`);

    if (result.ok) {
        return (await result.json() as Book[]);
    } else {
        console.log("Failed to fetch books: ", await result.text())
        throw new Error("Failed to fetch books");
    }
}

const assignment = "assignment-1";

export default {
    assignment,
    listBooks
};