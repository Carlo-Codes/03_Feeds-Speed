
let mysql = require('mysql2')
let express = require('express');
const { json } = require('express');
let app = express();
let port = 7800;
let dbPort = 9000;

var dbCon = mysql.createConnection({
    host : "127.0.0.1",
    port : "3306", 
    user : "root",
    password : "Qwerty11!",
    database : "feedsspeeds_db"
});

dbCon.connect((err) => {
    if (err) throw err;
    console.log("db Connected");
});

app.use(express.static('public'));



app.get('/toolInfo', (req, res) => {
    let data
    dbCon.query('SELECT * FROM tools;', (err, result, fields) => {
        if (err) throw err
        
        console.log(result)
        res.status(200).json(result)
    })
 
   
    
});

app.listen(port, () => console.log('server running...'));


