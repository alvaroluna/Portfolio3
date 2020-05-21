// think about the pages you want displayed, not the data to display on them

var db = require("../models");

module.exports = function (app) {

  // Index / HOME
  app.get("/", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      // render index.handlebars
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples,
      });
    });
  });


  // Portfolio
  app.get("/portfolio", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("portfolio", {
        msg: "Welcome!",
        examples: dbExamples,
      });
    });
  });


  // Contact
  app.get("/contact", function (req, res) {
    db.Example.findAll({}).then(function (dbExamples) {
      res.render("contact", {
        msg: "Welcome!",
        examples: dbExamples,
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};


// Keep as an example
{
  /*
    // Load example page and pass in an example by id
    app.get("/example/:id", function (req, res) {
      db.Example.findOne({ where: { id: req.params.id } }).then(function (
        dbExample
      ) {
        res.render("example", {
          example: dbExample,
        });
      });
    });
    

    // Load main volunteer page
    app.get("/app/:id", function(req, res) {
      //Get Volunteer Info
      db.Volunteer.findOne({
        where: {
          id: req.params.id,
        },
      }).then(function(dbVolunteer) {
        //Assign volunteer info to handlebars object
        var hbObject = {
          volunteer: dbVolunteer.dataValues
        };

        //Get all task assigned to volunteer
        db.Task.findAll({
          where: { volunteerId: req.params.id },
        }).then(function(dbTask) {
          //Assign task to handle bars object
          var completedTask = dbTask.filter(function(task) {
            return task.completed === true;
          });
          var assignedTask = dbTask.filter(function(task) {
            return task.completed === false;
          });
          hbObject.assignedTask = assignedTask;
          hbObject.completedTask = completedTask;

          //Render Page
          res.render("app", hbObject);
        });
      });
    });
  */
}