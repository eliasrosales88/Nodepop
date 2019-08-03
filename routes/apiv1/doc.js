var express = require('express');
var router = express.Router();

/* GET API documentation. */
router.get('/', function(req, res, next) {
  res.redirect('http://localhost:3001/nodepop');
});

module.exports = router;