import express from "express";
import bodyParser from "body-parser";

var posts = [{title: "Random Fact", description: "The world's oldest cat lived to 38 years and three days old."}, {title: "Random Fact", description: "Flamingoes aren't born pink. They come into the world with grey/white feathers."}];
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000, () => {
    console.log("Server running on port 3000.");
});

app.get("/", (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.post("/", (req, res) => {
    posts.splice(req.query.id, 1);
    res.redirect("/");
});

app.get("/create-post", (req, res) => {
    res.render("create-post.ejs");
});

app.get("/post", (req, res) => {
    res.render("post.ejs", {title: posts[req.query.id].title, description: posts[req.query.id].description});
});

app.post("/create-post", (req, res) => {
    posts.push({title: req.body.title, description: req.body.description});
    res.redirect("/");
});

app.post("/edit-post", (req, res) => {
    res.render("edit-post.ejs", {id: req.query.id, title: posts[req.query.id].title, description: posts[req.query.id].description});
});

app.post("/update-post", (req, res) => {
    posts[req.query.id].title = req.body.title;
    posts[req.query.id].description = req.body.description;
    res.redirect("/");
});

app.get("/sign-up", (req, res) => {
    res.render("sign-up.ejs");
});

app.post("/sign-up", (req, res) => {
    res.render("index.ejs");
});