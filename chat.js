x = new XMLHttpRequest();
x.onreadystatechange = () => {
    if (x.readyState == 4 && x.status == 200) {
        const j = JSON.parse(x.responseText);
        if (j.error) {
            console.log(j.message);
            return false;
        }
        const newElLeft = document.createElement('div');
        newElLeft.innerText = j.message;
        newElLeft.style = 'font-family:arial;color:white;margin-top:15px;margin-bottom:15px;margin-right:calc(50% + 30px);width:40%;height:auto;padding:15px;background-color:darkgray';
        const msgc = document.getElementById('msg-container');
        msgc.append(newElLeft);
        setTimeout(() => {
            console.log('msgc');
            msgc.scrollBy(0, 100);
        }, 100);
    }
}
const bot = {
    v: {
        sent: ''
    },
    init: () => {
        document.addEventListener('DOMContentLoaded', bot.proceed, false);
    },
    send: (event) => {
        const code = window.event.charCode || event.charCode;
        if (code != 13) {
            return false;
        }
        x.open('POST', 'http://localhost/freelance/incubee/test2/process.php', true);
        x.setRequestHeader('Content-type', 'applicaton/json');
        const inp = document.querySelector('input')
        const val = inp.value;
        bot.v.sent = inp.value;
        x.send(JSON.stringify({ message: val, sessid: window.sessid }));
        inp.value = '';
        const newElRight = document.createElement('div');
        newElRight.innerText = bot.v.sent;
        newElRight.style = 'font-family:arial;color:white;margin-top:5px;margin-bottom:5px;margin-left:calc(50% + 30px);width:40%;height:auto;padding:15px;background-color:orange';
        document.getElementById('msg-container').append(newElRight);
    },
    proceed: () => {
        const el = document.querySelectorAll('.elementor-column-wrap.elementor-element-populated');
        if (el.length > 0) {
            el[1].style.margin = "0px";
        }
    }
}

bot.init();