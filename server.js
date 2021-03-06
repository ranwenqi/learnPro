var http = require('http');
var fs = require('fs');

// http.createServer(function (request, response) {

//     // 发送 HTTP 头部
//     // HTTP 状态值: 200 : OK
//     // 内容类型: text/plain
//     response.writeHead(200, {'Content-Type': 'text/plain'});
//     response.setHead( 'Access-Control-Allow-Origin', '*');

//     // 发送响应数据 "Hello World"
//     response.end('Hello World\n');
// }).listen(8888);

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
promisefy('package-lock.json').then(data => {
    http.createServer(function (request, response) {
        // response.setHead('Access-Control-Allow-Origin', '*');
        response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=86400', 'ETag': 'bbb'});
        response.end(data);

        // if(request.headers['if-none-match'] == 'aaa') {
        //     console.log(111);
        //    response.writeHead(304, {'Content-Type': 'text/plain', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=86400', 'ETag': 'aaa'});
        //     response.end('数据没有改变');
        // } else {
        //    response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=86400', 'ETag': 'bbb'});
        //    response.end(data);
        // }
    }).listen(8888);
});


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');