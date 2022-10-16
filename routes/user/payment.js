var express = require('express');
var router = express.Router();
var oracledb = require('oracledb');
oracledb.autoCommit = true;
const {
    ORACLE_CONFIG
} = require("../../config/db");

// 결제 페이지로 이동
router.post('/', async function(req, res, next) {
  // console.log(req.body.cartChk)
  const cartChk = JSON.parse("[" + req.body.cartChk + "]")
  const buyProduct = await selectCartProduct(cartChk)
  console.log(buyProduct)
    // res.render('admin/insertProduct', {
    //    title: '관리자' 
    //   });
  });

// 결제 후 구매 신청
router.post('/buyProduct',  async function(req, res, next) {

  const param = [req.body.productName, paths[0], req.body.productPrice, req.body.productDetail, req.body.productCount, req.body.productDiv]
  await insertProduct(param)

  res.send("<script>alert('정상적으로 등록이 완료되었습니다.');location.href='/admin/main'</script>");
});
    
// 상품 등록
async function selectCartProduct(cartChk) {
  var param = []
    for(i=0; i<cartChk.length; i++){
      param.push(cartChk[i])
    }

  let connection = await oracledb.getConnection(ORACLE_CONFIG);
  
  var sql = "SELECT * FROM CARTPRODUCT WHERE CARTPRODUCT_ID = :cartChk "

  if(cartChk.length > 1){

    for(j=0; j<cartChk.length-1; j++){
      sql += " OR CARTPRODUCT_ID = :cartChk"
    }

  }

  let options = {
      outFormat: oracledb.OUT_FORMAT_OBJECT   // query result format
    };

  let result = await connection.execute(sql, param, options)
  
  await connection.close();

  return result.rows;

}

module.exports = router;
