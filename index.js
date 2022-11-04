const express = require("express");
const exphbs = require("express-handlebars");
const sequelize = require("./config/connection");
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;
// Requiring our models for syncing
const { User } = require("./models");

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 2 * 60 * 60 * 1000,
    },
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);

// Static directory
app.use(express.static("public"));

const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

const userRoutes = require("./controllers/userController");
app.use("/api/users", userRoutes);
const sneakerRoutes = require("./controllers/sneakerController");
app.use("/api/sneakers", sneakerRoutes);
const frontEndRoutes = require("./controllers/frontEndController");
app.use(frontEndRoutes);

app.get("/get-session", (req, res) => {
  res.json(req.session);
});

app.get("/setcolor/:color", (req, res) => {
  req.session.favColor = req.params.color;
  res.json(req.session);
});

app.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out !")
})

sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
