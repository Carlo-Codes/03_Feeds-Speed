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

    generate_results(){ // create a container for results
      this.content_html.innerHTML += `<div id = "results"></div>`;
    }

    populate_results(fr,sd){ //populate the results container
      let results_html = document.getElementById("results");
      results_html.innerHTML = "";
      let feed_rate = `<div id = "feed_rate">${"Feed Rate = " + fr + "mm/min"}</div>`;
      let stepdown = `<div id = "stepdown">${"Step Down = " + sd + "mm"}</div>`;
      results_html.innerHTML = feed_rate + "\n" + stepdown;
    }

    

    generate_calculate_button(){ //generate button
      let button = `<button type="button" id="calculateBut"> Calculate </button>`
      return button;
    }

    calculate(){
      let material =  document.getElementById("Material");
      let toolDiamter = document.getElementById("Tool Diameter");
      let flute_no = document.getElementById("Tool Flutes");
      let rpmDD = document.getElementById("RPM");

      let material_value = material.value;
      let toolD_value = toolDiamter.value;
      let flute_value = flute_no.value;
      let rpm_value = rpmDD.value

      let selected_material_row = this.getDataRow(this.material_data, material_value);
      let chipload = selected_material_row[toolD_value + "mm"];

      let feed_rate = chipload * rpm_value * flute_value;

      this.populate_results(feed_rate, toolD_value);
      let button_html = document.getElementById("calculateBut");// probably quite leaky finding this twice
      button_html.addEventListener("click", this.calculate.bind(this));// recursive binding of event listener and callback. need this because i think whats happening is the callback is being removed by garbage collection after the render_content() method is finished
      
    }



    
    async generatePage(populate_dropdown, generate_calculate_button){
      //wiping previous page
      this.table_html.innerHTML = "";
      this.title_html.innerHTML = this.title;

      //getting data from db
      this.tool_data = await this.getInfo(this.tools_url);
      this.material_data = await this.getInfo(this.materials_url); 
      let number_flutes = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base
      let RPM = [{RPM:12000},{RPM:13000},{RPM:14000},{RPM:15000},{RPM:16000},{RPM:17000},{RPM:18000},{RPM:19000},{RPM:20000},{RPM:21000}]

      //creating dropdowns
      let material_dropdown = populate_dropdown(this.material_dropdown_id, this.material_data, "Material");
      let tool_diameter_dropdown = populate_dropdown(this.tool_diameter_dropdown_id, this.tool_data, "Diameter");
      let tool_flute_number = populate_dropdown(this.tool_flute_number_dropdown_id, number_flutes, "flute");
      let RPM_dropdown = populate_dropdown(this.rpm_dropdown_id, RPM, "RPM");

      //injecting dd into html
      
      this.content_html.innerHTML = material_dropdown + "\n"  + tool_diameter_dropdown + "\n" + tool_flute_number + "\n" + RPM_dropdown + "\n" + generate_calculate_button();
      
      this.generate_results();// generate results container after page load could follow convention of insertion as the line above but good to know eithe way works

      let button_html = document.getElementById("calculateBut"); //getting the calculate button after its creation
      button_html.addEventListener("click", this.calculate.bind(this)); // binding call back function to scope of the class. not the callback function internal scope

      


      
      //To Do Clean up and not above !!!

   


    }

    render_content(){


      this.generatePage(this.populate_dropdown,this.generate_calculate_button);

      

    }

}