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
    }

    populate_dropdown(html_id, data, key){ //should be a prototype; creates dropdowns

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

    generate_calculate_button(){
      let button = `<button type="button" id="calculateBut"> Calculate </button>`
      return button;
    }

    calculate_eventHandler(material_data){
      let button_html = document.getElementById("calculateBut");

      button_html.addEventListener("click", ()=>{
          let material =  document.getElementById("Material");
          let toolDiamter = document.getElementById("Tool Diameter");
          let flute_no = document.getElementById("Tool Flutes");
          let rpmDD = document.getElementById("RPM");

          let material_value = material.value;
          let toolD_value = toolDiamter.value;
          let flute_value = flute_no.value;
          let rpm_value = rpmDD.value

          //console.log(material_value, toolD_value, flute_value);
          let selected_material_row = this.getDataRow(material_data, material_value);
          let chipload = selected_material_row[toolD_value + "mm"];
          console.log(chipload);
          
          let feed_rate = chipload * rpm_value * flute_value; //show this next!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

          console.log(feed_rate);


      })
    }


    
    async generatePage(populate_dropdown, generate_calculate_button, calculate_feeds_speeds){
      //wiping previous page
      this.table_html.innerHTML = "";
      this.title_html.innerHTML = this.title;

      //getting data from db
      let tool_data = await this.getInfo(this.tools_url);
      let material_data = await this.getInfo(this.materials_url); 
      let number_flutes = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base
      let RPM = [{RPM:12000},{RPM:13000},{RPM:14000},{RPM:15000},{RPM:16000},{RPM:17000},{RPM:18000},{RPM:19000},{RPM:20000},{RPM:21000}]

      //creating dropdowns
      let material_dropdown = populate_dropdown(this.material_dropdown_id, material_data, "Material");
      let tool_diameter_dropdown = populate_dropdown(this.tool_diameter_dropdown_id, tool_data, "Diameter");
      let tool_flute_number = populate_dropdown(this.tool_flute_number_dropdown_id, number_flutes, "flute");
      let RPM_dropdown = populate_dropdown(this.rpm_dropdown_id, RPM, "RPM");

      //injecting dd into html
      this.content_html.innerHTML = material_dropdown + "\n"  + tool_diameter_dropdown + "\n" + tool_flute_number + "\n" + RPM_dropdown + "\n" + generate_calculate_button();

      this.calculate_eventHandler(material_data);
      


      
      //To Do Clean up and not above !!!

   


    }

    render_content(){

      this.generatePage(this.populate_dropdown,this.generate_calculate_button, this.calculate_feeds_speeds);
      

    }

}