const db = require("../models");
module.exports = function(app) {

  //Create User
  app.post("/users", function(req, res) {
    var data = req.body
    var objectSchema = {
      username: data.username.trim(),
      password: data.password.trim(),
    }
    db.Users.findOne({username: objectSchema.username
    }).then(function(data){
     
      if(data != null){
        if(data.length != 0){
          res.json({
            msg: "This username or email already exists in the database"
          })
        } 
      } else {
        db.Users.create(objectSchema).then(function(userData){
          res.json({
            msg: "Welcome to NYC TrainApp, " + userData.username
          })

         }).catch(function(err){
           res.json({msg: "Database error"})
           console.log(err)
         });
      }
    })

  })



  //Create Authentification Route
  app.post("/login", function(req, res) {
    db.Users.findOne({
      username: req.body.username
    }).then(function(data){
      if(data != null){
        if(req.body.password === data.password){
          var userData = {
            user: data.username,
          }
          res.cookie("user", userData, {maxAge: 36000000});
          res.json({
            msg: "Credentials are correct, redirecting to homepage.",
          })
        } else {
          res.json({
            msg: "Either username or password is not correct."
          })
        }
      } else {
        res.json({
          msg: "Either username or password is not correct."
        })
      }
    }).catch(function(err){
      res.json({msg: "Database error"})
      console.log(err)
    });
  });






  
  

}





