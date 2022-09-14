
export class Page{ //should only use classes for status' and should make a class per feature really, not per page
   

    constructor(html_button, homeUrl, data_fetch_url, title){
      this.button = html_button; //the button element in the html
      this.h_url = homeUrl;
      this.hash = this.button.innerHTML;
      this.url = data_fetch_url;
      this.title = title;
      this.table_html = document.getElementsByTagName("table")[0];
      this.title_html = document.getElementById("title"); 
      this.content_html = document.getElementById("content");
    };

    async getInfo(url){ //nuances to async functions in classed - look them up;
      let res = await fetch (this.h_url + url, {method : 'GET',});
      let data = await res.json();
      return data;
     };

};