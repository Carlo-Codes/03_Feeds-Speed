import { CalcPage } from "./CalcPage.js";

export class FeedsSpeeds extends CalcPage {
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
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
      let button_html = document.getElementById("calculateFSBut");// probably quite leaky finding this twice
      button_html.addEventListener("click", this.calculate.bind(this));// recursive binding of event listener and callback. need this because i think whats happening is the callback is being removed by garbage collection after the render_content() method is finished
      
    }

    populate_results(fr,sd){ //populate the results container
      let results_html = document.getElementById("results");
      results_html.innerHTML = "";
      let feed_rate = `<div id = "feed_rate">${"Feed Rate = " + fr + "mm/min"}</div>`;
      let stepdown = `<div id = "stepdown">${"Step Down = " + sd + "mm"}</div>`;
      results_html.innerHTML = feed_rate + "\n" + stepdown;
    }

    async generatePage(generate_dropdown, generate_calculate_button){
        //wiping previous page
        this.table_html.innerHTML = "";
        this.title_html.innerHTML = this.title;
  
        //await this.retrieve_data();
  
        //creating dropdowns
        let material_dropdown = generate_dropdown(this.material_dropdown_id, this.material_data, "Material");
        let tool_diameter_dropdown = generate_dropdown(this.tool_diameter_dropdown_id, this.tool_data, "Diameter");
        let tool_flute_number = generate_dropdown(this.tool_flute_number_dropdown_id, this.flute_data, "flute");
        let RPM_dropdown = generate_dropdown(this.rpm_dropdown_id, this.RPM_data, "RPM");
  
        let FSform = this.generate_form([material_dropdown, tool_diameter_dropdown, tool_flute_number, RPM_dropdown])
        //injecting dd into html
        
        this.content_html.innerHTML = FSform + this.generate_button("calculateFSBut", "calculate");
        
        this.generate_results();// generate results container after page load could follow convention of insertion as the line above but good to know eithe way works
  
        let button_html = document.getElementById("calculateFSBut"); //getting the calculate button after its creation
        button_html.addEventListener("click", this.calculate.bind(this)); // binding call back function to scope of the class. not the callback function internal scope
  
  
      }
  
      render_content(){
  
  
        this.generatePage(this.generate_dropdown,this.generate_calculate_button);
  
        
  
      }
  
  };