
let mysql = require('mysql2')
let express = require('express');
let app = express();
let port = 7800;
let dbPort = 9000;

var dbCon = mysql.createConnection({
    host : "127.0.0.1",
    port : "3306", 
    user : "root",
    password: "Qwerty11!"
});

dbCon.connect((err) => {
    if (err) throw err;
    console.log("db Connected");
});

app.use(express.static('public'));



app.get('/:dynamic', (req, res) => {
    let { dynamic} = req.params
    res.status(200).json({info : 'test'})
});

app.listen(port, () => console.log('server running...'));


