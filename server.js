var http = require('http');
var fs = require('fs');

http.createServer(function (request, response) {

    // 发送 HTTP 头部
    // HTTP 状态值: 200 : OK
    // 内容类型: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.setHead( 'Access-Control-Allow-Origin', '*');

    // 发送响应数据 "Hello World"
    response.end('Hello World\n');
}).listen(8888);

// fs.readFile('get与post的区别.txt','utf-8', function(err, data) {
//     if (err) {
//         console.log(err);
//     }else {
//         console.log(data.toString())};
// })

const promisefy = function(file) {
    return new Promise((resolve,reject)=>{
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    })
}
promisefy('get与post的区别.txt').then(data => {
    console.log(data);
});


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');