var ams = {
    e: {
        'main' : null,
        'loader-container': null,
        "login-button": null
    },
    f: {
        'login-form': null
    },
    g: {

    },
    i: {

    },
    socket: null,
    init : function(){
        document.addEventListener('DOMContentLoaded', ams.proceed, false);
    },
    proceed: function(){
        ams.createSocket();
        ams.setElements();
        ams.killForms();
        ams.addListeners();
        ams.setControls();
    },
    setControls: function(){
        if (ams.gebi('username')){
            ams.gebi('username').focus();
        }
    },
    setCookie: function(cname, cvalue, exdays) {
        var d = new Date();
        d.setTime(d.getTime() + (exdays*24*60*60*1000));
        var expires = "expires="+ d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    },
    getCookie: function(cname) {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent(document.cookie);
        var ca = decodedCookie.split(';');
        for(var i = 0; i <ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                return c.substring(name.length, c.length);
            }
        }
        return "";
    },
    addListeners: function(){
        if(ams.e['login-button']){
            ams.e['login-button'].onclick = ams.login;
            ams.f['login-form'].onkeypress = function(e){
                e = e || window.event
                if(e.key == "Enter" || e.charCode == 13){
                    ams.login();
                }
            }
        }
        ams.socket.on('message', function(msg){
            console.log(msg);
        });
        ams.socket.on('error', function(msg){
            panel.alert(msg);
            $(ams.e["processor"]).removeClass("active");
            panel.clearAttendanceCanvas();
            ams.e["attendance-code"].value = "";
            ams.e["attendance-time"].value = "";
        });
        ams.socket.on('loginsuccess', function(msg){
            ams.setCookie('token', msg.token, 1);
            window.location = './panel';
        });
        ams.socket.on('studentsreturned', function(msg){
            let useList = msg.type + '-list';
            ams.e[useList].innerHTML = "";
            let htmlString = "";
            if(msg.array.length > 0){
                msg.array.forEach(function(el){
                    if(el.hasOwnProperty('name')){
                        htmlString += "<li class='card p-2 rounded'><small><b>"+el.name+"</b>";
                        htmlString += "<br>( <b>ID</b> : "+el.ID+" )";
                        htmlString += "</small></li>";
                    };
                });
                $(ams.e['students-list']).addClass('vertical-scroll');
            } else {
                htmlString = '<div class="text-secondary h5">Enter an ID or Name above, to search for a student</div>';
                $(ams.e['students-list']).removeClass('vertical-scroll');
            }
            ams.e[useList].innerHTML = htmlString;

        });

        ams.socket.on('filenotpresent', function (msg) {
            ams.e["save-new-students"].onclick = panel.addStudent;
            panel.alert(msg);
        });

        ams.socket.on('studentregistered', function(msg){
            ams.e["save-new-students"].onclick = panel.addStudent;
            panel.alert(`<br><br>New Student Registered.<br><br><br><b>Name</b> : ${msg.name}<br><b>ID</b> : ${msg.ID}`);
            ams.e["name-students"].value = "";
            panel.clearStudentsCanvas();
        });

        ams.socket.on('gotcode', function(msg){
            panel.alert(msg);
            ams.e['course-name'].value = "";
            ams.e['course-code'].value = "";
            ams.e['course-time'].value = "";
        });

        ams.socket.on('receivecourses', function(arr){
            let opts = "";
            arr.forEach(function(c){
                opts += `<option value='${c.code}'>${c.name}</option>`;
            });
            ams.e["coursenames"].innerHTML = opts;
        });

        ams.socket.on('receivestudents', function (arr) {
            let opts = "";
            arr.forEach(function (c) {
                opts += `<option value='${c.ID}'>${c.name}</option>`;
            });
            ams.e["studentids"].innerHTML = opts;
        });

        ams.socket.on('assignprocess', function(process){
            panel.alert(process);
            ams.e["assign-student-id"].value = "";
            ams.e["assign-course-name"].value = "";
        });

        ams.socket.on('userinforeturned', function(msg){
            if(typeof(msg) != 'object'){
                if(msg.error){
                    panel.alert(msg);
                }
            } else if(!msg.error){
                ams.gebi('change-username').placeholder = msg.username;
                let len = msg.passlen;
                for(let i=0; i<len; i++){
                    ams.gebi('change-password').placeholder += '*';
                }
            }
        });

        ams.socket.on('changedinfo', function(msg){
            if(msg.error){
                panel.alert(msg.msg);
            } else {
                ams.gebi('change-password').value = msg.msg.name;
                panel.alert(msg.msg.message);
            }
        });

        ams.socket.on("test", function(msg) {
            window.msg = msg;
            console.log(msg);
        });

        ams.socket.on("attendance-check-return", function(msg){
            $(ams.e["processor"]).removeClass("active");
            if(msg.error){
                panel.alert(msg.message);
                panel.clearAttendanceCanvas();
                if(msg.state == 0){
                    ams.e["attendance-code"].value = "";
                }
            } else {
                panel.v.attendancetoken = msg.message;
                $(ams.e["mark-attendance"]).removeClass("d-none");
            }
        });

        ams.socket.on("attendancemarked", function(msg){
            panel.alert(msg);
            ams.e["attendance-code"].value = "";
            panel.clearAttendanceCanvas();
            $(ams.e["processor"]).removeClass("active");
        });
        
        ams.socket.on("reportready", function(msg){
            panel.alert(msg);
        })

        ams.socket.on("receivereport", function(msg){
            console.log(msg);
            if(msg.error){
                panel.alert("The report could not be generated");
            } else {
                $.ajax({
                    url: 'http://localhost/getreport',
                    method: 'POST',
                    xhrFields: {
                        responseType: 'blob'
                    },
                    success: function (data) {
                        var a = document.createElement('a');
                        var url = window.URL.createObjectURL(data);
                        a.href = url;
                        a.download = 'report.xlsx';
                        a.click();
                        window.URL.revokeObjectURL(url);
                        panel.alert("Report has been downloaded");
                    },
                    error: function(err){
                        panel.alert("An unhandled exception occured");
                    }
                });
            }
        })
    },
    login: function(){
        ams.socket.emit('logmein',{username : ams.gebi('username').value, password: ams.gebi('password').value});
        return false;
    },
    killForms: function(){
        Object.keys(ams.f).forEach(function(k){
            if(ams.f[k]){
                ams.f[k].onsubmit = function(e){
                    try{
                        e.preventDefault();return false;
                    } catch(err){
                        window.event.preventDefault();return false;
                    }
                }
            }
        });
    },
    gebi: function(id){
        return document.getElementById(id);
    },
    geci: function(classname){
        return Array.from(document.getElementsByClassName(classname));
    },
    createSocket: function(){
        ams.socket = io('http://localhost:9899');
    },
    setElements: function(){
        Object.keys(ams.e).forEach(function(k){
            ams.e[k] = ams.gebi(k);
        });
        Object.keys(ams.f).forEach(function(k){
            ams.f[k] = ams.gebi(k);
        });
        Object.keys(ams.g).forEach(function(k){
            ams.g[k] = ams.geci(k);
        });
    },
    getParam: function(string, param){
        let url = new URL(string);
        let c = url.searchParams.get(param);
        if(c != undefined && c != null && c != ""){
            return c;
        } else {
            return null;
        }
    },
    clear: function(interval){
        window.clearInterval(interval);
    },
    loadScreen: function(){
        let then = new Date().getTime();
        let setOpacity = 1;
        ams.e['loader-container'].style.opacity = setOpacity;
        ams.i.loadInterval = window.setInterval(function(){
            let now = new Date().getTime();
            if(now - then > 1000){
                setOpacity -= 0.01;
                ams.e['loader-container'].style.opacity = setOpacity; 
            }
            if(now - then > 1500){
                if(ams.getParam(location.href, "alert")){
                    alert(ams.getParam(location.href,'alert'));
                } else if(ams.getCookie('token')){
                    let panelScript = document.createElement('script');
                    panelScript.src = '../www/assets/js/panel.js';
                    document.body.append(panelScript);
                } else {
                    ams.e['loader-container'].remove();
                }
                ams.clear(ams.i.loadInterval);
            }
        });
    }
}

ams.init();
window.onload = ams.loadScreen;