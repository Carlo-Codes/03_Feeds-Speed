let http = require('http');
let fs = require('fs');
let express = require('express');
let app = express();
let port = 7800;
let cssPath = "styles/";
let jsPath = "scripts/"



app.use(express.static(__dirname));




app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');

    res.setHeader('Content-Type', 'text/css')
    


    }

);

app.listen(port, () => console.log('server running...'));
