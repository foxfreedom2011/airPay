
var iconv = require('iconv-lite');
var a = '你好';
// var a ='浣犲ソ'
str = iconv.encode(a,'GB2312');

str = iconv.decode(a,'utf8');
// str = str.toString();
console.log(str); 