import { Page } from "./Page.js";

export class TablePage extends Page {
      constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        this.data; //table data to eventually display
         // string url to server to get data for table
      };


      setTableData(){ //populate table - a table will be on table pages
        let columns = Object.keys(this.data[0]);// recieve the coloumn headers
        let headers = document.createElement("tbody");  
        headers.setAttribute("class", "column_header");
        let rows = []; // empty row data
     
        for (let i = 0; i < columns.length; i++ ){
            let header_name = document.createElement("th")
            header_name.setAttribute("class","column_names");
            let text = document.createTextNode(`${columns[i]}`)
            header_name.appendChild(text);
            headers.appendChild(header_name)
        }

        this.table_html.appendChild(headers); //inject headers into html
     
        for (let i = 0; i < this.data.length; i++){ 
            let values = Object.values(this.data[i])//1 row of data
            let row = document.createElement("tr");//create a row

            for (let j = 0; j < values.length; j++){ //for every cell in row from data
               let cell = document.createElement("td");// create cell & add data
               let row_text = document.createTextNode(`${values[j]}`);
               cell.appendChild(row_text)
               row.appendChild(cell) // add cell to row
               
            };
            this.table_html.appendChild(row);
            console.log(row); //debug
         };
        
        
     };

      async render_content(){
         this.data = await super.getInfo(this.url);
         console.log(this.data)
         
         this.clearPage();
         this.title_html.innerHTML = this.title;
         this.setTableData();

         window.location.hash = this.title;
         

      };
};