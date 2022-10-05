var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('product');
});

router.get('/detail', function(req, res, next) {
  res.render('productDetail');
});

module.exports = router;
