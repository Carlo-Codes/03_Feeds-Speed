import { CalcPage } from "./CalcPage.js";

export class ChipPage extends CalcPage {
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        this.Feed_rt_input_id = "Feed Rate mm/m"
        this.material_input_id = "Material Name"

        this.calculateBtnID = "calculateCLBut"
        this.tool_data;
    }

    calculate(){ // function for button
        this.generate_results();
        let material =  document.getElementById(this.material_input_id);
        let toolDiamter = document.getElementById(this.tool_diameter_dropdown_id);
        let flute_no = document.getElementById(this.tool_flute_number_dropdown_id);
        let rpmDD = document.getElementById(this.rpm_dropdown_id);
        let feed_rate_in = document.getElementById(this.Feed_rt_input_id);
  
        let material_value = material.value;
        let toolD_value = toolDiamter.value;
        let flute_value = flute_no.value;
        let rpm_value = rpmDD.value;
        let feed_rate = feed_rate_in.value;

        
        let chipload = feed_rate / (rpm_value * flute_value);
        chipload = chipload.toFixed(3) //cant really work out chipload across bit diamteres!?
        
        let material_row = { // creating empty material row for insertion into materil db
            Material : material_value,
        };
        
        for (let i = 0 ; i < this.tool_data.length; i++){
            let bitDim = this.tool_data[i].Diameter + "mm" // finding possible tool dims
            material_row[bitDim] = 0.000; //filling chiploads per tool diam with 0
        }

        material_row[toolD_value + "mm"] = chipload; //inserting chipload data
        
        console.log(material_row);
        this.populate_results(material_row);
      }


      populate_results(material_row){ //populate the results container
        let results_html = document.getElementById("results");
        results_html.replaceChildren(); //clearing previous

        let keys = Object.keys(material_row) // getting keys

        let material = this.createTextElement_id("span", "material", material_row["Material"])
        results_html.appendChild(material) // creating and rendering material name element

        for (let i = 0; i < keys.length; i++){ // iterating through rest of object and displaying
            if (keys[i] !== "Material"){
                let keySpan = this.createTextElement_id("span", "key", keys[i] + " :");
                let valueSpan = this.createTextElement_id("span", "value", material_row[keys[i]]);
                
                let keyValue = document.createElement("span")
                keyValue.setAttribute("id", "keyvalue")
                keyValue.appendChild(keySpan);
                keyValue.appendChild(valueSpan);
                
                results_html.appendChild(keyValue);
            }
        }
      }

    async render_content(){

       let mtrlTxtBx = this.generate_input(this.material_input_id, "text");
       let feedbx = this.generate_input(this.Feed_rt_input_id, "number");

       let tool_diameter_dropdown = this.generate_dropdown(this.tool_diameter_dropdown_id, this.tool_data, "Diameter");
       let tool_flute_number = this.generate_dropdown(this.tool_flute_number_dropdown_id, this.flute_data, "flute");
       let RPM_dropdown = this.generate_dropdown(this.rpm_dropdown_id, this.RPM_data, "RPM");
       let calculateBut = this.generate_button(this.calculateBtnID, "Calculate", this.calculate.bind(this)); // bind(this) keeps function bound to scope of the class when stored in buttons objects for event listener


       let form = this.generate_form([mtrlTxtBx, feedbx, tool_diameter_dropdown, tool_flute_number, RPM_dropdown, calculateBut]);

       this.clearPage();
       this.content_html.appendChild(form);

       let titleTxtNode = document.createTextNode(this.title);
       this.title_html.appendChild(titleTxtNode);
       window.location.hash = this.title;



       
    }

};
