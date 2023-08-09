const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const session = require("express-session");
const helpers = require("./utils/helpers");

const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const crypto = require('crypto');

const app = express();
const PORT = process.env.PORT || 3001;

const sessionConfig = {
  secret: crypto.randomBytes(64).toString('base64').replace(/\W/g, ''),
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24, // 1 day
  },
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sessionConfig));

const hbs = exphbs.create({ helpers });

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public/")));

app.use(require("./controllers/"));

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log("Now listening"));
});

//Create sessions object, contains encrypted secret timeout, needs to be passed to express-session. This will create a cookie for the session