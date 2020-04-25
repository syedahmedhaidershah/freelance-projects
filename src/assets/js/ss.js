if (!window['camTimeoutBuffer']) window['camTimeoutBuffer'] = null;
if (!window['camTimeoutInterval']) window['camTimeoutInterval'] = 160001;

if (!window['vidPlayer']) window['vidPlayer'] = document.getElementById('video-proctor');

if (!window['canvas']) window['canvas'] = document.getElementById('canvas-proctor');

if (!window['canvas']) {
    try {
        if (!window['context']) window['context'] = canvas.getContext('2d');
    } catch (exc) {}
}

if (!window['constraints']) window['constraints'] = {
    video: true,
    audio: false
};

if (!window['renderCanvas']) window['renderCanvas'] = async() => {
    try {
        if (!window['canvas']) window['canvas'] = document.getElementById('canvas-proctor');
        if (!window['context']) window['context'] = canvas.getContext('2d');
        await context.drawImage(vidPlayer, 0, 0, canvas.width, canvas.height);
    } catch (exc) {}
    return setTimeout(() => renderCanvas(), camTimeoutInterval);
}

// Attach the video stream to the video element and autoplay
if (!window['requestCamAccess']) window['requestCamAccess'] = async() => {
    if (!window['vidPlayer']) window['vidPlayer'] = document.getElementById('video-proctor');
    try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        vidPlayer.srcObject = stream;
        window['camActive'] = true;
    } catch (exc) {
        window['camDenied'] = true;
    }
}

if (!window['startCam']) window['startCam'] = async() => {
    camTimeoutBuffer = renderCanvas();
}

if (!window['getDataUri']) window['getDataUri'] = async() => {
    return await canvas.toDataURL();
}