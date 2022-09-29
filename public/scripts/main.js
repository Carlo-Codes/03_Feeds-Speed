
import { TablePage } from "./TablePage.js"; 
import { ChipPage } from "./ChipPage.js";
import { Page } from "./Page.js";
import { FeedsSpeeds } from "./Feeds&Speeds.js";

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
const Chip_title = "Chip Load Calculator"


//html Elements
let navBar = document.getElementById("nav");
let homeBut = document.getElementById("Home_but");
let feedSpeedsBut = document.getElementById("FeedSpeed_button");
let materialsBut = document.getElementById("Material_button");
let toolBut =  document.getElementById("Tool_button");
let chipBtn = document.getElementById("Chip_calculator");

let content_html = document.getElementById("content")

// could do a "create page" function that automates the below

//pages
let homePage = new Page(homeBut, homeUrl, "/", "Home");
let toolPage = new TablePage(toolBut, homeUrl ,tool_dataUrl, tools_title);
let materialsPage = new TablePage(materialsBut,homeUrl, material_dataUrl ,materials_title);
let feedsSpeedsPg = new FeedsSpeeds(feedSpeedsBut, homeUrl, [tool_dataUrl, material_dataUrl], FS_title);
let chippg = new ChipPage(chipBtn, homeUrl, [tool_dataUrl, material_dataUrl], Chip_title);

let page_arrays = [homePage, toolPage, materialsPage, feedsSpeedsPg, chippg]; // add pages here after init for eventlisteners



let postbt_ids = []; //when we start posting to the db

function navEventHandler(e){
  let target = e.target.parentNode.id;
  for(let i =0; i < page_arrays.length; i++){
    let pgbt = page_arrays[i].button.id;
    if (target === pgbt) {
      page_arrays[i].render_content();
    };
  };

}

function calcEventHandler(e){
  let target = e.target.id;
  for (let i = 0; i < page_arrays.length; i++){
    let pg_btns = page_arrays[i].buttons;
    let pg_btns_keys = Object.keys(pg_btns);
    for (let j = 0; j < pg_btns_keys.length; j++){
      if (pg_btns_keys[j] === target){
        page_arrays[i].buttons[pg_btns_keys[j]]();
      }
    }
  }
}
  


navBar.addEventListener("click", navEventHandler);
content_html.addEventListener("click", calcEventHandler);





