var express = require('express')
var router = express.Router()
var request = require('request')
// 转码
var iconv = require('iconv-lite');
var airPay_config = require('./airPay-config')
// 发起请求
var app = express();
// 定义配置
// 主要的url
var url = 'https://openapi.alipay.com/gateway.do';
var sign_ = 'QY0ezURnavWed1tlrQ+aerR8mmAdDwdbU5JkK2LG/VYzWQgqoxnlQcqTQnJClIlCsA/9aVzbsl0NvrFKvPUcNnxVqO+O3auqk2vV2SaLQ10XPmRET2MlVKrnZpr6RpLmjX9oIKp0WpJOF+OyQmirkYoPPmx5cSfyAUQduDJvfsVUm1KesywrGZG+wIZCJJ0n+lN5zZN1acgQVHew/jwjQfhsv6pB1+QTqkyoN22N4G8AV0atN7Wc2Dhv1F/YVsBPmDI6wtOfKeyZpgBZZjAlz+GwfgoKGso+H5+ZJMeyYNJxbOj3LhNETqF4giLL+68d2vwpZ9Ghw78CTrsUXgIVrQ=='
// var timestemp_= airPay_config.time();
// var biz_content_ = airPay_config.biz_function();

// 第一步请求
var airPay_data  = new Map();
airPay_data.set('app_id',airPay_config.AirPay_api.app_id);
airPay_data.set('method','alipay.trade.app.pay');
airPay_data.set('charset','utf-8');
airPay_data.set('sign_type','RSA2');
airPay_data.set('sign',sign_);
airPay_data.set('timestamp',airPay_config.time());
airPay_data.set('version','1.0');
airPay_data.set('notify_url','http://www.wusiqing.com/airpay');
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

//  链接请求的url和后面的参数
var url_ = url+'?'+str;
// 按照chaset进行编码
var encode_url = encodeURI(url_);
// console.log('\n\n进行encoude之后的url:'+encode_url)





app.get('/airpay_test',function(req,res,next){
    // res.setHeader('Content-Type','text/javascript;charset=UTF-8');
    // 请求支付宝的url;
    // res.writeHead(200,{'Content-Type':'text/html;charset=utf-8'});//设置response编码为utf-8
    request.post({
        url:encode_url,
        encoding:'utf-8'
    },function(error, response, body){
        if(response.statusCode == 200){
            // res.
            // console.log(body);
            // body = iconv.encode(body,'utf8');
            // body = iconv.decode(body,'GB2312');
            body = iconv.encode(body, 'utf8')
        res.send(body)
            
            
            console.log('\n\ndone!\n\n');
        }

        // res.setHeader('charset','utf-8')
    })
    // res.send('body')
})

app.listen(3000)


