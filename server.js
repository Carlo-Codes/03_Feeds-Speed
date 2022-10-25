
let mysql = require('mysql2');
let express = require('express');
const { json } = require('express');
let app = express();
let port = 7800;
let dbPort = 9000;
let dotenv = require('dotenv');
let jswt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

dotenv.config();
const secret = process.env.TOKEN_SECRET;

//Server functions

function createToken(credentials){
    
    let options = {
        //expiresIn: '1800s'
    }
    token = jswt.sign(credentials,secret,options)
    return token;
}

function authToken(req, res, next){
    let authheader = req.headers['auth']
    let token = authheader.split(" ")[1];
    let tokenString = toString(token)

    if (token === null) return res.status(403)

    jswt.verify(token,secret, (err, credentials) => {
        if (err) return res.status(403)
        req.auth = credentials
    })
    next()
    
};

async function authenticateCredentials(req, res, next){
    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    let username = credentials.split(":")[0]
    let password = credentials.split(":")[1]

   
    
    let db_email = ""
    let db_pswrd = ""
    let bcryptResult = false
    dbCon.query(`select * from users where email = '${username}';`, async (err, results) => {
        if(err) throw err;

        db_email =  results[0].email

        db_pswrd = results[0].pswd
    
        console.log("database email =" + db_email)
        console.log("supplied email ="+ username)
        bcryptResult = await bcrypt.compare(password,db_pswrd)
        console.log(bcryptResult)
    
        
        
        let token = ""
        let authroised = false
        if (db_email === username && bcryptResult === true){
            console.log("check has fired.")
            authroised =  true
            token = createToken(`${username}:${password}`)
        }
        
        let authPackage = {credentials:{
            username:username,
            authroised:authroised,
            token: token}}
    
        req.authPackage = authPackage
        next();

    })



}

async function storeuserdata(req, res, next){
    const saltRounds = 12
    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    let email = credentials.split(":")[0]
    let password = credentials.split(":")[1]
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        dbCon.query(`insert into users(email, pswd) values ('${email}', '${hash}');`,(err, result) => {
            if(err) throw err
        })
        console.log(hash);
        console.log(password);
    }
    )
    next();
}

//

//API
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
        if (err) return err
        
      
        res.status(200).send(result)
    })
});

app.post('/checkuserexists', (req, res) => {
    let username = req.body['username'];

    let sendresult = {}
    dbCon.query(`select exists (select * from users where email = '${username}');`, (err, results) => {
        if(err) throw err;
        let result = results[0]
        sendresult['body'] = Object.values(result)[0];
        res.status(200).send(sendresult);
        
    });
    ;
})

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

app.post('/delmatrow', (req, res) => {
    let delId = req.body['id']
    dbCon.query(`delete from chipload where id = ${delId};`)
    res.status(200);
})

app.post('/addmaterial', (req, res) =>{
    let adddata = req.body
    dbCon.query(`insert into ChipLoad(Material, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('${adddata['Material']}', ${adddata['2mm']}, ${adddata['4mm']}, ${adddata['6mm']} , ${adddata['8mm']}, ${adddata['10mm']}, ${adddata['12mm']});`, (err, res) => {
    if (err) throw err
    })
    res.status(200);
})

app.post('/newuser',storeuserdata , (req, res) => {

    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    
    let token = createToken(credentials);
    res.send(JSON.stringify({accessToken:token}));

})

app.post('/tokenlogin', authToken, (req, res) => {

})

app.post('/newlogin', authenticateCredentials,(req, res)=>{
    let credentials = req.authPackage
    
    res.status(200).send(credentials);
})


app.listen(port, () => console.log('server running...'));


