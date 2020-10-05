/*
	Author - IT17096744 
	Author Name - N.J.Godewithana
	
	Author - IT17018524
	Author Name - R.M.R.U. Rivishanka
	
	This index.js file contains the code uses authenticate user with the authentication server
	
*/


$(document).ready(function(){
     
	 //client id
     var clientId = "879794459258-fdi44noq0dv8ul1t46nvrsc556hi372k.apps.googleusercontent.com";
	 
	 //redirect url in google console to file upload page
     var redirect_uri = "http://localhost:3000/upload.html";
	 
	 //url for google drive Resource Server
     var scope = "https://www.googleapis.com/auth/drive";
	 
	 //url which our application hosted
     var url = "";


	 //function to invoke the authentication
     $("#login").click(function(){

        signInToGoogleAccount(clientId,redirect_uri,scope,url);

     });

	  //authentication using OAuth
     function signInToGoogleAccount(clientId,redirect_uri,scope,url){
      
        //OAuth url for the authentication and verification
        url = "https://accounts.google.com/o/oauth2/v2/auth?redirect_uri="+redirect_uri
        +"&prompt=consent&response_type=code&client_id="+clientId+"&scope="+scope
        +"&access_type=offline";
        window.location = url;

     }

});

