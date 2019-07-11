<?php
    if(session_status() != 2) {
        session_start();
    }
?>
<html>
    <head>
        <title>TEST</title>
        <script>
            window.sessid = "<?php echo session_id(); ?>";
        </script>
    </head>
    <body>
        <div id="msg-container" style="width:80%;margin-left:10%;padding:10px;height:400px;overflow-y:scroll;border-radius:5px;background-color:rgba(255,255,255,0.3)"></div>
        <input placeholder="How may we help you?" onkeypress="bot.send()" style="width:80%;margin-top:10px;margin-bottom:10px;margin-left:10%;border:none;border-bottom:2px solid orange; padding-left:10px;padding-right:10px;padding-top:15px;padding-bottom:15px;outline:none!important;font-size:1.5rem;" />
        <script src='./chat.js'></script>
    </body>
</html>