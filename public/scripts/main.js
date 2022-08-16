import { FeedsSpeeds } from "./FeedsSpeeds.js";
const homeUrl = 'http://localhost:7800/'


let but = document.getElementById("but");

let navBar = document.getElementById("nav");
let homeBut = navBar.getElementsByTagName("h2")[0];
let feedSpeedsBut = navBar.getElementsByTagName("p")[0];
let materialsBut = navBar.getElementsByTagName("p")[1];
let toolBut = navBar.getElementsByTagName("p")[2];

let contentTable = document.getElementById("Table");
let table = contentTable.getElementsByTagName("table")[0]



//event listeners - add have url hash operations for use later
homeBut.addEventListener("click", function(){window.location = "/";});//eventlistener for clicking te home button
feedSpeedsBut.addEventListener("click", function(){window.location.hash = feedSpeedsBut.innerHTML;});//eventlistener for clicking te F&S button

materialsBut.addEventListener("click", function(){window.location.hash = materialsBut.innerHTML});//eventlistener for clicking te materials button

toolBut.addEventListener("click", getToolsInfo); //eventlistener for clicking te tools button


function setTableDate(data, table){ //populate table - a table will be on most pages
   let columns = Object.keys(data[0]);// recieve the coloumn headers
   let headers = [] // empty headers
   let rows = [] // empty row data

   for (let i = 1; i < columns.length; i++ ){
      headers += `<th>${columns[i]}</th>`; //populate headers
   }
   //console.log(columns); //debug
   table.innerHTML = headers; //inject headers into html

   for (let i = 0; i < data.length; i++){
      rows += `<tr>\n`;
      let values = Object.values(data[i])
      for (let j = 1; j < columns.length; j++){
         rows += `<td>${values[j]}</td>\n`;
      };
   };
   table.innerHTML += rows;
};



async function getToolsInfo(e){
    e.preventDefault(e);
    window.location.hash = toolBut.innerHTML;
     let res = await fetch (homeUrl + 'toolInfo',{
        method : 'GET',
     } );
     let data = await res.json();
     //console.log(data[3].ToolsDiameter);
     setTableDate(data, table);
}

async function postInfo(){
    
}