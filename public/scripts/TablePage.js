import { Page } from "./Page.js";

export class TablePage extends Page {
      constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        this.data; //table data to eventually display
         // string url to server to get data for table
      };


      setTableData(){ //populate table - a table will be on table pages
         this.table_html.innerHTML = ""
        let columns = Object.keys(this.data[0]);// recieve the coloumn headers
        let headers = ['<tbody class = "column_header">'];  // empty column names
        let rows = []; // empty row data
     
        for (let i = 0; i < columns.length; i++ ){
           headers += `<th class = "column_names">${columns[i]}</th>`; //populate column names
         };
        headers += "</tbody>"
        this.table_html.innerHTML = headers; //inject headers into html
     
        for (let i = 0; i < this.data.length; i++){ 
           rows += `<tr>\n`; 
           let values = Object.values(this.data[i])//for 1 row 
           for (let j = 0; j < columns.length; j++){ //for every cell in row
              rows += `<td>${values[j]}</td>\n`;
           };
           rows += `</tr>\n`; //finish row
         };
        this.table_html.innerHTML += rows;// inject rows into html
        //console.log(rows); //debug
     };

      async render_content(){
         this.data = await super.getInfo(this.url);
         this.title_html.innerHTML = "";
         this.content_html.innerHTML = ""; //clearing previous page
         this.title_html.innerHTML = this.title;
         this.setTableData();
         window.location.hash = this.hash;
         

      };
};