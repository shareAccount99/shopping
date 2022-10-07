var express = require('express');
var router = express.Router();
router.get('/', function(req, res, next) {
    res.render('admin/insertProduct', {
       title: '관리자' 
      });
  });
  
module.exports = router;
