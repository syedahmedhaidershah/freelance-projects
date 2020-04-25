class wordMap {
    theRealMap = new Map();
    addWord = (woord, start, stop) => {
        if (!this.theRealMap.has(woord)) {
            this.theRealMap.set(woord, new Array());
        }
        this.theRealMap.get(woord).push({
            start: start,
            stop: stop
        });
    }
}

let map = new wordMap();

function generateMap() {
    map.theRealMap.clear()
    const splitters = [" ", ".", ",", ";", ":", "\n", "?", "!"]
    const matches = (c) => {
        let match = false;
        splitters.forEach(element => {
            if (element === c) {
                match = true
            }
        })
        return match
    }

    let string = quill.getText();
    let woord = "";

    for (let i = 0; i < string.length; i++) {
        let c = string[i];
        if (matches(c)) {
            if (woord.length > 0) {
                map.addWord(woord, (i - woord.length), (i - 1));
                woord = "";
            }
        } else {
            woord = woord + c;
        }
    }

    for (let word of map.theRealMap.keys()) {
        hs.spell(word, (original, correct) => {
            for (let attr of map.theRealMap.get(word)) {
                let size = original.length;
                if (!correct) {
                    if (!attr.misspelled) {
                        attr.misspelled = true;
                    }
                    // console.log("FOUT!!")
                    updateContents(original, attr.start, size, "pink");
                } else {
                    if (attr.misspelled) {
                        attr.misspelled = false;
                    }
                    // console.log("GOED!!")
                    updateContents(original, attr.start, size, "white");

                }
            }
        })
    }
}

async function updateContents(woord, start, lengte, kleur) {
    await quill.updateContents(new Delta()
        .retain(start) // Keep 'Hello '
        .delete(lengte) // 'World' is deleted
        .insert(woord, { background: kleur })
    )
}