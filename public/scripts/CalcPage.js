import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);

        //spliting up array
        
        this.materials_url = data_fetch_url;

        //html dropdown ids
        this.material_dropdown_id = "Material";
        this.tool_diameter_dropdown_id = "Tool Diameter";
        this.tool_flute_number_dropdown_id = "Tool Flutes";
        this.rpm_dropdown_id = "RPM";

        //DB data
        
        this.material_data;
        this.flute_data = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base
        this.RPM_data = [{RPM:12000},{RPM:13000},{RPM:14000},{RPM:15000},{RPM:16000},{RPM:17000},{RPM:18000},{RPM:19000},{RPM:20000},{RPM:21000}];
        this.tool_diameters = []

        
    }

  
    column_parser(data){
      let array = []
      let keys = Object.keys(data[0]) //columns of the database include name, user id etc
      for(let i = 3; i < keys.length; i++){ // start from 2 to only retrieve tool diameters 
        array.push({Diameter : keys[i]})
      }
      return array
    }


    generate_dropdown(html_id, data, key){ //should be a prototype; creates dropdowns

   

      //html component parts
      let label = document.createElement("label"); //creating label for dropdown
      label.setAttribute("for", `${html_id}`);
      let label_text = document.createTextNode(`${html_id} :`);
      label.appendChild(label_text);

      let dropdown_content = document.createElement("select"); // creating drop down
      dropdown_content.setAttribute("id", `${html_id}`)

      //creating content for drop down
      for (let i = 0; i < data.length; i++){
        let inject = data[i][key]; //getting the material name from db
        if (inject === null){
          inject = ""
        }

        let dd_option = document.createElement("option");// creating dropdown options
        dd_option.setAttribute("value", `${inject}`);
        let dd_option_txt = document.createTextNode(`${inject}`);
        dd_option.appendChild(dd_option_txt);

        dropdown_content.appendChild(dd_option);
      }

       // combinidng for html
      
      return [label, dropdown_content]; 
    }




    generate_results(){ // create a container for results
      let results = document.createElement("div");
      results.setAttribute("id", "results");
      this.content_html.appendChild(results); //`<div id = "results"></div>`;
    }



  }
