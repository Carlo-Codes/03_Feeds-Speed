
let mysql = require('mysql2');
let express = require('express');
const { json } = require('express');
let app = express();
const cors = require('cors');
let port = 7800;
let dbPort = 9000;
let dotenv = require('dotenv');
let jswt = require('jsonwebtoken');
let bcrypt = require('bcrypt');

let corsOrigin = ['68.183.9.139', 'www.carlofeeds.app', 'carlofeeds.app']

dotenv.config();
const secret = process.env.TOKEN_SECRET;
const db_password = process.env.db_password

//Server functions

function getcookievalue(name, req){ // getting cooking from the db browser
    let cookies = req.headers["cookie"]
    let splitcookies = cookies.split("; ");
    for (let i =0; i < splitcookies.length; i++){
      let target = splitcookies[i];
      if (target.indexOf(name)!== -1){
        let cookie = target.split("=")[1]
        return cookie
      }
    }
  }

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

async function authetnicateToken(token, callback){
    try {
        let decoded = jswt.verify(token,secret);
        let username = decoded.split(":")[0]
        let password = decoded.split(":")[1]
    
        let auth = await retrieveUser(username, async (results) => {
             await authenticateCredentials(username,password,results, async (authpackage) => {
                return callback(authpackage)
             })
        })
    }
    catch {
        let errorPackage = {credentials:{
            username:null,
            authroised:false,
            token: null,
            userID: null}}
        return callback(errorPackage)
    }

}

async function userIdFromToken(token, callback){
   await authetnicateToken(token, (package) => {
        if (package.credentials.userID === null) return
        return callback(package.credentials.userID)
    })
}

//API
var dbCon = mysql.createConnection({
    host : "127.0.0.1",
    port : "3306", 
    user : "root",
    password : db_password,
    database : "feedsspeeds_db"
});

dbCon.connect((err) => {
    if (err) throw err;
    console.log("db Connected");
});



let corsConfig = {
    "origin": corsOrigin,
    "methods": ['GET','HEAD','PUT','PATCH','POST','DELETE', 'OPTIONS'],
    "Access-Control-Allow-Headers" : "auth, Content-Type",
    "preflightContinue": "false",
    "optionsSuccessStatus": 204 , 
    "Access-Control-Expose-Headers":"credentials",
    "Access-Control-Allow-Credentials": "true",
    "credentials" : 'include',
}


app.use(express.static('public'));
app.use(express.json());
app.use(cors(corsConfig));


//app.options("*", cors(corsOptionconfig))


app.get('/toolInfo', (req, res) => {
        res.sendStatus(200)
});


app.get('/chiploadInfo', (req, res) => {
    let token = getcookievalue("token", req)
    userIdFromToken(token,(userID) => {
        dbCon.query(`SELECT * FROM ChipLoad WHERE user_id = ${userID} OR user_id = null;`, (err, result) => {
            if (err) return err
            if(result.length === 0){ // if theres no rows in the table send everything wil null //maybe this is stupid?
                dbCon.query('SHOW COLUMNS FROM ChipLoad;', (err, resultCOL) => {
                    let fields = resultCOL.map(i => i.Field);
                    let parsedResponse = {}
                    fields.forEach(element => {
                        parsedResponse[element] = null
                    });
                    let colresult = []
                    colresult.push(parsedResponse)
                    res.send(JSON.stringify(colresult))
                })
                
            } else {
               
                
                res.send(JSON.stringify(result))
            }

        })
    })
    
});

app.post('/checkuserexists', (req, res) => {
    
    let username = req.body["username"]


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

    let token = getcookievalue("token", req)
    let data = req.body
    let dataKeys = Object.keys(data)
    let mysqlFunc = "";
   
    userIdFromToken(token, (userID) => {
        dbCon.query(`insert into ChipLoad(Material, user_id, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('${data['Material']}', ${userID}, ${data['2']}, ${data['4']}, ${data['6']} , ${data['8']}, ${data['10']}, ${data['12']});`, (err, result) => {
            res.send(200);
    })
    })
    
    
});

app.post('/delmatrow', (req, res) => {
    let delId = req.body['id']
    dbCon.query(`delete from ChipLoad where id = ${delId};`, (err, result) => {
        res.send(200);

    })
    
})

app.post('/addmaterial', (req, res) =>{
    let adddata = req.body
    let token = getcookievalue("token", req)
    userIdFromToken(token, (userID) => {
        dbCon.query(`insert into ChipLoad(Material, user_id, 2mm, 4mm, 6mm, 8mm, 10mm, 12mm) values('${adddata['Material']}', ${userID}, ${adddata['2mm']}, ${adddata['4mm']}, ${adddata['6mm']} , ${adddata['8mm']}, ${adddata['10mm']}, ${adddata['12mm']});`, (err, res) => {
         if (err) throw err
         
    })
    res.status(200);
})
    
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


    authetnicateToken(token, (authPackage)=>{
        res.send(JSON.stringify(authPackage))
        
    })

       
})

app.post('/newlogin',async (req, res)=>{
    let authheader = req.headers['auth']
    let credentials = atob(authheader.split(" ")[1]);
    let username = credentials.split(":")[0]
    let password = credentials.split(":")[1]

  

    let authPackage = await retrieveUser(username, async (results) => {
        
         await authenticateCredentials(username,password,results, async (authpackage) => {
            
            res.send(JSON.stringify(authpackage))
            return await authpackage
            
         })
    })

   
    
    
    
    
})

app.listen(port, () => console.log('server running...'));


