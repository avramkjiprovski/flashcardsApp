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
let content = dataJSON.cards[card_number].attributes.frontContent
let title = dataJSON.cards[card_number].attributes.title
let side = dataJSON.cards[card_number].attributes.frontSide
let condition = 0
let sideCard = 'front'
let add = 0
let lastCard = dataJSON.cards.length

/* GET home page. */
router.get('/', function(req, res, next) { // normal starter/landing page
  
  readData('./data/data.json', function(data) {
    /* use returned data here */
    
    sideCard = "front"
    let dataJSON = JSON.parse(data)
    console.log(dataJSON)
    
    card_number = 0
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard,
      command: req.params.command })
  });
  
})
.get('/:command/:sideCard/:id', (req,res,next) => { // page with parameters
  console.log(`Vtor get: /:command/:sideCard/${req.params.id}`)
  
  
  
  if(req.params.command == "edit"){ // EDIT

    if(req.params.sideCard == "front"){
      readData('./data/data.json', function(data) {    
        let dataJSON = JSON.parse(data)
        console.log("in edit:", dataJSON)
        
        card_number = req.params.id

        condition = "edit"
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.frontContent, 
          side: dataJSON.cards[card_number].attributes.frontIndicator, 
          card_number, 
          condition, 
          sideCard: req.params.sideCard,
          command: req.params.command})
      })
    }else if(req.params.sideCard == "back"){
      readData('./data/data.json', function(data) {
        /* use returned data here */
    
        let dataJSON = JSON.parse(data)
        console.log("in edit:", dataJSON)
        
        card_number = req.params.id
        condition = "edit"
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.backContent, 
          side: dataJSON.cards[card_number].attributes.backIndicator, 
          card_number, 
          condition, 
          sideCard: req.params.sideCard,
          command: req.params.command})
      })
    }
  }
  else if(req.params.command == "flip") { // FLIP
    // TODO
    // [x] - change sideCards value to back as well as present back-side content instead of frontSide
      console.log("flip:")
      // condition = 0
      if(req.params.sideCard == "back"){
        sideCard = "front"
      }else if(req.params.sideCard == "front"){
        sideCard = "back"
      }

      if(sideCard == "back"){

        condition = 0
        console.log("front:", sideCard)
        
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.frontContent, 
          side: dataJSON.cards[card_number].attributes.frontIndicator, 
          card_number: dataJSON.cards[card_number].id, 
          condition, 
          sideCard: "back",
          command: req.params.command})
      } else if(sideCard == "front"){
        condition = 0
        console.log("front:", sideCard)
        
        res.render('index', { 
          title: dataJSON.cards[card_number].attributes.title, 
          content: dataJSON.cards[card_number].attributes.backContent, 
          side: dataJSON.cards[card_number].attributes.backIndicator, 
          card_number: dataJSON.cards[card_number].id, 
          condition, 
          sideCard: "front",
          command: req.params.command})
      }
    
  }
  else if(req.params.command == "add"){ // ADD
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
      sideCard,
      command: req.params.command })

  }else if(req.params.command == "remove"){ // remove
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
      sideCard,
      command: req.params.command })
  }else if(req.params.command == "next"){ // next
    console.log("in next segment before condition:", dataJSON.cards[card_number].attributes)
    if(!nextCard(dataJSON, card_number)){ 
      console.log("in next segment during condition:", dataJSON.cards[card_number])
      res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard,
      command: req.params.command })
    }else{
    console.log("in next segment after condition:", dataJSON.cards[card_number].attributes)
    card_number++
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard,
      command: req.params.command })
    }

  }else if(req.params.command == "previous"){
    if(card_number != 0) card_number--
    res.render('index', { 
      title: dataJSON.cards[card_number].attributes.title, 
      content: dataJSON.cards[card_number].attributes.frontContent, 
      side: dataJSON.cards[card_number].attributes.frontIndicator, 
      card_number, 
      condition, 
      sideCard,
      command: req.params.command })
  }

})
.post('/:command/:sideCard/:id', (req, res, next) => {



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
        sideCard,
        command: req.params.command }) 
    }else if(req.params.sideCard == "back"){
      dataJSON.cards[req.params.id].attributes.backContent = req.body.card_content
      sideCard = "back"
      updateData('./data/data.json', dataJSON)
      res.render('index', { 
        title: dataJSON.cards[card_number].attributes.title, 
        content: dataJSON.cards[card_number].attributes.backContent, 
        side: dataJSON.cards[card_number].attributes.backIndicator, 
        card_number, 
        condition, 
        sideCard,
        command: req.params.command }) 
    }
  
})

module.exports = router;