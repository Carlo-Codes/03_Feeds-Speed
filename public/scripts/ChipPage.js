import { CalcPage } from "./CalcPage.js";

export class ChipPage extends CalcPage {
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        //INPUT IDS
        this.Feed_rt_input_id = "Feed Rate mm/m"
        this.material_input_id = "Material Name"
        
        //BUTTONS IDS
        this.calculateBtnID = "calculateCLBut"
        this.postBtnID = "post_calc"

        
        this.post_data;
    }

    calculateCL(){ // function for button calculating chipload
        
        let material =  document.getElementById(this.material_input_id);
        let toolDiamter = document.getElementById(this.tool_diameter_dropdown_id);
        let flute_no = document.getElementById(this.tool_flute_number_dropdown_id);
        let rpmDD = document.getElementById(this.rpm_dropdown_id);
        let feed_rate_in = document.getElementById(this.Feed_rt_input_id);
  
        let material_value = material.value;
        let toolD_string = toolDiamter.value;
        let toolD_value = Number(toolD_string.split("mm")[0]) //convert the string value in the dropdown to a number.
        let flute_value = flute_no.value;
        let rpm_value = rpmDD.value;
        let feed_rate = feed_rate_in.value;

        
        let chipload = feed_rate / (rpm_value * flute_value);
         //cant really work out chipload across bit diamteres!?
        
        let material_row = { // creating empty material row for insertion into materil db
            Material : material_value,
        };
        
        material_row[toolD_value] = chipload.toFixed(3); //inserting chipload data

        for (let i = 0 ; i < this.tool_diameters.length; i++){// estimating the rest of the chiploads
            let bitDimstring = this.tool_diameters[i].Diameter// finding possible tool dim from tool data
            let bitDim = Number(bitDimstring.split("mm")[0]) 
            if(bitDim != toolD_value){ // if the rest of the tools arent the one we just calculated
                let CLfactor = 1 + (bitDim - toolD_value)/10 //factor to aproximate rest of tool chipload
                material_row[bitDim] = chipload * CLfactor; //filling chiploads per tool diam with 0
                material_row[bitDim] = material_row[bitDim].toFixed(3)
            }
        }
        
        this.post_data = material_row;
        this.populate_results(material_row);
      }


      populate_results(material_row){ //populate the results container
        let results_html = document.getElementById("results");
        let results_to_add =[]
        results_html.replaceChildren(); //clearing previous

        let keys = Object.keys(material_row) // getting keys

        let material = this.createTextElement_id("span", "material", material_row["Material"])

        results_html.appendChild(material) // creating and rendering material name element

        for (let i = 0; i < keys.length; i++){ // iterating through rest of object and displaying
            if (keys[i] !== "Material"){
                let keySpan = this.createTextElement_id("span", "key", keys[i] + " :"); //my method for making elements
                let valueSpan = this.createTextElement_id("span", "value", material_row[keys[i]]);
                
                let keyValue = document.createElement("span")
                keyValue.setAttribute("id", "keyvalue")
                keyValue.appendChild(keySpan);
                keyValue.appendChild(valueSpan);   
                results_to_add.push(keyValue);
            }
        }
        let form = this.generate_form(results_to_add); //my method for making forms
        results_html.appendChild(form);

        let post_button = this.generate_button(this.postBtnID, "Post", this.post_resutls.bind(this))
        results_html.appendChild(post_button);
      }

      async post_resutls(){
        if (!this.post_data.Material){
            alert("Material must have a name to be posted")
            return
        }
        if (confirm(`post ${this.post_data.Material} to the database?`) === true){
            console.log(this.post_data);
            let res = fetch (this.h_url + "chippost", {
                method : 'POST',
                headers: {'Content-Type': 'application/json'},
                body : JSON.stringify(this.post_data),
            });    
        }
        
          
      };

    async render_content(){

        this.material_data = await this.getInfo(this.materials_url);
        this.tool_diameters = this.column_parser(this.material_data);

       let mtrlTxtBx = this.generate_input(this.material_input_id, "text");
       let feedbx = this.generate_input(this.Feed_rt_input_id, "number");

       let tool_diameter_dropdown = this.generate_dropdown(this.tool_diameter_dropdown_id, this.tool_diameters, "Diameter");
       let tool_flute_number = this.generate_dropdown(this.tool_flute_number_dropdown_id, this.flute_data, "flute");
       let RPM_dropdown = this.generate_dropdown(this.rpm_dropdown_id, this.RPM_data, "RPM");
       let calculateBut = this.generate_button(this.calculateBtnID, "Calculate", this.calculateCL.bind(this)); // bind(this) keeps function bound to scope of the class when stored in buttons objects for event listener


       let form = this.generate_form([mtrlTxtBx, feedbx, tool_diameter_dropdown, tool_flute_number, RPM_dropdown, calculateBut]);

       this.clearPage();
       this.content_html.appendChild(form);
       this.generate_results();

       let titleTxtNode = document.createTextNode(this.title);
       this.title_html.appendChild(titleTxtNode);
       window.location.hash = this.title;




       
    }

};
