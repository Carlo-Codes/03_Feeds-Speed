import { Page } from "./Page.js";

export class loginPage extends Page{
    constructor(html_button, homeUrl, data_fetch_url, title){
    super(html_button, homeUrl, data_fetch_url, title);


    //html elements admin
    this.newuserAPI = "newuser"
    this.login_container = document.createElement("div");
    this.login_container.setAttribute("id", "login_container")

    this.button_container = document.createElement("div");
    this.button_container.setAttribute("id", "button_container")

    this.password_ID = "Password"
    this.email_ID = "Email"
    this.retypePasswors_ID = "Retype Password"

    this.checkuserexistsURL = 'checkuserexists'

    this.dbUserId; //for use when filtereing entire db

    document.body.append(this.login_container);
    document.body.append(this.button_container);
    }



    displayErr(text){ //displays errors udnder the loging container

      if(document.getElementById("error")){
        let oldErr = document.getElementById("error")
        oldErr.remove()
        let newErr = this.createTextElement_id("div","error",text);
        this.login_container.append(newErr);
    } else{
        let newErr = this.createTextElement_id("div","error",text);
        this.login_container.append(newErr);
    }
  }


    async newusertoken(username, password, url, callback) { //creat new token given api url
        let res =  await fetch(url, {
          method: "POST",
          headers: {'Content-Type': 'application/json',
                    auth: `Basic ${btoa(username.toLowerCase() +":"+ password)}`},
          body : JSON.stringify({test:"suceesful123"})
        })
        let authpackage = res
        return callback(authpackage)
      }


    async newuser(username, password){ //creates as new token while creating a new user in the db sdee server
        let token = await this.newusertoken(username, password, this.h_url + this.newuserAPI, (authpackage) => {
          document.cookie = `token=${token.accessToken}`
        });
        
    }

    async checkuserexists(username){ // check to see if user exists 
      let exists = await fetch(this.h_url + this.checkuserexistsURL,{
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username:username.toLowerCase()}),
      })
      let exists_check = exists.json();
      return exists_check;

    }

    credentialsInputCheck(username, password, password2=password){ //for login in, checks login crdedentials against database

      let pass = true

      if (username.length < 3 || username.indexOf('@') === -1){
        this.displayErr("Invalid Email adress")
        pass = false
        return
      }

      if (password.length < 5){
        this.displayErr("Password must be 5 charaters or more")
        pass = false
        return
      }
        
      if (password !== password2){
        this.displayErr("Passwords do not match")
        pass = false
        return
      }
      

      
      return pass
    }

    async register(){ // siging up a new user
        let email = document.getElementById(this.email_ID).value;
        let password = document.getElementById(this.password_ID).value;
        let retypePW = document.getElementById(this.retypePasswors_ID).value;

        let exists_check = await this.checkuserexists(email);

        if (exists_check.body === 1){
          this.displayErr(`User ${email} already exists`)
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

      if (email.length < 3 || email.indexOf('@') === -1){
        this.displayErr("invalid email adress")
        return

      } else if (exists_check.body === 1){
        let res = await this.newusertoken(email, password, this.h_url + 'newlogin', async (authpackage)=>{
          
          this.dbUserId = authpackage.userID;



          let resolvedauthpackage = await authpackage.json()
          console.log(resolvedauthpackage.credentials.token)
          
          document.cookie = `token=${resolvedauthpackage.credentials.token}`

        })

        

      }else {
        this.displayErr(`User ${email} Doesn't Exist`)
      }
      

    }

    async loginWithToken(callback = function() {}){
      document.cookie = "test=testestes"
      let token = this.getcookievalue("token");
      console.log("token clientside = " + token)
  
      console.log(token) 
      let res = await fetch(this.h_url + "tokenlogin", {
        method:"POST",
        headers: {'Content-Type': 'application/json',
        auth : token,}
        
      });

      let auth = await res.json()
      console.log(auth)///if some error, return err handle
      console.log
      if (auth.credentials.token === null || auth.credentials.token === false){
        console.log("not authorised")
        return callback()
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

    this.button_container.append(this.generate_button("test","test",this.loginWithToken.bind(this)));
    
  
    
    


    }
}