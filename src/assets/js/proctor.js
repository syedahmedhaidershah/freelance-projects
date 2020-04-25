if (!window['audioCtx']) window['audioCtx'] = null;
if (!window['currentAmp']) window['currentAmp'] = 0;

function createAudioMeter(audioCtx, clipLevel, averaging, clipLag) {
    var processor = audioCtx.createScriptProcessor(512);
    processor.onaudioprocess = volumeAudioProcess;
    processor.clipping = false;
    processor.lastClip = 0;
    processor.volume = 0;
    processor.clipLevel = clipLevel || 0.98;
    processor.averaging = averaging || 0.95;
    processor.clipLag = clipLag || 750;
    processor.connect(audioCtx.destination);

    processor.checkClipping =
        function() {
            if (!this.clipping)
                return false;
            if ((this.lastClip + this.clipLag) < window.performance.now())
                this.clipping = false;
            return this.clipping;
        };

    processor.shutdown =
        function() {
            this.disconnect();
            this.onaudioprocess = null;
        };

    return processor;
}

function volumeAudioProcess(event) {
    var buf = event.inputBuffer.getChannelData(0);
    var bufLength = buf.length;
    var sum = 0;
    var x;

    for (var i = 0; i < bufLength; i++) {
        x = buf[i];
        if (Math.abs(x) >= this.clipLevel) {
            this.clipping = true;
            this.lastClip = window.performance.now();
        }
        sum += x * x;
    }

    var rms = Math.sqrt(sum / bufLength);

    this.volume = Math.max(rms, this.volume * this.averaging);
}

if (!window['setDocHandler']) window['setDocHandler'] = async() => {

    if (window['isDevMode']) console.log('Microphone Handler triggered');
    if (window['audioProctoringIntialized']) {
        return false;
    } else {
        window['audioProctoringIntialized'] = true;
    }
    if (window['isDevMode']) console.log('Microphone Handler Permitted.');


    window.AudioContext = window.AudioContext || window.webkitAudioContext;

    audioCtx = new AudioContext();

    try {
        navigator.getUserMedia =
            navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;
        navigator.getUserMedia({
            audio: {
                mandatory: {
                    googEchoCancellation: true,
                    googAutoGainControl: false,
                    googNoiseSuppression: true,
                    googHighpassFilter: false
                },
                optional: []
            },
        }, gotStream, didntGetStream);
    } catch (exc) {
        console.log(exc);
        didntGetStream();
    }

}


function didntGetStream() {
    window['micDenied'] = 'denied';
}

var mediaStreamSource = null;

function gotStream(stream) {
    window['micActive'] = true;
    mediaStreamSource = audioCtx.createMediaStreamSource(stream);
    meter = createAudioMeter(audioCtx);
    mediaStreamSource.connect(meter);
    drawLoop();
}

function drawLoop(time) {
    currentAmp = meter.volume * 3000;
    currentAmp = currentAmp.toFixed(0);
    // if (window['isDevMode']) console.log(`Current: ${currentAmp}`);
    // setTimeout(() => drawLoop(), 16); 
    
    //CHANGED 16 to 1000 HENNY
    setTimeout(() => drawLoop(), 1000);
    // console.log(meter.volume * 3000);
}