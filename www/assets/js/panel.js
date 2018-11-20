let panel = {
    e: ['add-new-students', 'id-search-box', 'students-list', 'logout-button', 'student-image', 'img-content', 'save-new-students', 'studentimage', 'name-students', 'students-canvas', 'clear-new-students', 'error-modal-body', 'error-modal', 'generate-course-button', 'course-name', 'course-code', 'assign-course-name', 'assign-student-id', 'coursenames', 'studentids', 'assign-course-button', 'course-time', "attendance-image", "attendance-canvas", "clear-new-attendance", "check-new-attendance", "name-search-box", 'updateuserinfo', "attendance-current-time", "attendance-code", "attendance-time", "students-video-canvas", "attendance-video-canvas", "strip-button-attendance", "attendanceModal", "mark-attendance", "buffer-canvas", "processor", "select-course", "lecture-from", "lecture-to", "generatereport", 'courses-card'],
    f: ['add-new-students-form', 'attendance-form', "reporting-form"],
    g: ['management'],
    dev: false,
    counters: {
        students: 10
    },
    i: {},
    v: {
        stream: null,
        imageCapture: null,
        captureAudio: null,
        studentsCanvasState: false,
        attendanceCanvasState: false
    },
    init: function () {
        panel.checkToken();
        panel.setElements();
        panel.setAttributes();
        ams.e['loader-container'].remove();
        panel.deployedVersion();
        panel.loadData();
    },
    loadData: function(){
        ams.socket.emit("getcourses", null);
    },
    deployedVersion: function () {
        if (panel.dev) {
            $("#strip-button-report")[0].click();
        }
    },
    alert: function (str) {
        ams.e['error-modal-body'].innerHTML = str;
        $(ams.e['error-modal']).modal('toggle');
    },
    checkToken: function () {
        if (!ams.getCookie('token')) {
            window.location = './';
        }
    },
    setAttributes: function () {
        ams.socket.emit('getuserinfo', ams.getCookie('token'));
    },
    setElements: function () {
        panel.e.forEach(function (k) {
            ams.e[k] = ams.gebi(k);
        });
        panel.f.forEach(function (k) {
            ams.f[k] = ams.gebi(k);
        });
        panel.g.forEach(function (k) {
            ams.g[k] = ams.geci(k);
        });
        panel.v.captureAudio = new Audio('./www/assets/aud/camera.mp3');

        panel.setListeners();
    },
    logout: function () {
        document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location = "./";
    },
    setListeners: function () {
        ams.e['logout-button'].onclick = panel.logout;
        managementLen = ams.g['management'].length;
        for (let k = 0; k < managementLen; k++) {
            if (ams.g['management'][k]) {
                ams.g['management'][k].onclick = function () {
                    var type = ams.g['management'][k].id.split('-')[1];
                }
            }
        };

        ams.e['id-search-box'].oninput = function () {
            ams.e['name-search-box'].value = "";
            let param = this.value;
            let len = param.length;
            if (param == "") {
                ams.e["students-list"].innerHTML = '<div class="text-secondary h5">Enter an ID or Name above, to search for a student</div>';
                return false;
            }
            if (len > 9) {
                this.value = param.substr(0, 9);
            }
            ams.socket.emit('searchid', this.value);
        }

        ams.e['name-search-box'].oninput = function () {
            ams.e['id-search-box'].value = "";
            let param = this.value;
            let len = param.length;
            if (param == "") {
                ams.e["students-list"].innerHTML = '<div class="text-secondary h5">Enter an ID or Name above, to search for a student</div>';
                return false;
            }
            ams.socket.emit('searchname', this.value);
        }

        ams.e['student-image'].onclick = function () {
            panel.takePhoto(ams.e['students-canvas']);
        }

        // ams.e['add-new-students'].onclick = panel.showForm;

        ams.e["save-new-students"].onclick = panel.addStudent;

        ams.e['clear-new-students'].onclick = panel.clearStudentsCanvas;

        ams.e['generate-course-button'].onclick = panel.generateCourse;

        ams.e['assign-course-name'].onclick = panel.retreiveCourses;

        ams.e['assign-student-id'].onclick = panel.retreiveStudentIds;

        ams.e['assign-course-button'].onclick = panel.assignCourse;

        ams.e['attendance-image'].onclick = function () {
            panel.takePhoto(ams.e['attendance-canvas']);
        }

        ams.e['clear-new-attendance'].onclick = panel.clearAttendanceCanvas;

        ams.e['updateuserinfo'].onclick = panel.updateUserInfo;

        ams.e['studentimage'].oninput = panel.showImageinCanvas;

        ams.e["attendance-current-time"].onclick = function () {
            // let d = new Date();
            // let n = d.toTimeString().split(' ')[0];
            // ams.e["attendance-time"].value = n;
        }

        panel.setVideoCanvas(ams.e["students-video-canvas"]);

        ams.e["strip-button-attendance"].onclick = function () {
            let classtoadd = ams.e['logout-button'].className;
            ams.e['logout-button'].remove();
            let logoutButton = document.createElement("button");
            logoutButton.id = "logout-button";
            logoutButton.className += classtoadd;
            logoutButton.innerText += "Exit";
            ams.e["logout-button"] = logoutButton;
            ams.e["logout-button"].onclick = panel.logout;
            ams.e["attendanceModal"].append(ams.e["logout-button"]);
            panel.setVideoCanvas(ams.e["attendance-video-canvas"]);
            $(ams.e["attendanceModal"]).addClass("active");
            panel.i.timeInterval = window.setInterval(function () {
                let d = new Date();
                let n = d.toTimeString().split(' ')[0].split(/[:][0-9]{2}$/)[0];
                ams.e["attendance-time"].value = n;
            }, 1000);
        }

        ams.e["check-new-attendance"].onclick = panel.checkForImage;

        ams.e["mark-attendance"].onclick = panel.markAttendance;

        ams.e["generatereport"].onclick = panel.generatereport;

        ams.killForms();
    },
    generatereport: function(){
        let data = {
            code: ams.e["select-course"].value,
            from: ams.e["lecture-from"].value,
            to: ams.e["lecture-to"].value
        }
        var exit = false;
        Object.keys(data).forEach(function(k){
            if(data[k] == ""){
                exit = true;
            }
        });
        if(exit){
            panel.alert("Please input all of the fields");
        } else {
            // $(ams.e["processor"]).addClass("active");
            panel.alert("Report is being downloaded");
            ams.socket.emit("generatereport", data);
        }
    },
    markAttendance: function(){
        $(ams.e["processor"]).addClass("active");
        let pushdata = { token: panel.v.attendancetoken };
        ams.socket.emit("markattendance", pushdata);
        console.log(pushdata);
    },
    checkForImage: function () {
        $(ams.e["processor"]).addClass("active");
        let drawImage = ams.e["attendance-canvas"].toDataURL("image/png");
        let i = new Image();
        i.style = "height:200px; width: auto";
        i.src = drawImage;
        document.body.append(i);
        // ams.e['buffer-canvas'].getContext('2d').clearRect(0, 0, 200, 200);
        // ams.e["buffer-canvas"].getContext('2d').drawImage(i, 0, 0, 200, 200);
        var data = {
            file: ams.e["attendance-video-canvas"].toDataURL(),
            code: ams.e["attendance-code"].value,
            time: ams.e["attendance-time"].value
        };
        Object.keys(data).forEach(function(k){
            if(data[k] == null || data[k] == ""){
                panel.alert("Please input all of the fields.");
                return false;
            }
        })
        ams.socket.emit("checkimageinset", data);
        i.remove();
    },
    showImageinCanvas: function () {
        if (ams.e['studentimage'].files.length > 0) {
            var reader = new FileReader();
            reader.onload = function (e) {
                let i = new Image();
                i.src = e.target.result;
                i.style = "height:200px; width: auto";
                document.body.append(i);
                ams.e['students-canvas'].getContext('2d').clearRect(0, 0, ams.e['students-canvas'].width, ams.e['students-canvas'].height);
                ams.e["students-canvas"].getContext('2d').drawImage(i, 0, 0, ams.e['students-canvas'].width, ams.e['students-canvas'].height);
                panel.v.studentsCanvasState = true;
                i.remove();
            };
            reader.readAsDataURL(ams.e['studentimage'].files[0]);
        }
    },
    updateUserInfo: function () {
        let usernameBox = ams.gebi('change-username');
        let passwordBox = ams.gebi('change-password');
        let lateBox = ams.gebi("change-late");
        let req = {
            token: ams.getCookie('token'),
            data: {
                name: usernameBox.value,
                pass: passwordBox.value,
                late: lateBox.value
            }
        }
        ams.socket.emit('changecreds', req);
        usernameBox.value = "";
        passwordBox.value = "";
        lateBox.value = "";
    },
    assignCourse: function () {
        let req = {
            id: ams.e['assign-student-id'].value,
            code: ams.e['assign-course-name'].value
        }
        if (req.id == "" || req.code == "") {
            panel.alert("Please input all of the fields.");
            return false;
        }
        ams.socket.emit('assigncourse', req);
    },
    retreiveCourses: function () {
        let code = ams.e['assign-course-name'].value;
        ams.socket.emit('retreivecourses', code);
    },
    retreiveStudentIds: function () {
        let code = ams.e['assign-student-id'].value;
        ams.socket.emit('retreivestudentids', code);
    },
    generateCourse: function () {
        let name = ams.e['course-name'].value;
        let code = ams.e['course-code'].value;
        let ctime = ams.e['course-time'].value;
        if (name == "" || code == "" || ctime == "") {
            panel.alert("Please input all of the fields");
            return false;
        } else {
            ams.socket.emit('checkcode', { name: name, code: code, time: ctime });
        }
    },
    clearAttendanceCanvas: function () {
        $(ams.e["mark-attendance"]).addClass("d-none");
        ams.e['attendance-canvas'].getContext('2d').clearRect(0, 0, ams.e['attendance-canvas'].width, ams.e['attendance-canvas'].height);
        panel.v.attendanceCanvasState = false;
        $(ams.e["attendance-video-canvas"]).addClass("active");
    },
    clearStudentsCanvas: function () {
        ams.e['students-canvas'].getContext('2d').clearRect(0, 0, ams.e['students-canvas'].width, ams.e['students-canvas'].height);
        panel.v.studentsCanvasState = false;
        $(ams.e["students-video-canvas"]).addClass("active");
    },
    showForm: function () {
        let ins = $(ams.f['add-new-students-form']);
        if (ins.hasClass('d-none')) {
            ins.removeClass('d-none');
        } else {
            ins.addClass('d-none');
        }
    },
    addStudent: function () {
        let files = ams.e['studentimage'].files;
        if (ams.e['name-students'].value == "") {
            panel.alert("Please enter a name for the Student");
            return false;
        }
        else {
            let response = {};
            if (files.length == 0) {
                if (!panel.v.studentsCanvasState) {
                    panel.alert("Please add an image for the Student");
                    return false;
                } else {
                    response.name = ams.e['name-students'].value;
                    ams.socket.emit('register-student-file', response);
                    ams.e["save-new-students"].onclick = function (e) { e.preventDefault; return false; };
                }
            } else {
                response.name = ams.e['name-students'].value;
                response.file = files[0];
                ams.socket.emit('register-student-file', response);
                ams.e["save-new-students"].onclick = function (e) { e.preventDefault; return false; };
            }
        }
    },
    setVideoCanvas: function (canvas) {
        ; (function () {

            navigator.getUserMedia = navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia;

            if (!navigator.getUserMedia) { return false; }

            var width = 0, height = 0;

            ctx = canvas.getContext('2d');
            //   document.body.appendChild(canvas);

            var video = document.createElement('video'),
                track;
            video.setAttribute('autoplay', true);

            window.vid = video;

            function getWebcam() {

                navigator.getUserMedia({ video: true, audio: false }, function (stream) {
                    video.src = window.URL.createObjectURL(stream);
                    track = stream.getTracks()[0];
                }, function (e) {
                    console.error('Rejected!', e);
                });
            }

            getWebcam();

            var rotation = 0,
                loopFrame,
                centerX,
                centerY,
                twoPI = Math.PI * 2;

            function loop() {

                loopFrame = requestAnimationFrame(loop);
                ctx.save();
                ctx.globalAlpha = 0.1;
                ctx.drawImage(video, 0, 0, width, height);

                ctx.restore();

            }
            function startLoop() {
                loopFrame = loopFrame || requestAnimationFrame(loop);
            }
            video.addEventListener('loadedmetadata', function () {
                width = canvas.width = video.videoWidth;
                height = canvas.height = video.videoHeight;
                centerX = width / 2;
                centerY = height / 2;
                startLoop();
            });

            canvas.addEventListener('click', function () {
                if (track) {
                    if (track.stop) { track.stop(); }
                    track = null;
                } else {
                    getWebcam();
                }
            });


        })()
    },
    getMediaStream: function (newF, canvas) {
        window.navigator.mediaDevices.getUserMedia({ video: true })
            .then(function (mediaStream) {
                panel.v.stream = mediaStream;
                let mediaStreamTrack = mediaStream.getVideoTracks()[0];
                panel.v.imageCapture = new ImageCapture(mediaStreamTrack);
                if (newF != null) {
                    newF(canvas);
                }
            })
            .catch(panel.error);
    },
    error: function (error) {
        if (panel.v.imageCapture) {
            panel.v.imageCapture.track.stop();
        }
        if (panel.dev) {
            panel.alert(`Kindly lock Dev Phase. If error persists, reload the page / app. Error: ${error}`);
        }
        console.error('error:', error);
    },
    capPhoto: function (canvas) {
        panel.v.captureAudio.play().then(function () {
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
                    switch (canvas.id.split("-")[0]) {
                        case "students":
                            $(ams.e["students-video-canvas"]).removeClass("active");
                            break;
                        case "attendance":
                            $(ams.e["attendance-video-canvas"]).removeClass("active");
                            break;
                        default:
                            break;
                    }
                    $(canvas).removeClass("active");
                    context.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
                    panel.v[`${canvas.id.split("-")[0]}CanvasState`] = true;
                    panel.v.imageCapture.track.stop();
                    panel.v.stream = null;
                    panel.v.imageCapture = null;
                    let drawImage = canvas.toDataURL("image/png");
                    // let i = new Image();
                    // i.style = "height:200px; width: auto";
                    // i.src = drawImage;
                    // document.body.append(i);
                    // ams.e['buffer-canvas'].getContext('2d').clearRect(0, 0, 200, 200);
                    // ams.e["buffer-canvas"].getContext('2d').drawImage(i, 0, 0, 200, 200);
                    // return ams.e["buffer-canvas"].toDataURL("image/png");
                    return drawImage;
                }).then((src) => {
                    let data = { src: src, type: "buffer" };
                    ams.socket.emit('save-image', data);
                })
                .catch(panel.error);
        }).catch(panel.error);
    },
    takePhoto: function (canvas) {
        panel.v.stream = null;
        panel.v.imageCapture = null;
        panel.getMediaStream(panel.capPhoto, canvas);
    }
}
panel.init();