const express = require('express');
const app = express();
const mysql = require('mysql');
const url = require('url')
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '956479002qq',     // 改成你自己的密码
    database: 'mysql'    // 改成你的数据库名称
});

connection.connect();

// 下面是解决跨域请求问题
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By",' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
 });

// 这里就是主要要修改的地方，其实也就一行
// 把 address 改成你自己定的地址，就是连接访问的那个地址
app.get('/address',function(req,res){
    console.log(req.url)
    const sql = `select * from train t where t.time_begin >= "${req.query.bTime}" and t.time_begin <= "${req.query.eTime}"`;
    connection.query(sql,function(err,result){
        if(err){
            console.log('[SELECT ERROR] - ', err.message);
            return;
        }
        res.json(result); 
    }); 
})

var server = app.listen(8081, '127.0.0.1', function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("地址为 http://%s:%s", host, port);
})