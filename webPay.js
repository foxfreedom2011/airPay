var express = require('express')
var router = express.Router()
// var request = require('request')
// 转码
// var iconv = require('iconv-lite');
var airPay_config = require('./airPay-config')
const charset = require('superagent-charset');
const request = require('superagent');
charset(request);
// 发起请求
var app = express();
// 定义配置
// 主要的url
var url = 'https://openapi.alipay.com/gateway.do';
var sign_ = 'GKvibu/dZUnNGLFcy114NT0TTY+OXxwI4YEENWCu3b3UV1bKHVGEufTEXrJ4JCRm9sO4RMmxJY9+ny/5YUR/ZFiyeCSS5zTmhpjD/3HOsIissb+f2QTVHIFOSFvxn4UMiIcwaCYx8FpgoJJQLNSLWika1pM5SXwVpiw29pgvqf+8TSocXVGIiExsi0bxIaC6aoOeyGcwxBIYojWK0SS1VPlj0SpKwiEuEWw1xPLFfjqXFn0/STUqeyEHuiikD0d7NLDbUHOsbMkrrLEz1yDQULc8jRMqtR6GeKp5dzLuDLoLhNOptygNLN3RXV2h7ziSB5Z9+qYVueTPOMgT+x47rw=='
// var timestemp_= airPay_config.time();
// var biz_content_ = airPay_config.biz_function();

// 第一步请求
var airPay_data  = new Map();

airPay_data.set('app_id',airPay_config.AirPay_api.app_id);
airPay_data.set('method','alipay.trade.wap.pay');
airPay_data.set('charset','utf-8');
airPay_data.set('sign_type','RSA2');
airPay_data.set('sign',sign_);
airPay_data.set('timestamp',airPay_config.time());
airPay_data.set('version','1.0');
airPay_data.set('notify_url','http://wusiqing.com:3000/airpay');
airPay_data.set('biz_content',airPay_config.biz_function());

// 生成字符串

    // 存放参数链接
var str = '';
var i = 0;

for(let [key,value] of airPay_data.entries()){
    i++;    
    console.log(key,value);

    if(i === airPay_data.size){
        str += (key+'='+value)
    }else{
        str += (key+'='+value+'&')
    }
}

console.log('\n\nstr:'+str)


// 生成sign




//  链接请求的url和后面的参数
var url_ = url+'?'+str;
// 按照chaset进行编码,对中文进行编码
var encode_url = encodeURI(url_);
console.log('\n\n进行encoude之后的url:'+encode_url)






app.get('/airpay_test',function(req,res,next){
    request
    .post(encode_url)
    .charset('gbk')
    .end((error, response) => {
        console.log(response);
        console.log(response.text);
        res.send(response.text)
        console.log('\n\ndone!\n\n');            
    });

})

app.listen(3000)


