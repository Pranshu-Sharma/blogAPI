var express = require('express');
var app = express();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');



var mongoose = require('mongoose');


app.use(bodyParser.json({limit:'10mb',extended:true}));
app.use(bodyParser.urlencoded({limit:'10mb',extended:true}));


var dbPath = "mongodb://localhost/myblogapp";

db = mongoose.connect(dbPath);



mongoose.connection.once('open', function(){
  console.log("database connection open success");
});


var Blog = require('./blog.js');

var blogModel = mongoose.model('Blog');

app.get('/', function(req,res){
    res.send("This is a blog application");
});

app.get('/blogs',function(req,res){

  blogModel.findBlogs(function(err,result){
    if(err){
      res.send(err);
    }
    else{
      res.send(result);
    }

  });
});




app.get('/blogs/:id',function(req,res){

    blogModel.findOne({'_id':req.params.id},function(err,result){
      if(err){
        console.log("some error");
        res.send(err);
      }
      else{
        res.send(result)
      }
    });
});


app.post('/blog/create',function(req,res){

   var newBlog = new blogModel({

     title    : req.body.title,
     subTitle : req.body.subTitle,
     blogBody : req.body.blogBody

   });

   var today = Date.now();
   newBlog.created = today;

   var authorInfo = {fullName: req.body.authorFullName,email:req.body.authorEmail}
   newBlog.authorInfo = authorInfo;

   newBlog.save(function(error){
     if(error){
       console.log(error);
       res.send(error);
     }
     else{
       res.send(newBlog);
     }

   });
});


app.put('/blogs/:id/edit',function(req,res){

  var update = req.body;

  blogModel.findOneAndUpdate({'_id':req.params.id},update,function(err,result){
    if(err){
      console.log("some error");
      res.send(err);
    }
    else{
      res.send(result)
    }
  });
});

app.post('/blogs/:id/delete',function(req,res){

  blogModel.remove({'_id':req.params.id},function(err,result){
    if(err){
      console.log("some error");
      res.send(err);
    }
    else{
      res.send(result)
    }
  });
});


app.listen(3000);
console.log('Listening on port 3000...');
