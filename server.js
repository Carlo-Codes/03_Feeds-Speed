
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
app.use(express.json());



app.get('/toolInfo', (req, res) => {
    
    dbCon.query('SELECT * FROM tools;', (err, result) => {
        if (err) throw err
        
        //console.log(result)
        res.status(200).send(result)
    })
});

app.get('/chiploadInfo', (req, res) => {
    
    dbCon.query('SELECT * FROM ChipLoad;', (err, result) => {
        if (err) throw err
        
        //console.log(result)
        res.status(200).send(result)
    })
});

app.post('/chippost', (req, res) => {
    

    let data = req.body
    let dataKeys = Object.keys(data)
    let mysqlFunc = "";
   
    for (let i = 1; i < dataKeys.length; i++){

        mysqlFunc += data[dataKeys[i]] + ", "
    }
    dbCon.query(`insert into ChipLoad(Material, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('${data['Material']}', ${data['2']}, ${data['4']}, ${data['6']} , ${data['8']}, ${data['10']}, ${data['12']});`, (err, res) => {
    
    })
    res.status(200);
    
});

app.listen(port, () => console.log('server running...'));


