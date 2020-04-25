if (!window['player']) window['player'] = document.createElement('audio');
player.id = 'player';
player.className = 'd-none';
player.controls = true;
if (!window['mediaRecorder']) window['mediaRecorder'] = null;
if (!window['gStream']) window['gStream'] = null;
if (!window['aud']) window['aud'] = new Audio();
if (!window['recordTimeoutBuffer']) window['recordTimeoutBuffer'] = null;
if (!window['mediaRecorderState']) window['mediaRecorderState'] = 'inactive';

if (!window['options']) window['options'] = {
    mimeType: 'audio/webm'
};
if (!window['recordedChunks']) window['recordedChunks'] = [];
if (!window['mediaChunks']) window['mediaChunks'] = [];

if (!window['startRecording']) window['startRecording'] = async() => {
    // setTimeout
    try {
        if (window['isDevMode']) console.log('recording started');
        mediaRecorder = new MediaRecorder(gStream, options);

        mediaRecorder.addEventListener('dataavailable', function(e) {
            // if(window['isDevMode']) console.log(e);
            if (window['isDevMode']) console.log(e.data.size);
            if (e.data.size > 0) {
                recordedChunks.push(e.data);
            }
        });

        mediaRecorder.addEventListener('stop', function() {
            mediaChunks.push(URL.createObjectURL(new Blob(recordedChunks)));
        });

        await mediaRecorder.start();
        mediaRecorderState = mediaRecorder.state;

        recordTimeoutBuffer = recordTimeout();
    } catch (exc) {}
}

if (!window['haltRecording']) window['haltRecording'] = async() => {
    if (mediaRecorder) {
        if (mediaRecorder.state === 'recording') {
            await mediaRecorder.stop();
            mediaRecorderState = mediaRecorder.state;
            clearTimeout(recordTimeoutBuffer);
            recordedChunks = [];
        }
    }
}

if (!window['recordTimeout']) window['recordTimeout'] = () => {
    return setTimeout(async() => {
        if (mediaRecorder.state === 'recording') {
            await mediaRecorder.stop();
            mediaRecorderState = mediaRecorder.state;

            const reader = new FileReader();
            reader.onload = function(e) {
                if (window['isDevMode']) console.log('processing recording');
                const srcUrl = e.target.result;
                recordedChunks = [];
                if (window['isDevMode']) console.log(srcUrl);
                window['proctor-record'] = srcUrl;
                aud.src = srcUrl;
            };
            const dataInter = setInterval(() => {
                if (recordedChunks[0]) {
                    const el = recordedChunks[0];
                    // if (window['isDevMode']) console.log(el);
                    // if (window['isDevMode']) console.log(recordedChunks);
                    if (el) {
                        reader.readAsDataURL(el);
                        clearInterval(dataInter)
                    }
                    if (window['isDevMode']) console.log('recording stopped');
                }
            }, 16);
        }
    }, 11000);
}

if (!window['handleSuccess']) window['handleSuccess'] = (stream) => {
    // if(window['isDevMode']) console.log(stream);
    if (window.URL) {
        player.srcObject = stream;
    } else {
        player.src = stream;
    }
    gStream = stream;
    return Promise.resolve(true);
};

if (!window['requestAccess']) window['requestAccess'] = async() => {
    if (window['isDevMode']) console.log('Access Requested for microphone/video');
    try {
        const gotStreamObjAud = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: false
        });
        gotStreamSuccess(gotStreamObjAud);
    } catch (exc) {
        console.log(exc);
        window['micDenied'] = 'denied';
    }

}

if (!window['gotStreamSuccess']) window['gotStreamSuccess'] = async(mediaStream) => {
    if (mediaStream instanceof MediaStream && window['isDevMode']) console.log('access granted.');
    const handled = await handleSuccess(mediaStream);
}
