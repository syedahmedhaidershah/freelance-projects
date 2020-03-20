function Hunspell(aff, dic, onCreate) {
    var w = new Worker("static/hunspell/hunspell-worker.js");
    var spellQueue = [];
    var suggestQueue = [];
    w.onmessage = function(event) {
        var data = event.data;
        var callback = null;
        switch (data.action) {
            case 'ready':
                w.postMessage({
                    action: 'create',
                    aff: aff,
                    dic: dic
                });
                break;
            case 'create':
                onCreate();
                break;
            case 'spell':
                callback = spellQueue.shift();
                callback(data.word, data.correct);
                break;
            case 'suggest':
                callback = suggestQueue.shift();
                callback(data.word, data.suggestions);
                break;
            default:
                console.log('unknown action from webworker:', data.action);
        }
    };
    w.onerror = console.error.bind(console);
    this.spell = function(word, callback) {
        spellQueue.push(callback);
        w.postMessage({
            action: 'spell',
            word: word
        });
    };
    this.suggest = function(word, callback) {
        suggestQueue.push(callback);
        w.postMessage({
            action: 'suggest',
            word: word
        });
    };
}

var lang = 'nl';
var hs = new Hunspell(
    '/spellcheck/static/hunspell/dictionaries/dictionaries/' + lang + '/index.aff',
    '/spellcheck/static/hunspell/dictionaries/dictionaries/' + lang + '/index.dic',
    function onCreate() {
        ready()
    }
)


function ready() {
    generateMap();
}