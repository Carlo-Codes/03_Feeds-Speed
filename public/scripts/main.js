
import { TablePage } from "./TablePage.js"; 
import { ChipPage } from "./ChipPage.js";
import { Page } from "./Page.js";
import { FeedsSpeeds } from "./Feeds&Speeds.js";
import {loginPage} from "./Login.js"

/* Notes to self
TODO
 - //create a formular to aproximate chipload of other diamter bits based on metal/ plastic/ wood 
 - //post data to chipload data table
 - choose to guess the rest of the chip load or not
 - be able to change a chipload once you have run a test accuratley
 
 -//add delete button to chipload rows
 -*add data tables of fav feeds and speeds (add and delete rows)
 
 -add user & password functionaility add user ids to corresponding tables
    --register new user api done - need to ensure its an email etc
    --next do a login


*/


// URLS
const homeUrl = 'http://localhost:7800/';
const tool_dataUrl = 'toolInfo';
const material_dataUrl = 'chiploadInfo';

//Table Titles
const tools_title = "Tools"
const materials_title = "Chipload (mm)"
const FS_title = "Feeds & Speeds"
const Chip_title = "Chip Load Calculator"


//html Elements// all wrong - learning as i go but should hav created all these in js 
let navBar = document.getElementById("nav");
let homeBut = document.getElementById("Home_but");
let feedSpeedsBut = document.getElementById("FeedSpeed_button");
let materialsBut = document.getElementById("Material_button");
let toolBut =  document.getElementById("Tool_button");
let chipBtn = document.getElementById("Chip_calculator");

let content = document.getElementById("content_container")


// could do a "create page" function that automates the below

//pages
let login  = new loginPage(null,homeUrl, "login", "Login")
let homePage = new Page(homeBut, homeUrl, "/", "Home");
//let toolPage = new TablePage(toolBut, homeUrl ,tool_dataUrl, tools_title);
let materialsPage = new TablePage(materialsBut,homeUrl, material_dataUrl ,materials_title);
let feedsSpeedsPg = new FeedsSpeeds(feedSpeedsBut, homeUrl, [tool_dataUrl, material_dataUrl], FS_title);
let chippg = new ChipPage(chipBtn, homeUrl, [tool_dataUrl, material_dataUrl], Chip_title);

let page_arrays = [login, homePage, materialsPage, feedsSpeedsPg, chippg]; // add pages here after init for eventlisteners




function navEventHandler(e){
  let target = e.target.parentNode.id;
  for(let i =0; i < page_arrays.length; i++){
    let pgbt = page_arrays[i].button.id;
    if (target === pgbt) {
      page_arrays[i].render_content();
    };
  };

}


// below is great because this coupled with my CalcPage.generate_button(), i never have to worry about adding eventlisteners if i want to add a button

function pg_btn_EventHandler(e){
  let target = e.target.id; // finding target of click
  
  for (let i = 0; i < page_arrays.length; i++){ //go through avaliable pages
    let pg_btns = page_arrays[i].buttons; // extract buttons set for page See CalcPage.generate_button() for setter
    let pg_btns_keys = Object.keys(pg_btns); // extract their keys (stored as key value pair with function, See CalcPage.generate_button() for setter)

    for (let j = 0; j < pg_btns_keys.length; j++){
      if (pg_btns_keys[j] === target){ // go through keys to see if match
        page_arrays[i].buttons[pg_btns_keys[j]](); //if match execute paired function bound to scope of class object
      }
    }
  }
}
  


navBar.addEventListener("click", navEventHandler);
content.addEventListener("click", pg_btn_EventHandler);
document.body.addEventListener("click", pg_btn_EventHandler);


login.render_content();




