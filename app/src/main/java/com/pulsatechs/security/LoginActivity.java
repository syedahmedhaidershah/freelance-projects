package com.pulsatechs.security;

import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.Intent;
import android.media.RingtoneManager;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.android.volley.RequestQueue;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.VolleyError;
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




public class LoginActivity extends AppCompatActivity {

    public static boolean isServiceRunning = false;
    private RequestQueue requestQueue;
//    String URLline = getActivity().getResources().getString(R.string.piip).concat(":9896/login");
    String URLline="http://192.168.0.101:9896/login";
    SharedPreferences sp;
    String user;
    String pass;
    Socket socket;
    JSONObject MSG;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Button loginButton = (Button) findViewById(R.id.button);
        sp = getSharedPreferences("loginButton",MODE_PRIVATE);
        if(sp.getBoolean("logged",false)){
            Intent mainIntent = new Intent(LoginActivity.this, PanelActivity.class);
            LoginActivity.this.startActivity(mainIntent);
            LoginActivity.this.finish();
        }
        loginButton.setOnClickListener(new Button.OnClickListener(){
            public void onClick(View v) {
                Context context = getApplicationContext();
                CharSequence wrongcreds = "Invalid credentials entered";
                CharSequence emptyfields = "Please input all of the fields";
                int duration = Toast.LENGTH_SHORT;

                EditText username = findViewById(R.id.editText);
                EditText password = findViewById(R.id.editText2);
                user = username.getText().toString();
                pass = password.getText().toString();
                // Toast.makeText(LoginActivity.this,user,Toast.LENGTH_LONG).show();
                StringRequest stringRequest = new StringRequest(Request.Method.POST, URLline,
                        new Response.Listener<String>() {
                            @Override
                            public void onResponse(String response) {
                                try {
                                    JSONObject jsonObject = new JSONObject(response);
                                    if (jsonObject.getString("error").equals("false")) {
                                        MSG=jsonObject.getJSONObject("message");
                                        //JSONArray dataArray = jsonObject.getJSONArray("data");
                                        sp.edit().putBoolean("logged",true).apply();
                                        sp.edit().putString("username", MSG.getString("username")).apply();
                                        sp.edit().putString("uid", MSG.getString("uid")).apply();

                                        try {
                                            //if you are using a phone device you should connect to same local network as your laptop and disable your pubic firewall as well
                                            socket = IO.socket("http://192.168.0.109:9897");
                                            //create connection
                                            socket.connect();
                                            // emit the event join along side with the nickname
                                            //socket.emit('join',Nickname);
                                            socket.emit("register", MSG);

                                        } catch (URISyntaxException e) {
                                            e.printStackTrace();
                                        }


                                        Intent serviceIntent = new Intent(LoginActivity.this, BackSocket.class);
                                        serviceIntent.putExtra("uid",MSG.getString("uid"));
                                        startService(serviceIntent);

                                        Intent mainIntent = new Intent(LoginActivity.this, PanelActivity.class);
                                        LoginActivity.this.startActivity(mainIntent);
                                        LoginActivity.this.finish();
                                    } else {
                                        Toast.makeText(LoginActivity.this,jsonObject.getString("message") ,Toast.LENGTH_LONG).show();
                                    }
                                } catch (JSONException e) {
                                    e.printStackTrace();
                                }

                            }
                        },
                        new Response.ErrorListener() {
                            @Override
                            public void onErrorResponse(VolleyError error) {
                                Toast.makeText(LoginActivity.this,error.toString(),Toast.LENGTH_LONG).show();
                            }
                        }){
                    @Override
                    protected Map<String,String> getParams(){
                        Map<String,String> params = new HashMap<String, String>();
                        params.put("username",user);
                        params.put("password",pass);

                        return params;
                    }

                };

                RequestQueue requestQueue = Volley.newRequestQueue(LoginActivity.this);
                requestQueue.add(stringRequest);


                /*if(user.matches("") || pass.matches("")){
                    Toast toast = Toast.makeText(context, emptyfields, duration);
                    toast.show();
                }
                if( user.matches("admin")){
                    if( pass.matches("admin")){
                        Intent mainIntent = new Intent(LoginActivity.this, PanelActivity.class);
                        LoginActivity.this.startActivity(mainIntent);
                        LoginActivity.this.finish();

                    } else {
                        Toast toast = Toast.makeText(context,wrongcreds, duration);
                        toast.show();
                    }
                } else {
                    Toast toast = Toast.makeText(context,user, duration);
                    toast.show();
                }*/

            }
        });
    }
}
