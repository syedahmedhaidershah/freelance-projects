package com.pulsatechs.security;

import android.content.Intent;
import android.content.SharedPreferences;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;

public class Changegatepass extends AppCompatActivity {

    Socket socket;
    String nayaString;
    SharedPreferences sp;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_changegatepass);

        try {
            socket = IO.socket("http://192.168.0.101:9897");
            socket.connect();
        } catch (URISyntaxException e) {}

        Button stream = (Button) findViewById(R.id.button);

        stream.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Button gate = (Button) findViewById(R.id.button);

                EditText pass = findViewById(R.id.editText2);
                nayaString = pass.getText().toString();

                socket.emit("nayagatepass", nayaString);
            }
        });



    }
}
