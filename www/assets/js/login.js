let login = {
    checkToken: function(){
        if(ams.getCookie('token')){
            window.location = './panel';
        }
    }
}
login.checkToken();