var express = require('express');
var router = express.Router();
let fs = require('fs')
let contentJSON = require('./content.json')

let content = contentJSON.content
let title = contentJSON.title
let side = contentJSON.frontSide

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title, content, side });
})
.post('/', (req, res, next)=>{
  console.log(req.body)
  content = req.body.content
  res.render('index', { title, content, side})
})

module.exports = router;