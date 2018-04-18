exports.AirPay_api = {
    app_id:'2018040902527144',
    // app_pravice:'',
    // app_public:'',
    // airPay_public:''
}
// json化biz_content的内容

exports.biz_function = function(){
    var outTradeId = Date.now().toString();
    
    biz_content = {
        body:'这是测试数据',
        subject:'陌生人饭局v2.0',
        // 交易单号；
        out_trade_no:outTradeId,

        total_amount:'0.01',
        product_code:'QUICK_MSECURITY_PAY',
    }
    var json_ = JSON.stringify(biz_content);
    console.log(json_)
    return json_;
}

// 格式化时间
exports.time = function(){
    var now = new Date();
    var timeFm = date2str(now,'yyyy-MM-dd hh:mm:ss')
    console.log('timeFm:'+timeFm+'\n');
    return timeFm;
}
// 格式化时间
function date2str(x, y) {
    var z = {
        y: x.getFullYear(),
        M: x.getMonth() + 1,
        d: x.getDate(),
        h: x.getHours(),
        m: x.getMinutes(),
        s: x.getSeconds(),
        ms: x.getMilliseconds()
    };
    return y.replace(/(y+|M+|d+|h+|m+|s+|ms+)/g, function(v) {
        return ((v.length > 1 ? "0" : "") + eval('z.' + v.slice(-1))).slice(-(v.length > 2 ? v.length : 2))
    });
}