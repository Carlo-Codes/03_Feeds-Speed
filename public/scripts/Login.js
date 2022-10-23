import { Page } from "./Page.js";

export class loginPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
    super(html_button, homeUrl, data_fetch_url, title);

    this.newuserAPI = "newuser"
    this.login_container = document.createElement("div");
    this.login_container.setAttribute("id", "login_container")

    this.button_container = document.createElement("div");
    this.button_container.setAttribute("id", "button_container")

    this.password_ID = "Password"
    this.email_ID = "Email"
    this.retypePasswors_ID = "Retype Password"

    this.checkuserexistsURL = 'checkuserexists'

    this.loginstatus = true

    document.body.append(this.login_container);
    document.body.append(this.button_container);
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

    async checkuserexists(username){
      let exists = await fetch(this.h_url + this.checkuserexistsURL,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username:username}),
      })
      let exists_check = exists.json();
      return exists_check;

    }

    credentialsInputCheck(username, password, password2=password){

      let pass = true

      if (username.length < 3 || username.indexOf('@') === -1){
        alert("invalid email adress")
        pass = false
        return
      }

      if (password.length < 5){
        alert("password must be more than 5 characters")
        pass = false
        return
      }
        
      if (password !== password2){
        alert("Passwords do not match")
        pass = false
        return
      }
      

      
      return pass
    }

    async register(){
        let email = document.getElementById(this.email_ID).value;
        let password = document.getElementById(this.password_ID).value;
        let retypePW = document.getElementById(this.retypePasswors_ID).value;

        let exists_check = await this.checkuserexists(email);

        if (exists_check.body === 1){
          alert("User already exist");
          return
        }

       let inputCheck = this.credentialsInputCheck(email,password,retypePW);
        
        if(inputCheck === true){

          this.newuser(email,password);
          alert("new user created");

        } 



        
    }

    async newlogintoken(){
      let email = document.getElementById(this.email_ID).value;
      let password = document.getElementById(this.password_ID).value;

      let exists_check = await this.checkuserexists(email);

      if (exists_check.body === 1){
        let res = await this.newusertoken(email, password, this.h_url + 'newlogin')
        
        //document.cookie = `token=${token.accessToken}`
        console.log(res);
      }


    }

    login_form(){
      let email_in = this.generate_input(this.email_ID, "text");
      let password_in = this.generate_input(this.password_ID, "text");

      let form = this.generate_form([email_in, password_in])
      
      return form

    }

    signUp_form(){

      let email_in = this.generate_input(this.email_ID, "text");
      let password_in = this.generate_input(this.password_ID, "text");
      let password_2 = this.generate_input(this.retypePasswors_ID, "text")

      let form = this.generate_form([email_in, password_in, password_2])
      
      return form

    }






   render_content(){
    this.clearPage();
    //hiding everything as i CBA to rebuild the the start of the app...i have learnt alot
    let navbar = document.getElementById("nav");
    let contentContainer = document.getElementById("content_container");
    navbar.style.display = "none";
    contentContainer.style.display = "none";

    

    this.login_container.append(this.signUp_form());
   
    
    let loginbtn = this.generate_button("login", "Login", this.newlogintoken.bind(this));
    let singupbtn = this.generate_button("signup", "Signup", this.register.bind(this))

    this.button_container.append(loginbtn);
    this.button_container.append(this.htmlbreak);
    this.button_container.append(singupbtn);
    
  
    
    


    }
}