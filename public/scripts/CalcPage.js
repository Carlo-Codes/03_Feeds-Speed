import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        //spliting up array
        this.tools_url = data_fetch_url[0]; //this is not very modular
        this.materials_url = data_fetch_url[1];
    }

    populate_dropdown(html_id, data, key){ //should be a prototype 
      //html component parts
      let dropdown_label = `<label for = "${html_id}">&nbsp &nbsp${html_id}:</label>\n`;
      let dropdown_content_start = `<select id="${html_id}">\n`;
      let content = "";
      let dropdown_content_end = `</select>\n`;

      //creating content for drop down
      for (let i=0; i < data.length; i++){
        let inject = data[i][key]; //getting the material name from db -- !!!!!!!!!!need to make this work with other drop downs!!!!!!!!!!
        content += `<option value="${inject}">${inject}</option>\n`; // injecting data into html template
        console.log(inject);
      }

       // combinidng strings for html
      let dropdown = dropdown_label + dropdown_content_start + content + dropdown_content_end;
      return dropdown;
    }

    generate_calculate_button(){
      let button = `<button type="button"> Calculate </button>`
      return button;
    }


    async generatePage(populate_dropdown, generate_calculate_button){
      //wiping previous page
      this.table_html.innerHTML = "";
      this.title_html.innerHTML = this.title;

      //getting data from db
      let tool_data = await this.getInfo(this.tools_url);
      let material_data = await this.getInfo(this.materials_url); 
      let number_flutes = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base

      //creating dropdowns
      let material_dropdown = populate_dropdown("Material", material_data, "Material");
      let tool_diameter_dropdown = populate_dropdown("Tool Diameter", tool_data, "Diameter");
      let tool_flute_number = populate_dropdown("Tool Flutes", number_flutes, "flute");

      //injecting dd into html
      this.content_html.innerHTML = material_dropdown + "\n"  + tool_diameter_dropdown + "\n" + tool_flute_number + "\n" + generate_calculate_button();

      


      
      //To Do Clean up and not above !!!

   


    }

    render_content(){

      this.generatePage(this.populate_dropdown,this.generate_calculate_button);
      

    }

}