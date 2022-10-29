//File name: faculties.js
//Author: Zeenath Razak
//Date: October 27, 2022
// modules required for routing
//---------------------------------------

let express = require("express");
let router = express.Router();
let mongoose = require("mongoose");
const faculties = require("../models/faculties");

// define the faculty model
let faculty = require("../models/faculties");

/* GET faculties List page. READ */
router.get("/", (req, res, next) => {
  // find all faculties in the faculties collection
  faculty.find((err, faculties) => {
    if (err) {
      return console.error(err);
    } else {
      res.render("faculties/index", {
        title: "Faculties",
        faculties: faculties,
      });
    }
  });
});

//  GET the faculty Details page in order to add a new faculty
router.get("/add", (req, res, next) => {
let faculties=faculty({});
//Show Add page when you click Add
//res.render("faculties/add",{title:"Add a faculty"});
res.render('faculties/details)',{title: 'Add a new faculty', faculties:faculties
})

// POST process the faculty  Details page and create a new faculty  - CREATE
router.post("/add", (req, res, next) => {
  
  //Create new faculty data on mongo Atlas
  let new_faculty = faculty({
    //Facultyid: req.body.Facultyid,
    //Facultyname: req.body.Facultyname,
    //Department:req.body.Department,
    //Subject: req.body.Subject
    "Id": req.body.Facultyid,
    "Name": req.body.Facultyname,
    "Department":req.body.Department,
    "Subject": req.body.Subject

});
//Create new data
faculty.create(new_faculty,(err,new_faculty)=>{
  if(err){
    console.log(err);
    res.end(err);
  }else{
    //if no error, it will update faculty list
    res.redirect("/faculties")
  }
});
});
});

// GET the faculty  Details page in order to edit an existing faculty
router.get("/:id", (req, res, next) => {
    
let id = req.params.id;
//find matching id from parameters
  faculty.findById(id, (err, facultiestoedit)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      //if no error, show the info to edit
      res.render("faculties/details",{id: "Edit Faculty", faculties: facultiestoedit});
    }
  })
  });


// POST - process the information passed from the details form and update the document
router.post("/:id", (req, res, next) => {
 
   let id = req.params.id; 

   let updatedFaculty = faculty({
    _id: id,
    Facultyid: req.body.Facultyid,
    Facultyname: req.body.Facultyname,
    Department: req.body.Department,
    Subject: req.body.Subject
});
//update the info of faculty using id
faculty.updateOne({_id:id}, updatedFaculty,(err)=>{
  if(err){
    console.log(err);
    res.end(err);
  }else{
    res.redirect("/faculties/details");
}
});
});

// GET - process the delete
router.get("/delete", (req, res, next) => {
  
  //retrieve by faculty name
  let Facultyname = req.params.Facultyname;
  faculty.remove({Facultyname}, (err)=>{
    if(err){
      console.log(err);
      res.end(err);
    }else{
      res.redirect("/faculties");
    }
  })
});


module.exports = router;
