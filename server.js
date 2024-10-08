import express from "express";

const app = express();
app.use(express.json());

const port = 7072;

// ==============================Blogs==========================//
const allBlogs = [];

// post
app.post("/blogs", (req, res) => {
  const userName = req.body.userName;
  const title = req.body.title;
  const image = req.body.image;
  const disc = req.body.disc;

  const blog = { id: allBlogs.length + 1, userName, title, image, disc };
  allBlogs.push(blog);
  res.json(blog);
});

// get
app.get("/blogs", (req, res) => {
  res.json(allBlogs);
});

// update
app.patch("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const { userName, title, image, disc } = req.body;
  const theBlog = allBlogs.find((b) => b.id === blogId);

  if (theBlog) {
    theBlog.userName = userName || theBlog.userName;
    theBlog.title = title || theBlog.title;
    theBlog.image = image || theBlog.image;
    theBlog.disc = disc || theBlog.disc;
    res.json(theBlog);
  } else {
    res.status(404).json({ message: "theBlog not found" });
  }
});

// delete
app.delete("/blogs/:id", (req, res) => {
  const blogId = parseInt(req.params.id);
  const blogIndex = allBlogs.findIndex((b) => b.id === blogId);
  const blog = allBlogs[blogIndex];

  allBlogs.splice(blogIndex, 1);
  res.send(blog);
});

// ==============================Register==========================//
const allUsers = [];

// post
app.post("/register", (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const theUser = allUsers.some(user=> user.username == username);

    if (!theUser) {
      const newLoginUser = {
        id: allUsers.length + 1,
        username,
        email,
        password,
      };
      allUsers.push(newLoginUser);
      res.json(newLoginUser);
    } else {
      res.send("Faild Register, The user is exist!");
    }
  });

// get
app.get("/register", (req, res) => {
  res.json(allUsers);
});

// ==============================Login==========================//

// post
app.post("/login", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
  
  const theUser = allUsers.some(user=> user.username == username && user.password == password);

      if (theUser) {
        res.send("Successfull Login, The user is exist!");
      } else {
        res.send("Faild login, The user does not exist!");
      }
    });

app.listen(port, () => {});
