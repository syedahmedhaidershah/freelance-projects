package com.pulsatechs.security;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import java.net.URISyntaxException;

public class BluetoothAddress extends AppCompatActivity {

    Socket socket;
    String nayaString;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_bluetooth_address);


        try {
            socket = IO.socket("http://192.168.0.101:9897");
            socket.connect();
        } catch (URISyntaxException e) {}

        Button setBTAddr = (Button) findViewById(R.id.button7);

        setBTAddr.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {

                EditText btAddr = findViewById(R.id.editText3);
                nayaString = btAddr.getText().toString();

                socket.emit("addbluetoothaddr", nayaString);
                Toast.makeText(getApplicationContext(), "Your Bluetooth Address has been added", Toast.LENGTH_LONG).show();
            }
        });

        socket.on(socket.)
    }
}
