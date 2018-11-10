let panel = {
    e: ['add-new-students', 'id-search-box', 'students-list', 'logout-button', 'student-image', 'img-content', 'save-new-students', 'studentimage', 'name-students', 'students-canvas', 'clear-new-students', 'error-modal-body', 'error-modal', 'generate-course-button', 'course-name', 'course-code', 'assign-course-name', 'assign-student-id', 'coursenames', 'studentids', 'assign-course-button', 'course-time', "attendance-image", "attendance-canvas", "clear-new-attendance", "save-new-attendance", "name-search-box", 'updateuserinfo', "attendance-current-time", "attendance-code", "attendance-time"],
    f: ['add-new-students-form'],
    g: ['management'],
    dev: true,
    counters: {
        students: 10
    },
    v: {
        stream: null,
        imageCapture: null,
        captureAudio: null,
        studentsCanvasState: false,
        attendanceCanvasState: false
    },
    init: function(){
        panel.checkToken();
        panel.setElements();
        panel.setAttributes();
        ams.e['loader-container'].remove();
    },
    alert: function(str){
        ams.e['error-modal-body'].innerHTML = str;
        $(ams.e['error-modal']).modal('toggle');
    },
    checkToken: function(){
        if(!ams.getCookie('token')){
            window.location = './';
        }
    },
    setAttributes: function(){
        ams.socket.emit('getuserinfo', ams.getCookie('token'));
    },
    setElements: function(){
        panel.e.forEach(function(k){
            ams.e[k] = ams.gebi(k);
        });
        panel.f.forEach(function(k){
            ams.f[k] = ams.gebi(k);
        });
        panel.g.forEach(function(k){
            ams.g[k] = ams.geci(k);
        });
        panel.v.captureAudio = new Audio('./www/assets/aud/camera.mp3');

        panel.setListeners();
    },
    setListeners: function(){
        ams.e['logout-button'].onclick = function(){
            document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location = "./";
        }
        managementLen = ams.g['management'].length;
        for(let k=0; k < managementLen; k++){
            if(ams.g['management'][k]){
                ams.g['management'][k].onclick = function(){
                    var type = ams.g['management'][k].id.split('-')[1];
                }
            }
        };

        ams.e['id-search-box'].oninput = function(){
            ams.e['name-search-box'].value = "";
            let param = this.value;
            let len = param.length;
            if(param == ""){
                ams.e["students-list"].innerHTML = '<div class="text-secondary h5">Enter an ID or Name above, to search for a student</div>';
                return false;
            }
            if(len > 9){
                this.value = param.substr(0,9);
            }
            ams.socket.emit('searchid', this.value);
        }
        
        ams.e['name-search-box'].oninput = function(){
            ams.e['id-search-box'].value = "";
            let param = this.value;
            let len = param.length;
            if(param == ""){
                ams.e["students-list"].innerHTML = '<div class="text-secondary h5">Enter an ID or Name above, to search for a student</div>';
                return false;
            }
            ams.socket.emit('searchname', this.value);
        }

        ams.e['student-image'].onclick = function(){
            panel.takePhoto(ams.e['students-canvas']);
        }

        // ams.e['add-new-students'].onclick = panel.showForm;

        ams.e["save-new-students"].onclick = panel.addStudent;

        ams.e['clear-new-students'].onclick = panel.clearStudentsCanvas;
        
        ams.e['generate-course-button'].onclick = panel.generateCourse;

        ams.e['assign-course-name'].onclick = panel.retreiveCourses;

        ams.e['assign-student-id'].onclick = panel.retreiveStudentIds;

        ams.e['assign-course-button'].onclick = panel.assignCourse;

        ams.e['attendance-image'].onclick = function(){
            panel.takePhoto(ams.e['attendance-canvas']);
        }

        ams.e['clear-new-attendance'].onclick = panel.clearAttendanceCanvas;

        ams.e['updateuserinfo'].onclick = panel.updateUserInfo;

        ams.e['studentimage'].oninput = panel.showImageinCanvas;

        ams.e["attendance-current-time"].onclick = function(){
            let d = new Date();
            let n = d.toTimeString().split(' ')[0];
            ams.e["attendance-time"].value = n;
        }

        ams.killForms();
    },
    showImageinCanvas: function(){
        if(ams.e['studentimage'].files.length > 0){
            var reader = new FileReader();
            reader.onload = function (e) {
                let i = new Image();
                i.src = e.target.result;
                i.style = "display:none; height:200px; width: auto";
                document.body.append(i);
                ams.e['students-canvas'].getContext('2d').clearRect(0, 0, ams.e['attendance-canvas'].width, ams.e['attendance-canvas'].height);
                ams.e["students-canvas"].getContext('2d').drawImage(i, 0, 0, 200, 200);
                panel.v.attendanceCanvasState = true;
            };
            reader.readAsDataURL(ams.e['studentimage'].files[0]);
        }
    },
    updateUserInfo: function(){
        let usernameBox = ams.gebi('change-username');
        let passwordBox = ams.gebi('change-password');
        let req = {
            token : ams.getCookie('token'),
            data : {
                name : usernameBox.value,
                pass : passwordBox.value
            }
        }
        ams.socket.emit('changecreds',req);
        usernameBox.value = "";
        passwordBox.value = "";
    },
    assignCourse: function(){
        let req = {
            id: ams.e['assign-student-id'].value,
            code: ams.e['assign-course-name'].value
        }
        if(req.id == "" || req.code == ""){
            panel.alert("Please input all of the fields.");
            return false;
        }
        ams.socket.emit('assigncourse', req);
    },
    retreiveCourses: function(){
        let code = ams.e['assign-course-name'].value;
        ams.socket.emit('retreivecourses', code);
    },
    retreiveStudentIds: function(){
        let code = ams.e['assign-student-id'].value;
        ams.socket.emit('retreivestudentids', code);
    },
    generateCourse: function(){
        let name = ams.e['course-name'].value;
        let code = ams.e['course-code'].value;
        let ctime = ams.e['course-time'].value;
        if(name == "" || code == "" || ctime == ""){
            panel.alert("Please input all of the fields");
            return false;
        } else {
            ams.socket.emit('checkcode', {name : name, code: code, time: ctime});
        }
    },
    clearAttendanceCanvas: function(){
        ams.e['attendance-canvas'].getContext('2d').clearRect(0, 0, ams.e['attendance-canvas'].width, ams.e['attendance-canvas'].height);
        panel.v.attendanceCanvasStateCanvasState = false;
    },
    clearStudentsCanvas: function(){
        ams.e['students-canvas'].getContext('2d').clearRect(0, 0, ams.e['students-canvas'].width, ams.e['students-canvas'].height);
        panel.v.studentCanvasState = false;
    },
    showForm: function(){
        let ins = $(ams.f['add-new-students-form']);
        if(ins.hasClass('d-none')){
            ins.removeClass('d-none');
        } else {
            ins.addClass('d-none');
        }
    },
    addStudent: function(){
        let files = ams.e['studentimage'].files;
        if(ams.e['name-students'].value == ""){
            panel.alert("Please enter a name for the Student");
            return false;
        }
        else{
            let response = {};
            if(files.length == 0){
                if(!panel.v.studentCanvasState){
                    panel.alert("Please add an image for the Student");
                    return false;
                } else {
                    response.name = ams.e['name-students'].value;
                    ams.socket.emit('register-student-file',response);
                    ams.e["save-new-students"].onclick = null;
                }
            } else {
                response.name = ams.e['name-students'].value;
                response.file = files[0];
                ams.socket.emit('register-student-file',response);
                ams.e["save-new-students"].onclick = null;
            }
        }
    },
    getMediaStream: function(newF, canvas)
    { 
        window.navigator.mediaDevices.getUserMedia({video: true})
        .then(function(mediaStream)
        { 
            panel.v.stream = mediaStream; 
            let mediaStreamTrack = mediaStream.getVideoTracks()[0];
            panel.v.imageCapture = new ImageCapture(mediaStreamTrack);
            if(newF != null){
                newF(canvas);
            }
        })
        .catch(panel.error);
    },
    error: function(error)
    { 
        if(panel.v.imageCapture){
            panel.v.imageCapture.track.stop();
        }
        if(panel.dev){
            panel.alert(`Kindly lock Dev Phase. If error persists, reload the page / app. Error: ${error}`);
        }
        console.error('error:', error); 
    },
    capPhoto: function(canvas){
        panel.v.captureAudio.play().then(function(){
            // var img = img || document.querySelector('img');
            
            // USE imageCapture.takePhoto if grabFrame() is not available
            // panel.v.imageCapture.takePhoto()
            // .then(blob => {
            //     let url = window.URL.createObjectURL(blob);
            //     img.src = url;
            //     URL.revokeObjectURL(blob); 
            // })
            panel.v.imageCapture.grabFrame()
            .then((bitmap) => {
                let context = canvas.getContext('2d');
                context.drawImage(bitmap, 0, 0, 200, 200);
                panel.v[`${canvas.id.split("-")[0]}CanvasState`] = true;
                panel.v.imageCapture.track.stop();
                panel.v.stream = null;
                panel.v.imageCapture = null;
                return canvas.toDataURL();
             }).then((src) => {
                 ams.socket.emit('save-image', src);
             })
            .catch(panel.error);
        }).catch(panel.error);
    },
    takePhoto: function(canvas)
    {
        panel.v.stream = null;
        panel.v.imageCapture = null;
        panel.getMediaStream(panel.capPhoto, canvas);    
    }
}
panel.init();