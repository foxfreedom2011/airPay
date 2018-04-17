var a = new Array;
a[0] ='22'
 a[1] ='33'
var c =a.join('&');
console.log(c)

// 转变成 key=value&key=value
var m = new Map();

m.set('name','xiaoming');
m.set('sex','man')
var str ='';
var i = 0;

for (let [key, value] of m.entries()) {
    i++
    console.log(key,value);
    // str += str;
    if(i === m.size){
        str += (key+'='+value)
    }else{
        str += (key+'='+value+'&')
        
    }
  }

console.log(m)
console.log("str:"+str)