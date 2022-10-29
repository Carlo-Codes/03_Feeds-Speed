
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

async function retrieveUser(username, callback) {
    dbCon.query(`select * from users where email = '${username}';`, (err, results) => {
        if(err) throw err;
        return callback(results);
        //////problems is we cant get the auth packa out of this function
    })

}

async function authenticateCredentials(username, password, dbRecord, callback){
    let bcryptResult = false

    let db_email =  dbRecord[0].email

    let db_pswrd = dbRecord[0].pswd

    let db_id = dbRecord[0].id

    //console.log(db_id)

    //console.log("database email =" + db_email)
    //console.log("supplied email ="+ username)
    bcryptResult = await bcrypt.compare(password,db_pswrd)

    let token = ""
    let authroised = false
    if (db_email === username && bcryptResult === true){
        authroised =  true
        token = createToken(`${username}:${password}`)
    }
    
     authPackage = {credentials:{
        username:username,
        authroised:authroised,
        token: token,
        userID: db_id}}
        
  
    return callback(authPackage)
}


function createToken(credentials){
    
    let options = {
        //expiresIn: '1800s'
    }
    token = jswt.sign(credentials,secret,options)
    return token;
}


async function authenticateCredentialsMiddle(req, res){
    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    let username = credentials.split(":")[0]
    let password = credentials.split(":")[1]
    
    let dbresults = await retrieveUser(username);


    let authPackage = await authenticateCredentials(username,password, dbresults);
    
    return authPackage

    
    
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

app.post('/tokenlogin', async (req, res) => {

    let authheader = req.headers["auth"]
    
    let token = authheader.split(" ")[0];
    
    if (token === null) return res.status(403)

    let decoded = jswt.verify(token,secret);
    let username = decoded.split(":")[0]
    let password = decoded.split(":")[1]

    let authPackage = await retrieveUser(username, async (results) => {
        console.log("database results in call back = " + results[0])
         await authenticateCredentials(username,password,results, async (authpackage) => {
            console.log("auth package in secound call back = " + JSON.stringify(authpackage))
            res.send(req.authpackage)
            return await authpackage
            
         })
    })
    
    console.log("api authpackage = " + authPackage);
    
    
    
   
})

app.post('/newlogin',async (req, res)=>{
    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    let username = credentials.split(":")[0]
    let password = credentials.split(":")[1]

    console.log(username + password)

    let authPackage = await retrieveUser(username, async (results) => {
        console.log("database results in call back = " + results[0])
         await authenticateCredentials(username,password,results, async (authpackage) => {
            console.log("auth package in secound call back = " + JSON.stringify(authpackage))
            res.send(JSON.stringify(authpackage))
            return await authpackage
            
         })
    })

    console.log(authPackage)
    
    
    
})


app.listen(port, () => console.log('server running...'));


