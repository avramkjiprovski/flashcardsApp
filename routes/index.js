var express = require('express');
var router = express.Router();
let fs = require('fs')
let dataJSON = require('../data/data.json');
let updateData = require('../controllers/updateData');
let readData = require('../controllers/readData')

  // TO-DO
  // [x] - :id/:number
  // [x] - content data needs to be taken from data.json and not content.json
  // [x] - when user hits "save", take what they have written and record it in data.json

let card_number = 0
let content = dataJSON.cards[card_number].attributes.frontContent
let title = dataJSON.cards[card_number].attributes.title
let side = dataJSON.cards[card_number].attributes.frontSide
let condition = 0
let sideCard = 'front'

/* GET home page. */
router.get('/', function(req, res, next) {
  readData('./data/data.json', function(data) {
    /* use returned data here */

    let dataJSON = JSON.parse(data)
    console.log(dataJSON)
    
    card_number = 0
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontSide, 
      card_number, 
      condition, 
      sideCard })
  });
  
})
.get('/:command/:sideCard/:id', (req,res,next) => {
  console.log(`Vtor get: /:command/:sideCard/${req.params.id}`)
  
  
  
  if(req.params.command == "edit"){
    readData('./data/data.json', function(data) {
      /* use returned data here */
  
      let dataJSON = JSON.parse(data)
      console.log("in edit:", dataJSON)
      
      card_number = req.params.id

      content = dataJSON.cards[card_number].attributes.frontContent
      condition = "edit"

      res.render('index', { 
        title: dataJSON.cards[card_number].attributes.title, 
        content: dataJSON.cards[card_number].attributes.frontContent, 
        side: dataJSON.cards[card_number].attributes.frontSide, 
        card_number, 
        condition, 
        sideCard })
    })
  }
  else {
    
    condition = 0
    res.render('index', {title, content, side, card_number, condition, sideCard })

  }

})
.post('/:command/:sideCard/:id', (req, res, next) => {

  condition = 0
  console.log("In post: ", req.body)
  dataJSON.cards[req.params.id].attributes.frontContent = req.body.card_content

  updateData('./data/data.json', dataJSON)

  res.render('index', { 
    title: dataJSON.cards[card_number].attributes.title, 
    content: dataJSON.cards[card_number].attributes.frontContent, 
    side: dataJSON.cards[card_number].attributes.frontSide, 
    card_number, 
    condition, 
    sideCard })  
  
})

module.exports = router;