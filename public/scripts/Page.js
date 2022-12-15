
export class Page{ //should only use classes for status' and should make a class per feature really, not per page
   

    constructor(html_button, homeUrl, data_fetch_url, title){

      //variables
      this.button = html_button; //the button element in the html
      this.h_url = homeUrl;
      this.url = data_fetch_url;
      this.title = title;
      window.location.hash = title;
      this.accessToken = ""

      //html elements
      this.table_html = document.getElementsByTagName("table")[0];
      this.title_html = document.getElementById("title"); 
      this.content_html = document.getElementById("content");
      this.htmlbreak = document.createElement("br");

      // buttons
      this.buttons = {}; //buttons and their functions stored here for eventlisteners on main.js

    };

    async getInfo(url){ //nuances to async functions in classed - look them up;
      let res = await fetch (this.h_url + url, {
        method : 'GET',
        headers: {
          'Content-Type': 'application/json',
          'cookie' : document.cookie,
        }
      });

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
      let intro = this.createTextElement_id("div", "intro", "// Instructions coming soon")
      this.content_html.appendChild(intro);
      window.location.hash = this.title;

      
    }

    generate_button(id, text, func){ //generate button. adds buttons data as button : function pairs. make sure to bind function to classes this
      let button = document.createElement("button")
      button.setAttribute("id", `${id}`)
      button.setAttribute("type", "button");
      let but_text = document.createTextNode(text);
      button.appendChild(but_text);
      this.buttons[id] = func
      return button;
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

    //Authentication

    
    getcookievalue(name){ // getting cooking from the db browser
      let cookies = document.cookie
      let splitcookies = cookies.split(";");
      for (let i =0; i < splitcookies.length; i++){
        let target = splitcookies[i];
        if (target.indexOf(name)!== -1){
          let cookie = target.split("=")[1]
          return cookie
        }
      }
    }
    


};