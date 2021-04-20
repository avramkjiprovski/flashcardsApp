var express = require('express');
var router = express.Router();
let fs = require('fs')
let dataJSON = require('../data/data.json');
let updateData = require('../controllers/updateData');
let readData = require('../controllers/readData')
let nextCard = require('../controllers/nextCard')

  // TO-DO
  // [x] - :id/:number
  // [x] - content data needs to be taken from data.json and not content.json
  // [x] - when user hits "save", take what they have written and record it in data.json

let card_number = 0
let condition = 0
let sideCard = 'front'
let lastCard = dataJSON.cards.length

/* GET home page. */
router.get('/', function(req, res, next) { // normal starter/landing page
  card_number = 0
  readData('./data/data.json', function(data) {
    /* use returned data here */
    condition = 0
    sideCard = "front"
    let dataJSON = JSON.parse(data)
    console.log("in first ever get:", dataJSON)
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard })
  });
})
.get('/edit/:sideCard/:id', (req,res,next) => { // page with parameters
  
    condition = "edit"
    if(req.params.sideCard == "front"){
      readData('./data/data.json', function(data) {    
        let dataJSON = JSON.parse(data)
        console.log("in edit:", dataJSON)
        console.log("req params in edit: ", req.params.id)
        
        sideCard = "front"
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.frontContent, 
          side: dataJSON.cards[card_number].attributes.frontIndicator, 
          card_number, 
          condition, 
          sideCard})
      })
    }else if(req.params.sideCard == "back"){
      readData('./data/data.json', function(data){
        /* use returned data here */
    
        let dataJSON = JSON.parse(data)
        console.log("in edit:", dataJSON)
        
        sideCard = "back"
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.backContent, 
          side: dataJSON.cards[card_number].attributes.backIndicator, 
          card_number, 
          condition, 
          sideCard})
      })
    }
})
// end of next
.get('/flip/:sideCard/:id', (req,res,next) => { // page with parameters // FLIP

      console.log("flip req params:", req.params.card_number)
      console.log("flip card number:", card_number)
      console.log("flip card id:", dataJSON.cards[card_number].id)
      condition = 0

      if(req.params.sideCard == "back"){
        sideCard = "front"
          res.render('index', { 
            title: dataJSON.cards[card_number].attributes.title, 
            content: dataJSON.cards[card_number].attributes.frontContent, 
            side: dataJSON.cards[card_number].attributes.frontIndicator, 
            card_number, 
            condition, 
            sideCard})      
      }else if(req.params.sideCard == "front"){
        sideCard = "back"
          res.render('index', { 
            title: dataJSON.cards[card_number].attributes.title, 
            content: dataJSON.cards[card_number].attributes.backContent, 
            side: dataJSON.cards[card_number].attributes.backIndicator, 
            card_number, 
            condition, 
            sideCard})
        }
      
}) //end of flip
.get('/add/:sideCard/:id', (req,res,next) => { // page with parameters // ADD
    sideCard = "front"
    condition = 0
    lastCard = dataJSON.cards.length
    let newCard =
      {
        "type":"flashcard",
        "id":"0",
        "attributes":{
          "title":"Flashcards",
          "frontContent":"Click edit and type your question here...",
          "backContent":"Click edit and type your answer here...",
          "frontIndicator":"Question/Front Side",
          "backIndicator":"Answer/Back Side"
        }
      }
      dataJSON.cards.push(newCard)
      dataJSON.cards[lastCard].id = lastCard+""
      console.log(dataJSON.cards[lastCard])
      card_number = lastCard

      updateData('./data/data.json', dataJSON)
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard })
})
.get('/remove/:sideCard/:id', (req,res,next) => { // page with parameters
  // if(req.params.command == "remove"){ // remove
    for(let i = 0; i < dataJSON.cards.length; i++){
      if(nextCard(dataJSON, card_number)){
        dataJSON.cards[i] = dataJSON.cards[i+1]
      }else{
        card_number--
      }
    }
    dataJSON.cards.pop()
    lastCard--
    updateData('./data/data.json', dataJSON)
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard })
  // }
  // end of remove
  
})
.get('/next/:sideCard/:id', (req,res,next) => { // page with parameters
    console.log("in next segment before condition:", dataJSON.cards[card_number].attributes)
    if(!nextCard(dataJSON, card_number)){ 
      console.log("in next segment during condition:", dataJSON.cards[card_number])
      res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard })
    }
    if(nextCard(dataJSON, card_number)){
      console.log("in next segment after condition:", dataJSON.cards[card_number].attributes)
      ++card_number
      res.render('index', { 
        title: dataJSON.cards[card_number].attributes.title, 
        content: dataJSON.cards[card_number].attributes.frontContent, 
        side: dataJSON.cards[card_number].attributes.frontIndicator, 
        card_number, 
        condition, 
        sideCard })
    }
})
  // end of next
.get('/previous/:sideCard/:id', (req,res,next) => { // page with parameters
    if(card_number != 0) card_number--
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard })
})
.post('/save/:sideCard/:id', (req, res, next) => {
    console.log("req.params.id vo post:", req.params.id)
    condition = 0
    if(req.params.sideCard == "front"){
      dataJSON.cards[req.params.id].attributes.frontContent = req.body.card_content
      sideCard = "front"
      updateData('./data/data.json', dataJSON)
      res.render('index', { 
        title: dataJSON.cards[card_number].attributes.title, 
        content: dataJSON.cards[card_number].attributes.frontContent, 
        side: dataJSON.cards[card_number].attributes.frontIndicator, 
        card_number, 
        condition, 
        sideCard }) 
    }else if(req.params.sideCard == "back"){
      dataJSON.cards[card_number].attributes.backContent = req.body.card_content
      sideCard = "back"
      updateData('./data/data.json', dataJSON)
      res.render('index', { 
        title: dataJSON.cards[card_number].attributes.title, 
        content: dataJSON.cards[card_number].attributes.backContent, 
        side: dataJSON.cards[card_number].attributes.backIndicator, 
        card_number, 
        condition, 
        sideCard }) 
    }
})

module.exports = router;