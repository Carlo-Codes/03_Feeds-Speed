let but = document.getElementById("but");

let navBar = document.getElementById("nav");
let feedSpeedsBut = navBar.getElementsByTagName("p")[0]
let materialsBut = navBar.getElementsByTagName("p")[1]

feedSpeedsBut.addEventListener("click", function(){console.log("helloworld")});

materialsBut.addEventListener("click", function(){console.log("hello material world")});
console.log(feedSpeedsBut)
//

function handlerEvent() {
  alert('hello');
  console.log("fired");
}

//but.onclick = () => alert("hellosies")
but.addEventListener("click", handlerEvent);
//but.removeEventListener("click", handlerEvent);