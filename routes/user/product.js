var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('user/product');
});

router.get('/detail', function(req, res, next) {
  res.render('user/productDetail');
});

module.exports = router;
