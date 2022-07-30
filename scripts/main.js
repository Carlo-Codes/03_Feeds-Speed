import { FeedsSpeeds } from "./FeedsSpeeds"

let but = document.getElementById("but");

let navBar = document.getElementById("nav");
let feedSpeedsBut = navBar.getElementsByTagName("p")[0]
let materialsBut = navBar.getElementsByTagName("p")[1]
let toolBut = navBar.getElementsByTagName("p")[2]

feedSpeedsBut.addEventListener("click", function(){console.log("helloworld")});

materialsBut.addEventListener("click", function(){console.log("hello material world")});

toolBut.addEventListener("click", function(){console.log("hello tool world")});


//

function handlerEvent() {
  alert('hello');
  console.log("fired");
}

//but.onclick = () => alert("hellosies")
but.addEventListener("click", handlerEvent);
//but.removeEventListener("click", handlerEvent);