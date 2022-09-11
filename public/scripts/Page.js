
export class Page{ //should only use classes for status' and should make a class per feature really, not per page
   

    constructor(html_button, homeUrl){
      this.button = html_button; //the button element in the html
      this.h_url = homeUrl;
      this.hash = this.button.innerHTML;
    };

   
    
};