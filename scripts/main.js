let but = document.getElementById("but");


function handlerEvent() {
  alert('hello');
  console.log("fired");
}

//but.onclick = () => alert("hellosies")
but.addEventListener("click", handlerEvent);
//but.removeEventListener("click", handlerEvent);