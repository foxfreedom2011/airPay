var express = require('express')
var router = express.Router()
// var request = require('request')
// 转码
// var iconv = require('iconv-lite');
// var airPay_config = require('./airPay-config')
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
// 发起请求
var app = express();
// 定义配置
// 主要的url
var url = 'https://openapi.alipay.com/gateway.do';
var path = require('path');
var Alipay = require('alipay-node-sdk');
 
var outTradeId = Date.now().toString();
 
 
var ali = new Alipay({
    
    appId: '2018040902527144',

    notifyUrl: 'https://openapi.alipay.com/gateway.do',
    rsaPrivate: path.resolve('../key/rsa_private_key.pem'),
    rsaPublic: path.resolve('../key/rsa_public_key.pem'),
    // sandbox: true,
    signType: 'RSA2'
});

 
//生成支付参数供客户端使用 
var params = ali.pay({
    subject: '测试商品',
    body: '测试商品描述',
    outTradeId: outTradeId,
    // timeout: '10m',
    amount: '0.01',
    goodsType: '0'
});
console.log("\nsdds:\n"+params);



var url_ = url+'?'+params;
console.log('url:'+url_)
var encode_url = encodeURI(url_);

app.get('/airpay_test',function(req,res,next){
    request
    .post(encode_url)
    .charset('gbk')
    .end((error, response) => {
        // console.log(response);
        console.log(response.text);
        res.send(response.text)
        console.log('\n\ndone!\n\n');            
    });

})

//查询交易状态 
ali.query({
    outTradeId: outTradeId
}).then(function (ret) {
    console.log("***** ret.body=" + ret.body);
    
    //签名校验 
    var ok = ali.signVerify(ret.json());
    console.log('\n\nok:'+ok+'\n\n')
    console.log('交易：'+outTradeId)
});

app.listen(3400)
