require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");
var seniorSeed = require("./seeders/seniorSeed");
var taskSeed = require("./seeders/taskSeed");
var volunteerSeed = require("./seeders/volunteerSeed");

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars boilerplate code
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",

    // Test
    helpers: {
      ifCond: function (v1, v2, options) {
        if (v1 === v2) {
          return options.fn(this);
        }
        return null;
      },
    },
  })
);
app.set("view engine", "handlebars");

// Routes - both html and api routes js files
require("./routes/htmlRoutes")(app);
require("./routes/portfolio")(app);
require("./routes/contact")(app);

var syncOptions = { force: false };

if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

if (process.env.NODE_ENV === "production") {
  syncOptions.force = false;
}

// Starting the server, syncing our models -& seeding tables initially------------/
db.sequelize.sync(syncOptions).then(function () {
  db.Senior.destroy({
    where: {},
    truncate: true,
  }).then(function () {
    db.Senior.bulkCreate(seniorSeed);
  });
  db.Volunteer.destroy({
    where: {},
    truncate: true,
  }).then(function () {
    db.Volunteer.bulkCreate(volunteerSeed);
  });
  db.Task.destroy({
    where: {},
    truncate: true,
  }).then(function () {
    db.Task.bulkCreate(taskSeed);
  });

  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
