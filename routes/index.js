var express = require('express');
var router = express.Router();

const login = require('./login');

//회원
const home = require('./user/home.js');
const product = require('./user/product.js');
const productDetail = require('./user/productDetail.js');
const cart = require('./user/cart.js');
const insertCart = require('./user/insertCart.js');
const payment = require('./user/payment.js');
//관리자
const adminMain = require('./admin/main.js');
const adminInsertProduct = require('./admin/insertProduct.js');

router.use('/', (req,res,next) => {
    console.log(req.url)
    if(req.url == '/' || req.url == '/login' || req.url == '/user/home') {
        console.log("세션 검사 하지않는 페이지")
        next();
    } else {                                            // 로그인 페이지 이외의 페이지에 진입하려고 하는 경우
        if(req.session.user) {
            // console.log("세션이 있다.")
            next();                        // user와 admin이 같은 페이지를 이용할 때 구분해줘야 할 때
        } else {
            // console.log("세션이 없다.")
            res.send("<script>alert('로그인이 필요합니다.');location.href='/'</script>");
        }
    }
});

// 로그인
router.use('/', login);

// 회원
router.use('/user/home', home);
router.use('/user/product', product);
router.use('/user/productDetail', productDetail);
router.use('/user/cart', cart);
router.use('/user/insertCart', insertCart);
router.use('/user/payment', payment);
// 관리자
router.use('/admin/main', adminMain);
router.use('/admin/insertProduct', adminInsertProduct);
module.exports = router;
