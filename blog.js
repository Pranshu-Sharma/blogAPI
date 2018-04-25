var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({

  title        : {type:String,default:'',required:true},
  subTitle     : {type:String,default:'',required:true},
  blogBody     : {type:String,default:''},
  created      : {type:Date},
  lastModified : {type:Date},
  authorInfo   : {}

});

var blogModel = module.exports = mongoose.model('Blog', blogSchema);

mongoose.model('Blog',blogSchema);

module.exports.findBlogs = (callback, limit) => {
	blogModel.find(callback).limit(limit);
}
