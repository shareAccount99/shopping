var express = require('express');
var router = express.Router();

var oracledb = require('oracledb');
const {
    ORACLE_CONFIG
} = require("../../config/db");

router.get('/', async function(req, res, next) {
  results = await selectProduct();
  console.log(results)
  res.render('user/home', {
     title: 'home',
     results: results
    });
});

//select
async function selectProduct() {

  let connection = await oracledb.getConnection(ORACLE_CONFIG);

  let binds = {};
  let options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format
    };

  let result = await connection.execute("select * from product", binds, options);

  // console.log(result.rows);
  
  await connection.close();

  console.log(result.rows)
  return result.rows;
}

module.exports = router;
