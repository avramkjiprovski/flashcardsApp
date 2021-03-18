var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
.post('/', (req, res, next)=>{
  console.log(req.body)
  res.render('index', {title: 'Bongo'})
})

module.exports = router;
