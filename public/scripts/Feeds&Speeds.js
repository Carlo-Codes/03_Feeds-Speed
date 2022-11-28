import { CalcPage } from "./CalcPage.js";

export class FeedsSpeeds extends CalcPage {
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        this.calculateBtnID = "calculateFSBut";
        
    }

    calculate(){ //calculate feeds and speed based on input
      this.generate_results(); // creats a results div
      let material =  document.getElementById("Material");
      let toolDiamter = document.getElementById("Tool Diameter");
      let flute_no = document.getElementById("Tool Flutes");
      let rpmDD = document.getElementById("RPM");

      let material_value = material.value;
      let toolD_value = toolDiamter.value;
      let flute_value = flute_no.value;
      let rpm_value = rpmDD.value

      let selected_material_row = this.getMaterialDataRow(this.material_data, material_value);
      let chipload = selected_material_row[toolD_value + "mm"];

      let feed_rate = chipload * rpm_value * flute_value;

      this.populate_results(feed_rate, toolD_value);
      
    }

    populate_results(fr,sd){ //populate the results container
      let results_html = document.getElementById("results");
      results_html.replaceChildren();

      let feed_rate = document.createElement("div");
      feed_rate.setAttribute("id", "feedrate");
      let frValue = document.createTextNode(`Feed Rate = ${fr} mm/min`);
      feed_rate.appendChild(frValue);

      let stepdown = document.createElement("div");
      stepdown.setAttribute("id", "stepdown");
      let sdValue = document.createTextNode(`Step Down = ${sd} mm/min`);
      stepdown.appendChild(sdValue);

      results_html.appendChild(feed_rate);
      results_html.appendChild(stepdown);
    }


  
      render_content(){
  
  
        this.clearPage();
        let title_node = document.createTextNode(this.title);
        this.title_html.appendChild(title_node);
        this.retrieve_data();

  
        //creating dropdowns
        let material_dropdown = this.generate_dropdown(this.material_dropdown_id, this.material_data, "Material");
        let tool_diameter_dropdown = this.generate_dropdown(this.tool_diameter_dropdown_id, this.tool_data, "Diameter");
        let tool_flute_number = this.generate_dropdown(this.tool_flute_number_dropdown_id, this.flute_data, "flute");
        let RPM_dropdown = this.generate_dropdown(this.rpm_dropdown_id, this.RPM_data, "RPM");
  
        let FSform = this.generate_form([material_dropdown, tool_diameter_dropdown, tool_flute_number, RPM_dropdown])
        //injecting dd into html

        this.content_html.appendChild(FSform);
        this.content_html.appendChild(this.generate_button(this.calculateBtnID, "calculate", this.calculate.bind(this))); // 
        

        window.location.hash = this.title;
        
  
      }
  
  };