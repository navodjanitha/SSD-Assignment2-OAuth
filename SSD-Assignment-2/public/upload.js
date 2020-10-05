/*
	Author - IT17096744 
	Author Name - N.J.Godewithana
	
	Author - IT17018524
	Author Name - R.M.R.U. Rivishanka
	
	This upload.js file contains the code uses to upload the image file in to the google drive using the access token
	
*/

$(document).ready(function(){
    
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
	
	//client id taken from the application registration
    var client_id = "879794459258-fdi44noq0dv8ul1t46nvrsc556hi372k.apps.googleusercontent.com";
	
	//redirect url in google console to the file upload page
    const redirect_uri = "http://localhost:3000/upload.html";
	
	//secret key 
    const client_secret = "E_myAtVH17nPEAQVbapzawaL";
	
	//url for google drive Resource Server
    const scope = "https://www.googleapis.com/auth/drive";
	
	//access token will be created when authentication happenning
    var access_token= "";
	
	  
	//access resource server API
    $.ajax({
        type: 'POST',
        url: "https://www.googleapis.com/oauth2/v4/token",
        data: {code:code
            ,redirect_uri:redirect_uri,
            client_secret:client_secret,
        client_id:client_id,
        scope:scope,
        grant_type:"authorization_code"}, //used the authorization code as the OAuth grant type, out of 4 types
        dataType: "json",
        success: function(resultData) {
           
           //this method will save data in local storage
           localStorage.setItem("accessToken",resultData.access_token);
           localStorage.setItem("refreshToken",resultData.refreshToken);
           localStorage.setItem("expires_in",resultData.expires_in);
           window.history.pushState({}, document.title, "/" + "upload.html"); //redirecting to same page after uploading a file
                      
        }
  });

    function stripQueryStringAndHashFromPath(url) {
        return url.split("?")[0].split("#")[0];
    }   

    var UploadImage = function (file) {
        this.file = file;
    };
    
    UploadImage.prototype.getType = function() {
        localStorage.setItem("type",this.file.type);
        return this.file.type;
    };
    UploadImage.prototype.getSize = function() {
        localStorage.setItem("size",this.file.size);
        return this.file.size;
    };
    UploadImage.prototype.getName = function() {
        return this.file.name;
    };
    UploadImage.prototype.doUploadImage = function () {
        var progress = this;
        var formData = new FormData();
    
        // add assoc key values, this will be posts values
        formData.append("file", this.file, this.getName());
        formData.append("upload_file", true);
    
		//request to upload the file to Google Drive
        $.ajax({
            type: "POST",
            beforeSend: function(request) {
                request.setRequestHeader("Authorization", "Bearer" + " " + localStorage.getItem("accessToken"));
                
            },
            url: "https://www.googleapis.com/upload/drive/v2/files",
            data:{
                uploadType:"media"
            },
            xhr: function () {
                var myXhr = $.ajaxSettings.xhr();
                if (myXhr.upload) {
                    myXhr.upload.addEventListener('progress', progress.progressHandling, false);
                }
                return myXhr;
            },
            success: function (data) {
                console.log(data);
            },
            error: function (error) {
                console.log(error);
            },
            async: true,
            data: formData,
            cache: false,
            contentType: false,
            processData: false,
            timeout: 60000
        });
    };
    
    UploadImage.prototype.progressHandling = function (event) {
        var percent = 0;
    };

	//upload the file
    $("#upload").on("click", function (e) {
        var file = $("#files")[0].files[0];
        var upload = new UploadImage(file); 
    
        // execute upload function
        upload.doUploadImage();
    });
    
});