import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        //spliting up array
        this.tools_url = data_fetch_url[0]; //this is not very modular
        this.materials_url = data_fetch_url[1];

    }


  

    async generatePage(){
      //wiping previous page
      this.table_html.innerHTML = "";
      this.title_html.innerHTML = "";

      //getting data from db
      let tool_data = await this.getInfo(this.tools_url);
      let material_data = await this.getInfo(this.materials_url); 
      

      
     
      
      function populate_dropdown(html_id, data, key){ //should be a prototype 
  
        //html component parts
        let dropdown_label = `<label for = "${html_id}"> ${html_id} :</label>\n`;
        let dropdown_content_start = `<select id="${html_id}">\n`;
        let content = "";
        let dropdown_content_end = `</select>\n`;

        //creating content for drop down
        for (let i=0; i < data.length; i++){
          let inject = data[i].Material //getting the material name from db -- !!!!!!!!!!need to make this work with other drop downs!!!!!!!!!!
          content += `<option value="${inject}">${inject}</option>\n`; // injecting data into html template
          console.log(inject);
        }

         // combinidng strings for html
        let dropdown = dropdown_label + dropdown_content_start + content + dropdown_content_end;
        return dropdown;
      }

      //debug
      // console.log(material_data);
      // console.log(populate_dropdown("material", material_data));

      this.content_html.innerHTML = populate_dropdown("Material", material_data, "Material") + "\n" + populate_dropdown("Tool", tool_data, "Diameter");

      


      
      //To Do Clean up and not above !!!

   


    }

    render_content(){

      this.generatePage();

    }

}