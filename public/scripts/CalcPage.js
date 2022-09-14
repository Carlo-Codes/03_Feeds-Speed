import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

    }


    generatePage(){
      this.table_html.innerHTML = "";
      let material_dropdown = `<label for = "Material"> Material :</label>\n`;

      //add for loop and add material names to drop down

      //this.content.innerHTML += material_dropdown;

      
      

    }

    render_content(){

      this.generatePage();

    }

}