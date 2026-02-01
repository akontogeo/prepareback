import http from "node:http";
import test from "ava";
import got from "got";
import app from "../src/app.js";


test.before(async (t) => {
	t.context.server = http.createServer(app);
    const server = t.context.server.listen();
    const { port } = server.address();
	t.context.got = got.extend({ responseType: "json", prefixUrl: `http://localhost:${port}` });
});

test.after.always((t) => {
	t.context.server.close();
});


//Authors

test("GET /authors", async (t) => {
	const {statusCode, headers } = await t.context.got.get("authors");
	t.is(statusCode, 200);
    t.is(headers["content-type"], "application/json; charset=utf-8");
});


test("GET /authors/:authorId 200", async (t) => {
    const res=await t.context.got.get("authors/1");
    t.is(res.statusCode, 200);
    console.log(res.body);
    t.deepEqual(res.body, { id: 1, name: 'John Doe' });
 
});

test("POST /authors", async (t) => {
    const authorData = { name: "Jane Smith" };
    const {statusCode, body } = await t.context.got.post("authors", { json: authorData });
    t.is(statusCode, 201);
    t.deepEqual(body, { id: 2, ...authorData });
});

test("PUT /authors/:authorId", async (t) => {
    const updatedData = { name: "Jane Doe" };
    const {statusCode, body } = await t.context.got.put("authors/2", { json: updatedData });
    t.is(statusCode, 200);
    t.deepEqual(body, { id: 2, ...updatedData });
});


test("DELETE /authors/:authorId ", async (t) => {
    const sendStatus=await t.context.got.delete("authors/1");

    t.is(sendStatus.statusCode, 204);
});



//Categories
test("GET /categories", async (t) => {
    const {statusCode, headers } = await t.context.got.get("categories");
    t.is(statusCode, 200);
    t.is(headers["content-type"], "application/json; charset=utf-8");
});
test ("GET /categories/:categoryId 200", async (t) => {
    const res=await t.context.got.get("categories/1");
    t.is(res.statusCode, 200);
    console.log(res.body);
    t.deepEqual(res.body, { id: 1, name: 'Fiction' });
});
test("DELETE /categories/:categoryId ", async (t) => {
    const sendStatus=await t.context.got.delete("categories/1");    
    t.is(sendStatus.statusCode, 204);
});

test("POST /categories", async (t) => {
    const categoryData = { name: "Science" };
    const {statusCode, body } = await t.context.got.post("categories", { json: categoryData });
    t.is(statusCode, 201);
    t.deepEqual(body, { id: 2, ...categoryData });
});

test("PUT /categories/:categoryId", async (t) => {
    const catData = { name: "Science Fiction" };
    const {statusCode, body } = await t.context.got.put("categories/2", { json: catData });
    t.is(statusCode, 200);
    t.deepEqual(body, { id: 2, ...catData });
});


//Books
test("GET /books", async (t) => {
    const {statusCode, headers } = await t.context.got.get("books");
    t.is(statusCode, 200);
    t.is(headers["content-type"], "application/json; charset=utf-8");
});     

test ("GET /books/:bookId 200", async (t) => {
    const res=await t.context.got.get("books/1");
    t.is(res.statusCode, 200);
    console.log(res.body);
    t.deepEqual(res.body, { id: 1, title: 'Sample Book', author_id: 1, category_id: 1, published_year: 2020 });
});

test("POST /books", async (t) => {
    const bookData = { title: "New Book", author_id: 2, category_id: 2, published_year: 2023 };
    const {statusCode, body } = await t.context.got.post("books", { json: bookData });
    t.is(statusCode, 201);
    t.deepEqual(body, { id: 2, ...bookData });
}   );  


test("DELETE /books/:bookId ", async (t) => {
    const sendStatus=await t.context.got.delete("books/1");    
    t.is(sendStatus.statusCode, 204);
});