import { Page } from "./Page.js";

export class TablePage extends Page {
    constructor(html_button, html_table, data_fetch_url){
        super(html_button);
        this.data; //table data to eventually display
        this.table = html_table; //the table element predefined in the html
        this.url = data_fetch_url // string url to server to get data for table
    };

    setTableData(){ //populate table - a table will be on table pages
        let columns = Object.keys(this.data[0]);// recieve the coloumn headers
        let headers = ['<tbody class = "column_header">'];  // empty column names
        let rows = []; // empty row data
     
        for (let i = 0; i < columns.length; i++ ){
           headers += `<th class = "column_names">${columns[i]}</th>`; //populate column names
        };
        headers += "</tbody>"
        this.table.innerHTML = headers; //inject headers into html
     
        for (let i = 0; i < this.data.length; i++){ 
           rows += `<tr>\n`; 
           let values = Object.values(this.data[i])//for 1 row 
           for (let j = 0; j < columns.length; j++){ //for every cell in row
              rows += `<td>${values[j]}</td>\n`;
           };
           rows += `</tr>\n`; //finish row
        };
        this.table.innerHTML += rows;// inject rows into html
        console.log(rows); //debug
     };


    async getToolsInfo(e){ //nuances to async functions in classed - look them up
        e.preventDefault(e);
        console.log("fired")
         let res = await fetch (homeUrl + this.url, {method : 'GET',});
         this.data = await res.json();
         setTableDate();
        };
};