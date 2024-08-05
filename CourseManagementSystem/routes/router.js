const express=require("express")
const  myrouter=express.Router()
const connection=require('../db/dbconnection')

//handle all urls

//fetch all courses

myrouter.get("/courses",function(req,res){
    connection.query("select * from courses",function(err,data,fields){
       if(err){
           res.status(500).send("data not found")
       }
       else{
         //display all course details
           res.status(200).render("displaycourses",{corsdata:data})
       }
    })
})

// display empty form to add courses from addcourses.ejs
myrouter.get("/addcourseform", function(req,resp){
    resp.render("add_course")
})


//add new course in database
myrouter.post("/insertcourse",function(req,res){
    console.log(req.body);
   connection.query("insert into courses (cid, cname, fees, duration) values(?,?,?,?)",[req.body.cid,req.body.cname,req.body.fees,req.body.duration],function(err,result){
   if(err){
    console.log(err);
    res.status(500).send("data not insered")
   }
   else{
    //request will be redirected to produts url to show table
    if(result.affectedRows>0){
    res.redirect("/courses")
    }

   }
   })
})

// display empty form to add courses from addcourses.ejs
myrouter.get("/addcourseform", function(req,resp){
    resp.render("editcourse")
})
/*
//update new object in the database
myrouter.put("/editcourse/:id",function(req,res){
console.log("cid: ",req.params.id);
    connection.query("update courses set cname=?, fees=?,duration=? where cid=?",[req.body.cname,req.body.fees,req.body.duration,req.params.cid],function(err,result){
       if(err){
       console.log(err);
           res.status(500).send("data not found")
       }
       else{
           //will return the data in json format
        if(result.affectedRows>0){
           res.redirect("/courses")
          }
       }
    })
})
   */ 

//delete the  object in the database
myrouter.get("/deletecourse/:id",function(req,res){
    console.log("cid: ",req.params.id);
    connection.query("delete from courses where cid=?",[req.params.id],function(err,result){
       if(err){
        console.log(err);
           res.status(500).send("data not deleted")
       }
       else{
           //will return the data in json format
           if(result.affectedRows>0){
           res.redirect("/courses")
           }
       }
    })
})


module.exports=myrouter

