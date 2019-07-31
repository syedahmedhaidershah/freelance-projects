package com.example.vidulum;

import androidx.fragment.app.FragmentActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

import com.github.nkzawa.emitter.Emitter;
import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.SupportMapFragment;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;


public class MapsActivity extends FragmentActivity implements OnMapReadyCallback {

    private GoogleMap mMap;
    private Socket msocket;
    private Boolean loaded = false;
    Button imgbut;

    JSONObject obj = new JSONObject();
    {
        try {
            msocket= IO.socket("http://ec2-18-222-122-101.us-east-2.compute.amazonaws.com:9898");
//            msocket= IO.socket("http://18.222.122.101:9898");
        } catch (URISyntaxException e) {
            System.out.println(e.toString());
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_maps);
        msocket.connect();

        try {
            obj.put("lat", 0);
            obj.put("lng", 0);
        } catch (JSONException e) {
            System.out.println("JSON " + e.toString());
        }

        imgbut = findViewById(R.id.button1);

        imgbut.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Intent mainIntent = new Intent(MapsActivity.this, ListActivity.class);
                startActivity(mainIntent);
            }
        });

        // Obtain the SupportMapFragment and get notified when the map is ready to be used.
        SupportMapFragment mapFragment = (SupportMapFragment) getSupportFragmentManager()
                .findFragmentById(R.id.map);
        mapFragment.getMapAsync(this);

        msocket.on(Socket.EVENT_CONNECT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                System.out.println("CONNECTED TO SOCKET ON AWS");
            }
        });

        msocket.on(Socket.EVENT_CONNECT_ERROR, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                System.out.println(args[0].toString());
                System.out.println(args[1].toString());
                //System.out.println("CONNECTION ERROR TO SOCKET ON AWS");
            }
        });

        msocket.on(Socket.EVENT_CONNECT_TIMEOUT, new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                System.out.println("CONNECTION TIMEOUT TO SOCKET ON AWS");
            }
        });

        msocket.on(msocket.EVENT_DISCONNECT, new Emitter.Listener() {

            @Override
            public void call(Object... args) {
                msocket.connect();
            }

        });

        msocket.on("location", new Emitter.Listener() {
            @Override
            public void call(Object... args) {
                obj = (JSONObject)args[0];
                if(loaded == true) {
                    runOnUiThread(new Runnable(){
                        public void run() {
                            try {
                                mMap.clear();
                                LatLng sydney = new LatLng(obj.getDouble("lat"), obj.getDouble("lng"));
                                //System.out.println(obj.getString("lat") + "," + obj.getString("lng"));
//                                System.out.println(sydney.toString());
//                                System.out.println(sydney.latitude);
                                mMap.addMarker(new MarkerOptions().position(sydney).title("Your wallet"));
                                mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
                            } catch (JSONException e) {
                                System.out.println(e.toString());
                            }
                        }
                    });
                }
            }
        });
    }


    /**
     * Manipulates the map once available.
     * This callback is triggered when the map is ready to be used.
     * This is where we can add markers or lines, add listeners or move the camera. In this case,
     * we just add a marker near Sydney, Australia.
     * If Google Play services is not installed on the device, the user will be prompted to install
     * it inside the SupportMapFragment. This method will only be triggered once the user has
     * installed Google Play services and returned to the app.
     */
    @Override
    public void onMapReady(GoogleMap googleMap) {
        mMap = googleMap;
        try {
            LatLng sydney = new LatLng(obj.getInt("lat"), obj.getInt("lng"));
            mMap.addMarker(new MarkerOptions().position(sydney).title("Your wallet"));
            mMap.moveCamera(CameraUpdateFactory.newLatLng(sydney));
        } catch (JSONException e) {}
        loaded = true;
        // Add a marker in Sydney and move the camera
    }

}
