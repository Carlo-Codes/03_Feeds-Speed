import { Page } from "./Page.js";

export class TablePage extends Page {
      constructor(html_button, homeUrl, data_fetch_url, title){
        super(html_button, homeUrl, data_fetch_url, title);
        this.data; //table data to eventually display
         // string url to server to get data for table
      };


      setTableData(){ //populate table - a table will be on table pages
         
         let that = this
         //bringing this in from outside
        
        let homeUrl = this.h_url; 

        let columns = Object.keys(this.data[0]);// recieve the coloumn headers
        let headers = document.createElement("tbody");  
        headers.setAttribute("class", "column_header");
        let rows = []; // empty row data


        //////for Adding data row/////
        let addRow = document.createElement("tr"); //creating a row for inputing data
        addRow.setAttribute("id", "addrow"); 

        let add_material = function(){ // creating event handler for add material buttpn
           console.log("test");
           let adddata = {};
           for (let i = 2; i < columns.length; i++ ){ // must match the hiding of material ID
               let value = document.getElementById(`input${columns[i]}`).value;
               adddata[columns[i]] = value
           }
           for (const key in adddata){
            if(adddata[key] === null || adddata[key] === ""){
               alert("There is missing data")
               return
            }}

           if (confirm(`add ${adddata['Material']} to the database?`)){// checkign the user wants to delet the row // could make this a function as it repeats
            
            let res = fetch(homeUrl + 'addmaterial', { //add data to database
               method : 'POST',
               headers : {'Content-Type': 'application/json'},
               body : JSON.stringify(adddata),
            })
         }

            //add new data to table 
            let newrow = document.createElement("tr");
            for (let i = 0; i < Object.keys(adddata).length; i++){
               let newcell = document.createElement("td");
               let newtext = document.createTextNode(adddata[Object.keys(adddata)[i]])
               newcell.appendChild(newtext);
               newrow.appendChild(newcell)
            }
            let table_html = document.getElementsByTagName("table")[0];
            table_html.insertBefore(newrow,table_html.lastChild)

          }
        

        ///////

          /////building the headers/////
        for (let i = 2; i < columns.length; i++ ){ //start from 2 to hide the material id from user
            let header_name = document.createElement("th")
            header_name.setAttribute("class","column_names");
            let text = document.createTextNode(`${columns[i]}`)
            header_name.appendChild(text);
            headers.appendChild(header_name)
            let input_type = ""
            let step = ""

            if(i === 2){ //logic to determin which input type to use. 2 being the materials name.
               input_type = "text"
            } else {
               input_type = "number"
               step = "0.05"
            }
            //creating add data cells for adding data
            let cellInput = this.generate_input(`input${columns[i]}`, input_type); // creating inputs to inject into cells
            let cellInputbox = cellInput[1
            ]
            cellInputbox.setAttribute("class", "addinput")
            cellInputbox.setAttribute("step", step)
            let cell = document.createElement("td")//creating cell
            cell.appendChild(cellInputbox)// injecting to cells
            
            addRow.appendChild(cell); //adding input cells to the add row previously created. see Page.generate_input for explanation fo "[2]"

        }

        let button_col = this.createTextElement_id("th", "bnt_hdr"," "); //adding button columns for del etc
        headers.appendChild(button_col);

       this.table_html.appendChild(headers); //inject headers into html






        ////populating table///
        for (let i = 0; i < this.data.length; i++){ //for every row in table
            let values = Object.values(this.data[i])//2 row of data
            let row = document.createElement("tr");//create a row
            row.setAttribute("id", `row${i}`)

            for (let j = 2; j < values.length; j++){ //start from 2 to hide material id from user
               let cell = document.createElement("td");// create cell & add data
               let row_text = document.createTextNode(`${values[j]}`);
               cell.appendChild(row_text)
               row.appendChild(cell) // add cell to row
            };


            //Adding the delete button to eacj row
            function delete_row (){ // this is the delete button handler callback
               let rowdata = that.data[i]//the row we want to delete.
               if (confirm(`Delete ${rowdata['Material']} from the database?`)){// checkign the user wants to delet the row
                  let res = fetch(homeUrl + 'delmatrow', {
                     method : 'POST',
                     headers : {'Content-Type': 'application/json'},
                     body : JSON.stringify(rowdata),
                  })
                  document.getElementById(`row${i}`).remove(); // deletes the data from the dom as it will not refesh automatically
               }
            }

            let delBtn = this.generate_button(`del${i}`, "Delete", delete_row.bind(this));
            row.appendChild(delBtn);
            this.table_html.appendChild(row); //add rows to table
         
         };

         //adding the add button
         let addbtn = this.generate_button(`addbtn${this.title}`, "Add", add_material) // creating the add button & cell
         let addcell = document.createElement("td");
         addcell.appendChild(addbtn);
         addRow.appendChild(addcell);
            
         this.table_html.appendChild(addRow);

     };



      async render_content(){
         this.data = await this.getInfo(this.url);
         console.log(this.data)
         
         this.clearPage();
         this.title_html.innerHTML = this.title;
         this.setTableData();

         window.location.hash = this.title;
         

      };
};