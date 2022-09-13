import { Page } from "./Page.js";

export class CalcPage extends Page{
    constructor(html_button, homeUrl, html_content){
        super(html_button, homeUrl);
        this.content = html_content.parentElement;
    }

    render_content(){
      this.content.innerHTML = "testing" 
    }

}