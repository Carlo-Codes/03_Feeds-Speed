
import { TablePage } from "./TablePage.js"; 
import { CalcPage } from "./CalcPage.js";
import { Page } from "./Page.js";

/* Notes to seld
TODO
add feeds and speeds calc page
adjust css & html to have proper containers 


*/


// URLS
const homeUrl = 'http://localhost:7800/';
const tool_dataUrl = 'toolInfo';
const material_dataUrl = 'chiploadInfo';

//Table Titles
const tools_title = "Tools"
const materials_title = "Chipload in mm (Material vs Tool Diameter)"
const FS_title = "F&S"


//html Elements
let navBar = document.getElementById("nav");
let homeBut = document.getElementById("Home_but");
let feedSpeedsBut = document.getElementById("FeedSpeed_button");
let materialsBut = document.getElementById("Material_button");
let toolBut =  document.getElementById("Tool_button");

//pages
let homePage = new Page(homeBut, homeUrl, "/", "Home"); //need to give this a render content method!!!
let toolPage = new TablePage(toolBut, homeUrl ,tool_dataUrl, tools_title);
let materialsPage = new TablePage(materialsBut,homeUrl, material_dataUrl ,materials_title);
let feedsSpeedsPg = new CalcPage(feedSpeedsBut, homeUrl, [tool_dataUrl, material_dataUrl], FS_title);

let page_arrays = [homePage, toolPage, materialsPage, feedsSpeedsPg];

function navEventHandler(e){
  let target = e.target.parentNode.id;
  for(let i =0; i < page_arrays.length; i++){
    let pgbt = page_arrays[i].button.id;
    if (target === pgbt) {
      page_arrays[i].render_content();
    };
  };

}

navBar.addEventListener("click", navEventHandler);




// //event listeners -  have url hash operations for use later
// homeBut.addEventListener("click", function(){window.location = "/";});//eventlistener for clicking te home button

// feedSpeedsBut.addEventListener("click", function(){ //eventlistener for clicking te F&S button
//   window.location.hash = feedSpeedsBut.innerHTML
//   feedsSpeedsPg.render_content();

// });

// materialsBut.addEventListener("click", () => { //eventlistener for clicking te materials button
//   materialsPage.render_content();
// });

// toolBut.addEventListener("click", () => { //eventlistener for clicking te tools button
//    toolPage.render_content();
// }); 

