
export class Page{ //should only use classes for status' and should make a class per feature really, not per page
   

    constructor(html_button, homeUrl, data_fetch_url, title){

      //variables
      this.button = html_button; //the button element in the html
      this.h_url = homeUrl;
      this.url = data_fetch_url;
      this.title = title;
      window.location.hash = title;

      //html elements
      this.table_html = document.getElementsByTagName("table")[0];
      this.title_html = document.getElementById("title"); 
      this.content_html = document.getElementById("content");

      // buttons
      this.buttons = {}; //buttons and their functions stored here for eventlisteners on main.js

    };

    async getInfo(url){ //nuances to async functions in classed - look them up;
      let res = await fetch (this.h_url + url, {method : 'GET',});
      let data = await res.json();
      return data;
     };

    getMaterialDataRow(data, value){ //get the row we want for materials
      let value_row;
      let rowData;
      for (let i = 0; i < data.length; i++){ //testing to see where the data row is we want based on value
        if (data[i]["Material"] === value){
          value_row = i
        }
      }
      rowData = data[value_row];
      return rowData;
     };

     clearPage(){
      this.content_html.replaceChildren();
      this.title_html.replaceChildren();
      this.table_html.replaceChildren();
     }

     createTextElement_id(type = "div", id, text){
      let ele = document.createElement(type);
      ele.setAttribute("id", id);
      let txt = document.createTextNode(text);
      ele.appendChild(txt);
      return ele;
     }



     render_content(){
      this.clearPage();
      let intro = this.createTextElement_id("intro", "// fill this with comment box or something? or instructions")
      this.content_html.appendChild(intro);
      window.location.hash = this.title;
    }

};