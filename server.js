var http = require('http');
var fs = require('fs');

const promisefy = function(file) {
    return new Promise((resolve,reject)=>{
        fs.readFile(file, 'utf-8', function(err, data) {
            if (err) return reject(err);
            return resolve(data);
        });
    })
}
promisefy('package-lock.json').then(data => {
    console.log(data);
    http.createServer(function (request, response) {

        // 发送 HTTP 头部
        // HTTP 状态值: 200 : OK
        // 内容类型: text/plain
        //'Access-Control-Allow-Origin': '*'解决跨域的问题
        response.writeHead(200, {'Content-Type': 'text/plain', 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'max-age=86400', 'ETag': 'aaa'});
        // response.setHeader('ETag', 'ranwenqi');
        response.end(data);
    }).listen(8888);
});


// 终端打印如下信息
console.log('Server running at http://127.0.0.1:8888/');