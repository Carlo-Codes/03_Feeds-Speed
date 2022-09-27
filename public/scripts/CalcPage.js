import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        //spliting up array
        this.tools_url = data_fetch_url[0]; //this is not very modular
        this.materials_url = data_fetch_url[1];

        //html dropdown ids
        this.material_dropdown_id = "Material";
        this.tool_diameter_dropdown_id = "Tool Diameter";
        this.tool_flute_number_dropdown_id = "Tool Flutes";
        this.rpm_dropdown_id = "RPM";
        this.tool_data;
        this.material_data;
        this.flute_data;
        this.RPM_data
        this.retrieve_data();
    }

    async retrieve_data() { //getting data from db
      this.tool_data = await this.getInfo(this.tools_url);
      this.material_data = await this.getInfo(this.materials_url); 
      this.flute_data = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base
      this.RPM_data = [{RPM:12000},{RPM:13000},{RPM:14000},{RPM:15000},{RPM:16000},{RPM:17000},{RPM:18000},{RPM:19000},{RPM:20000},{RPM:21000}];
    } 

    generate_dropdown(html_id, data, key){ //should be a prototype; creates dropdowns

      //html component parts
      let dropdown_label = `<label for = "${html_id}">&nbsp &nbsp${html_id}:</label>\n`;
      let dropdown_content_start = `<select id="${html_id}">\n`;
      let content = "";
      let dropdown_content_end = `</select>\n`;

      //creating content for drop down
      for (let i=0; i < data.length; i++){
        let inject = data[i][key]; //getting the material name from db
        content += `<option value="${inject}">${inject}</option>\n`; // injecting data into html template
      }

       // combinidng strings for html
      let dropdown = dropdown_label + dropdown_content_start + content + dropdown_content_end;
      return dropdown;
    }

    generate_input(html_id, type){ 

      //html component parts
      let input_label = `<label for = "${html_id}">&nbsp &nbsp${html_id}:</label>\n`;
      let input_start = `<input id="${html_id}" type = "${type}">\n`;
      let input_end = `</input>\n`;

       // combinidng strings for html
      let input = input_label + input_start + input_end;
      return input;
    }

    generate_form(inputs){
      const form_start = "<form>";
      let form_content = ""
      const form_end = "</form>";
      for (let i = 0; i < inputs.length; i++){
        form_content += inputs[i];
        form_content += "\n";
        form_content += "<br>";
      }
      let form  = form_start + form_content + form_end;
      return form;
    }

    generate_results(){ // create a container for results
      this.content_html.innerHTML += `<div id = "results"></div>`;
    }

    generate_button(id, text){ //generate button
      let button = `<button type="button" id="${id}"> ${text}</button>`
      return button;
    }





  }
