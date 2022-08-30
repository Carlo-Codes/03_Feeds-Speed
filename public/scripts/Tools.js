import { Page } from "./Page.js";

export class Tools extends Page {
    constructor(tool_button){
        window.location.hash = tool_button.innerHTML;
    }

    async getToolsInfo(e){ //nuances to async functions in classed - look them up
        e.preventDefault(e);
        window.location.hash = toolBut.innerHTML;
         let res = await fetch (homeUrl + 'toolInfo',{
            method : 'GET',
            });
         let data_inc = await res.json();
         //console.log(data[3].ToolsDiameter);
         setTableDate(data_inc, html_table);
    
        }
}