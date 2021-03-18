var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let content = ""
  res.render('index', { title: 'Express', content });
})
.post('/', (req, res, next)=>{
  console.log(req.body)
  let content = req.body.content
  res.render('index', {title: 'Bongo', content})
})

module.exports = router;
