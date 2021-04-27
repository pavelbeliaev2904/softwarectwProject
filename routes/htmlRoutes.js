const db = require("../models");
const api = require("../helpers/api");
module.exports = function (app) {
  //Homepage
  app.get("/", function (req, res) {
    if (req.cookies.user != undefined) {
      res.render("loggedIndex", {
        data: req.cookies.user,
      });
    } else {
      res.render("index");
    }
  });

  app.get("/credits", function (req, res) {
    res.render("credits");
  });

  //Sign Up
  app.get("/signup", function (req, res) {
    if (req.cookies.user != undefined) {
      res.render("index");
    } else {
      res.render("signup");
    }
    
  });

  //Log In
  app.get("/login", function (req, res) {
    if (req.cookies.user != undefined) {
      res.render("index");
    } else {
      res.render("login");
    }
    
  });

  app.get("/stations", function (req, res) {
    if (req.cookies.user != undefined) {
      api
      .getStations()
      .then(function (response) {
        response.data.result = response.data.result.slice(0, 10);

        res.render("stations", {
          data: response.data.result,
          userData: req.cookies.user
        });
      })
      .catch((err) => {
        if (err) throw err;
      });
    } else {
      res.render("index");
    }

  });

  app.get("/stations/:id", function (req, res) {
    api
      .getArrivalsTimesById(req.params.id)
      .then(function (responseArrivals) {
        let currentTime = new Date().toLocaleTimeString("en-GB", {
          hour: "numeric",
          minute: "numeric",
        });
        const time = currentTime.split(":");
        let hrMin = [time[0], time[1]];
        let nextTwoHours = api.fixArrivals(responseArrivals.data.result, hrMin);
        responseArrivals.data.result.arrivals = nextTwoHours;
        if (req.cookies.user != undefined) {
          res.render("station", {
            data: responseArrivals.data.result,
            userData: req.cookies.user,
          });
        } else {
          res.render("index");
        }
   
      })
      .catch((err) => {
        if (err) throw err;
      });
  });

  app.get("/bytime", function (req, res) {
    if (req.cookies.user != undefined) {
      res.render("stationsbytime", {
        userData: req.cookies.user,
      });
    } else {
      res.render("index");
    }
    
  });

  app.get("/bytime/:hr/:min", function(req, res) {
    api.getArrivalsByTime(req.params.hr, req.params.min).then(function(response) {
      response.data.result = response.data.result.slice(0, 10); 
      res.render("stationsbytime", {
        data: response.data.result
      });
    }).catch((err) => {
      if (err) throw err 
    });
  });

  app.get("*", function (req, res) {
    res.render("404");
  });
};
