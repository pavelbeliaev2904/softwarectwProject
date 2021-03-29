const db = require("../models");
module.exports = function(app) {
  //Homepage 
  app.get("/", function(req, res) {
    if(req.cookies.user != undefined){
      console.log(req.cookies.user)
      res.render("loggedIndex", {
        data: req.cookies.user
      });
    } else {
      res.render("index");
  }

  });

  app.get("/credits", function(req, res) {
    res.render("credits");
  })

  //Sign Up
  app.get("/signup", function(req, res) {
    res.render("signup");
  })

  //Log In
  app.get("/login", function(req, res) {
    res.render("login");
  })

  app.get("*", function(req, res) {
    res.render("404");
  });







  
};