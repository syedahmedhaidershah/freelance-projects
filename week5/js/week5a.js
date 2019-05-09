const w5 = {
    e: [
        {
            id: 'randomizeButton',
            type: 'button',
            appendTo: document.body,
            innerText: 'Randomize'
        }
    ],
    createElements: () => {
        w5.e.forEach(v => {
            const el = document.createElement(v.type);
            el.id = v.id;
            el.innerText = v.innerText;
            v.appendTo.append(el);
        });
    },
    setListeners: () => {
        Array.from(document.getElementsByClassName('fixed-colors')).forEach(el => {
            el.onclick = ($e) => {
                w5.setSpecificColor($e.target.id);
            }
        });
        document.getElementById('randomizeButton').onclick = w5.randomiseBackgroundColour;
    },
    randomiseBackgroundColour: () => {
        const limit = (Math.floor((Math.random() * 10) / 2));
        document.body.style = 'background-color: '.concat(colourList[parseInt(limit, 10)]);
    },
    setSpecificColor: (color) => {        
        document.body.style = 'background-color: '.concat(color);
    }
}

window.onload = function () {
    w5.createElements();
    colourList.forEach(b => {   
        let el = document.createElement('button');
        el.id = b;
        el.innerText = b[0].toUpperCase().concat(b.substr(1));
        document.body.innerHTML += '<br><br>';
        el.className += ' fixed-colors'
        document.body.append(el);
    });
    
    w5.setListeners();
}