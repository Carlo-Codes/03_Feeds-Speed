import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        //spliting up array
        this.tools_url = data_fetch_url[0]; //this is not very modular
        this.materials_url = data_fetch_url[1];

    }


  

    async generatePage(){
      //wiping previous page
      this.table_html.innerHTML = "";
      this.title_html.innerHTML = "";
      let tool_data = await this.getInfo(this.tools_url);
      let material_data = await this.getInfo(this.materials_url);
      

      
      let material_dropdown_title = `<label for = "Material"> Material :</label>\n`;
      
      function populate_dropdown(html_id, data){ //should be a prototype 
  
        //html component parts
        let dropdown_content_start = `<select id="${html_id}">\n`;
        let content = "";
        let dropdown_content_end = `</select>\n`;

        //logic
        for (let i=0; i < data.length; i++){
          let inject = data[i].Material
          content += `<option value="${inject}">${inject}</option>\n`;
        }
        let dropdown = dropdown_content_start + content + dropdown_content_end; // combinidng strings for html
        return dropdown;
      }
      console.log(material_data);
      console.log(populate_dropdown("material", material_data));

      let content = populate_dropdown("material", material_data);


      this.content_html.innerHTML = material_dropdown_title + populate_dropdown("material", material_data);


      
      //To Do Clean up and not above !!!

   


    }

    render_content(){

      this.generatePage();

    }

}