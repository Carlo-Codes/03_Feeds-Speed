
export class Page{
   

    constructor(html_button){
      this.button = html_button; //the button element in the html
      window.location.hash = this.button.innerHTML;
      this.homeUrl = 'http://localhost:7800/'
    };

   
    
};