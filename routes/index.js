var express = require('express');
var router = express.Router();
let fs = require('fs')
let contentJSON = require('./content.json')
let dataJSON = require('../models/data.json')

let content = contentJSON.content
let title = contentJSON.title
let side = contentJSON.frontSide
let card_number = 0

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title, content, side, card_number })
})
.get('/:id/:card_number', (req,res,next) => {
  
  console.log(req.params.id)
  if(req.params.id == "edit"){
    card_number = req.params.card_number
    let dataObject = dataJSON.data[card_number]
    content = dataObject.attributes.frontContent
    res.render('index', {title, content, side, card_number})
  }
  else {
    res.render('index', {title, content, side, card_number})
  }
  // zavisno od koj id e vo get request-ot, toj id kje go isprati.
  // isto taka treba da napravam hybrid getovi - na pr edit1 - [command][id] format
  

  
})
.post('/', (req, res, next)=>{
  console.log(req.body)
  content = req.body.content
  res.render('index', { title, content, side})
})

module.exports = router;