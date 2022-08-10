import { FeedsSpeeds } from "./FeedsSpeeds.js";
const homeUrl = 'http://localhost:7800/'


let but = document.getElementById("but");

let navBar = document.getElementById("nav");
let homeBut = navBar.getElementsByTagName("h2")[0];
let feedSpeedsBut = navBar.getElementsByTagName("p")[0];
let materialsBut = navBar.getElementsByTagName("p")[1];
let toolBut = navBar.getElementsByTagName("p")[2];


homeBut.addEventListener("click", function(){window.location = "/";});
feedSpeedsBut.addEventListener("click", function(){window.location.hash = feedSpeedsBut.innerHTML;});

materialsBut.addEventListener("click", function(){window.location.hash = materialsBut.innerHTML});

toolBut.addEventListener("click", getToolsInfo);

async function getToolsInfo(e){
    e.preventDefault(e)
    window.location.hash = toolBut.innerHTML
     let res = await fetch (homeUrl + 'toolInfo',{
        
        method : 'GET'
        
     } )

     let data = await res.json()
     console.log(data.info)
}

async function postInfo(){
    
}