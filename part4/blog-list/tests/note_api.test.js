const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "blog1",
    author: "felix",
    url: "www.google.com",
    likes: 10,
  },
  {
    title: "blog2",
    author: "felix1",
    url: "www.googles.com",
    likes: 20,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("id is defined", async () => {
  const response = await api.get("/api/blogs");
  const ids = response.body.map((blog) => blog.id);
  ids.forEach((id) => expect(id).toBeDefined());
});

test("creating a new blog post increases total blogs by 1", async () => {
  const testBlog = {
    title: "blog3",
    author: "felix3",
    url: "www.google.com",
    likes: 40,
  };
  await api.post("/api/blogs", testBlog);
  const response = await api.get("/api/blogs");
  console.log(response.body.length);
  expect(response.body).toHaveLength(initialBlogs.length + 1);
});

afterAll(async () => await mongoose.connection.close());
