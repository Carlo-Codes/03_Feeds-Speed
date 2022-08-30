
export class Page{
    constructor(html_table){
        
    }

    table = html_table

    setTableDate(data, table){ //populate table - a table will be on most pages
        let columns = Object.keys(data[0]);// recieve the coloumn headers
        let headers = ['<tbody class = "column_header">'];  // empty column names
        let rows = [] // empty row data
     
        for (let i = 0; i < columns.length; i++ ){
           headers += `<th class = "column_names">${columns[i]}</th>`; //populate column names
        }
        headers += "</tbody>"
        table.innerHTML = headers; //inject headers into html
     
        for (let i = 0; i < data.length; i++){ 
           rows += `<tr>\n`; 
           let values = Object.values(data[i])//for 1 row
           for (let j = 0; j < columns.length; j++){ //for every cell in row
              rows += `<td>${values[j]}</td>\n`;
           };
           rows += `</tr>\n`; //finish row
        };
        table.innerHTML += rows;// inject rows into html
        console.log(rows); //debug
     };
}