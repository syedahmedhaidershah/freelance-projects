package com.pulsatechs.security;

import android.preference.PreferenceManager;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Intent;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.Map;
import java.util.HashMap;
import android.content.SharedPreferences;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class PanelActivity extends AppCompatActivity {
    JSONObject msg;
    private String Nickname ;
    SharedPreferences sp;
    private Socket socket;
    String uid;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_panel);

        SharedPreferences preferences = getSharedPreferences("loginButton",MODE_PRIVATE);
        uid=preferences.getString("username", "UNKNOWN");

        Intent serviceIntent = new Intent(PanelActivity.this, BackSocket.class);
//        System.out.println("uid-panel: ".concat(uid));
        serviceIntent.putExtra("uid",uid);
        startService(serviceIntent);

        TextView navUsername = (TextView) findViewById(R.id.textView);
        navUsername.setText("Welcome "+uid);

        Button stream = (Button) findViewById(R.id.button2);

        stream.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Intent mainIntent = new Intent(PanelActivity.this, VideoActivity.class);
                startActivity(mainIntent);
            }
        });

        Button gate = (Button) findViewById(R.id.button3);

        gate.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
            }
        });

        Button gatepass = (Button) findViewById(R.id.button5);

        gatepass.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Intent mainIntent = new Intent(PanelActivity.this, Changegatepass.class);
                startActivity(mainIntent);
            }
        });

//        Button idpass = (Button) findViewById(R.id.button6);
//
//        idpass.setOnClickListener(new Button.OnClickListener() {
//            public void onClick(View v) {
//            }
//        });


        try {
            //if you are using a phone device you should connect to same local network as your laptop and disable your pubic firewall as well
            socket = IO.socket("http://192.168.0.101:9897");
            //create connection
            socket.connect();
            // emit the event join along side with the nickname
//            socket.emit("join",Nickname);
            if (socket.connected()){
                JSONObject jsonObject = new JSONObject();
                try {
                    jsonObject.put("username", sp.getString("username", "admin"));
                    jsonObject.put("uid", sp.getString("uid", "0"));
                    socket.emit("register", jsonObject);
                } catch (JSONException e) {}
                socket.on(sp.getString("uid", "0"), new Emitter.Listener() {
                    @Override
                    public void call(Object... args) {
                        JSONObject obj = (JSONObject)args[0];
                        try {
                            Toast.makeText(PanelActivity.this, obj.getString("message"), Toast.LENGTH_LONG).show();
                        } catch (JSONException e) {}
                    }
                });
                socket.on(Socket.EVENT_DISCONNECT, new Emitter.Listener() {

                    @Override
                    public void call(Object... args) {
                        socket.connect();
                    }

                });
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }

//        Intent backSocketIntent = new Intent(PanelActivity.this, BackSocket.class);
//        startService(backSocketIntent);
//
//        Intent intent = getIntent();

    }
}
