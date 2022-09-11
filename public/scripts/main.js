
import { TablePage } from "./TablePage.js"; 

/* Notes to seld
TODO
add materials page & data


*/


// URLS
const homeUrl = 'http://localhost:7800/';
const tool_dataUrl = 'toolInfo';
const material_dataUrl = 'chiploadInfo';

//Table Titles
const tools_title = "Tools"
const materials_title = "Chipload in mm"



//html Elements
let navBar = document.getElementById("nav");
let homeBut = navBar.getElementsByTagName("h2")[0];
let feedSpeedsBut = navBar.getElementsByTagName("p")[0];
let materialsBut = navBar.getElementsByTagName("p")[1];
let toolBut = navBar.getElementsByTagName("p")[2];

let contentTable = document.getElementById("table_div");
let html_table = contentTable.getElementsByTagName("table")[0]

let toolPage = new TablePage(toolBut, homeUrl, html_table ,tool_dataUrl, tools_title);
let materialsPage = new TablePage(materialsBut,homeUrl,html_table, material_dataUrl,"Chipload in mm")





//event listeners -  have url hash operations for use later
homeBut.addEventListener("click", function(){window.location = "/";});//eventlistener for clicking te home button

feedSpeedsBut.addEventListener("click", function(){ //eventlistener for clicking te F&S button
  window.location.hash = feedSpeedsBut.innerHTML
});

materialsBut.addEventListener("click", () => { //eventlistener for clicking te materials button
  materialsPage.render_content();
});

toolBut.addEventListener("click", () => { //eventlistener for clicking te tools button
   toolPage.render_content();
}); 

