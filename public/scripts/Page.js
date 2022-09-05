
export class Page{
   

    constructor(html_button, homeUrl){
      this.button = html_button; //the button element in the html
      this.h_url = homeUrl;
      this.hash = this.button.innerHTML;
    };

   
    
};