import { CalcPage } from "./CalcPage.js";

export class ChipPage extends CalcPage {
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        this.Feed_rt_input_id = "Feed Rate mm/m"
        this.material_input_id = "Material Name"
    }

    calculate(){
        let material =  document.getElementById(this.material_input_id);
        let toolDiamter = document.getElementById(this.tool_flute_number_dropdown_id);
        let flute_no = document.getElementById(this.tool_flute_number_dropdown_id);
        let rpmDD = document.getElementById(this.rpm_dropdown_id);
        let feed_rate_in = document.getElementById(this.Feed_rt_input_id);
  
        let material_value = material.value;
        let toolD_value = toolDiamter.value;
        let flute_value = flute_no.value;
        let rpm_value = rpmDD.value
        let feed_rate = feed_rate_in.value;
  
        
  
        let chipload = feed_rate / (rpm_value * flute_value) ;
        

        console.log(chipload);
      }

    async render_content(){


       let mtrlTxtBx = this.generate_input(this.material_input_id, "text");
       let feedbx = this.generate_input(this.Feed_rt_input_id, "number");

       let tool_diameter_dropdown = this.generate_dropdown(this.tool_diameter_dropdown_id, this.tool_data, "Diameter");
       let tool_flute_number = this.generate_dropdown(this.tool_flute_number_dropdown_id, this.flute_data, "flute");
       let RPM_dropdown = this.generate_dropdown(this.rpm_dropdown_id, this.RPM_data, "RPM");
       let calculateBut = this.generate_button("calculateCLBut", "Calculate");


       let form = this.generate_form([mtrlTxtBx, feedbx, tool_diameter_dropdown, tool_flute_number, RPM_dropdown, calculateBut]);

       this.content_html.innerHTML = form;
       this.table_html.innerHTML = "";
       this.title_html.innerHTML = this.title;

       let calculateButHTML = document.getElementById("calculateCLBut");
       calculateButHTML.addEventListener("click", this.calculate.bind(this));


       
    }

};
