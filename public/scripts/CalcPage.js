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

        //DB data
        this.tool_data;
        this.material_data;
        this.flute_data;
        this.RPM_data


        this.retrieve_data(); //retrieves data on start up of a calculation page
    }

    async retrieve_data() { //getting data from db
      this.tool_data = await this.getInfo(this.tools_url);
      this.material_data = await this.getInfo(this.materials_url); 
      this.flute_data = [{flute:1}, {flute:2}, {flute:3}, {flute:4}]; // matching how the data comes in from data base
      this.RPM_data = [{RPM:12000},{RPM:13000},{RPM:14000},{RPM:15000},{RPM:16000},{RPM:17000},{RPM:18000},{RPM:19000},{RPM:20000},{RPM:21000}];
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
      for (let i=0; i < data.length; i++){
        let inject = data[i][key]; //getting the material name from db

        let dd_option = document.createElement("option");// creating dropdown options
        dd_option.setAttribute("value", `${inject}`);
        let dd_option_txt = document.createTextNode(`${inject}`);
        dd_option.appendChild(dd_option_txt);

        dropdown_content.appendChild(dd_option);
      }

       // combinidng for html
      console.log(label,dropdown_content);
      return [label, dropdown_content]; //!!!!!continue from here sort out generate forms()!!!!!!!
    }

    generate_input(html_id, type){ 

      //html component parts
      let label = document.createElement("label");
      label.setAttribute("for", `${html_id}`)
      let label_txt = document.createTextNode(`${html_id}`);
      label.appendChild(label_txt);

      let input = document.createElement("input");
      input.setAttribute("id", `${html_id}`);
      input.setAttribute("type", `${type}`);

       // combinidng strings for html
      
      return [label, input];
    }

    generate_form(inputs){
      let form = document.createElement("form");
  
      for (let i = 0; i < inputs.length; i++){
        let br = document.createElement("br");
        if (Array.isArray(inputs[i])){
          for (let j = 0; j < inputs[i].length; j++){ //input may be an array of arrays
            form.appendChild(inputs[i][j]);
            form.appendChild(br)
          }
        }
        else{
          form.appendChild(br)
          form.appendChild(inputs[i]);
        }
      }
      return form;
    }

    generate_results(){ // create a container for results
      let results = document.createElement("div");
      results.setAttribute("id", "results");
      this.content_html.appendChild(results); //`<div id = "results"></div>`;
    }

    generate_button(id, text, func){ //generate button. adds buttons data as button : function pairs. make sure to bind function to classes this
      let button = document.createElement("button")
      button.setAttribute("id", `${id}`)
      let but_text = document.createTextNode(text);
      button.appendChild(but_text);
      this.buttons[id] = func
      return button;
    }

  }