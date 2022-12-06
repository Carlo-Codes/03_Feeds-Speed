
import { TablePage } from "./TablePage.js"; 
import { ChipPage } from "./ChipPage.js";
import { Page } from "./Page.js";
import { FeedsSpeeds } from "./Feeds&Speeds.js";
import {loginPage} from "./Login.js"

/* Notes to self
TODO
 - make things a bit prettier
    - make login mage nicer
    - write up and intro 
    - put warning on sign up page
    
    - making calculated chip load highlited - css

  //bugs
  - check new user exists doesnt work says it doesnt - server is recieveing username as undefined


*/




//UTILs
function getcookievalue(name){ // getting cooking from the db browser
  let cookies = document.cookie
  let splitcookies = cookies.split(";");
  for (let i =0; i < splitcookies.length; i++){
    let target = splitcookies[i];
    if (target.indexOf(name)!== -1){
      let cookie = target.split("=")[1]
      return cookie
    }
  }
}

function authroriseToken(){
  let token = getcookievalue("token");
  if(token === null || token === undefined){
    login.render_content(); //if theres no token in cookies, render login page
  }else{
    login.loginWithToken(()=>{ // if there is, try to log in with it
      document.cookie = `token=`
      login.render_content();// callback(){if the auth from server comes back false or null, render the login page}
    });
}
}


// URLS
const homeUrl = 'https://68.183.9.139/';
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
let signout = document.getElementById("signout")

let content = document.getElementById("content_container")



// could do a "create page" function that automates the below

//pages
let login  = new loginPage(signout, homeUrl, "login", "Login")
let homePage = new Page(homeBut, homeUrl, "/", "Home");
//let toolPage = new TablePage(toolBut, homeUrl ,tool_dataUrl, tools_title);
let materialsPage = new TablePage(materialsBut,homeUrl, material_dataUrl ,materials_title);
let feedsSpeedsPg = new FeedsSpeeds(feedSpeedsBut, homeUrl, material_dataUrl, FS_title);
let chippg = new ChipPage(chipBtn, homeUrl, material_dataUrl, Chip_title);

let page_arrays = [homePage, materialsPage, feedsSpeedsPg, chippg, login]; // add pages here after init for eventlisteners
///bug here with login -- need a login page button



function navEventHandler(e){
  let target = e.target.parentNode.id;
  for(let i =0; i < page_arrays.length; i++){
    let pgbt = page_arrays[i].button.id;
    if (target === pgbt) {
      authroriseToken();
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

document.body.addEventListener("click", pg_btn_EventHandler);


authroriseToken();
homePage.render_content()





