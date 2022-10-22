import { Page } from "./Page.js";

export class loginPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
    super(html_button, homeUrl, data_fetch_url, title);

    this.newuserAPI = "newuser"
    }


    async newusertoken(username, password, url) {
        let res =  await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json',
                    auth: `Basic ${btoa(username +":"+ password)}`},
          body : JSON.stringify({test:"suceesful123"})
        })
        let token = res.json()
        return token
      }


    async newuser(username, password){
        let token = await this.newusertoken(username, password, this.h_url + this.newuserAPI);
        document.cookie = `token=${token.accessToken}`
        this.accessToken = token.accessToken;
        console.log(token.accessToken);
    }

    async register(){
        let email = document.getElementById("Email").value;
        let password = document.getElementById("Password").value;

        this.newuser(email,password);
    }

   render_content(){
    this.clearPage();
    //hiding everything as i CBA to rebuild the the start of the app.
    let navbar = document.getElementById("nav");
    let contentContainer = document.getElementById("content_container");
    navbar.style.display = "none";
    contentContainer.style.display = "none";

    let login_form = document.createElement("form")

    let email_in = this.generate_input("Email", "text");
    let password_in = this.generate_input("Password", "text");

    let form = this.generate_form([email_in, password_in])
    document.body.append(form);
    let regBtn = this.generate_button("reg", "Register", this.register.bind(this));
    document.body.append(regBtn)
    


    }
}