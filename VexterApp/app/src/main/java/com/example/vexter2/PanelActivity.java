package com.example.vexter2;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.CompoundButton;
import android.widget.Switch;
import android.widget.Toast;

import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class PanelActivity extends AppCompatActivity {

    String stateUri = "http://192.168.2.107/";
    String triggerUri = "http://192.168.2.107/trigger";
    String state;
    public static Switch switch1;
    public static boolean prevState = false;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_panel);

        switch1 = (Switch) findViewById(R.id.switch1);

        this.getState();
    }

    public void setListener() {
        switch1.setOnCheckedChangeListener(new CompoundButton.OnCheckedChangeListener() {
            public void onCheckedChanged(CompoundButton buttonView, boolean isChecked) {

                if(prevState == false)
                {
                    System.out.println("Enrered");
                    prevState = true;
                    StringRequest stringRequest = new StringRequest(Request.Method.POST, triggerUri,
                            new Response.Listener<String>() {
                                @Override
                                public void onResponse(String response) {
                                    try {

                                        JSONObject jsonObject = new JSONObject(response);
                                        state = jsonObject.getString("state");

                                        if (state.matches("[1]")) {
                                            Toast.makeText(getApplicationContext(), "Device turned on.", Toast.LENGTH_LONG).show();
                                            switch1.setChecked(true);
                                        } else {
                                            Toast.makeText(getApplicationContext(), "Device turned off.", Toast.LENGTH_LONG).show();
                                            switch1.setChecked(false);
                                        }
                                        prevState = false;
                                    } catch (JSONException e) {
                                        e.printStackTrace();
                                        prevState = false;
                                    }

                                }
                            },
                            new Response.ErrorListener() {
                                @Override
                                public void onErrorResponse(VolleyError error) {
                                    Toast.makeText(PanelActivity.this, error.toString(), Toast.LENGTH_LONG).show();
                                    prevState = false;
                                }
                            }) {

                        @Override
                        protected Map<String, String> getParams() {
                            Map<String, String> params = new HashMap<String, String>();

                            return params;
                        }

                    };

                    RequestQueue requestQueue = Volley.newRequestQueue(PanelActivity.this);
                    requestQueue.add(stringRequest);
                } else {
                    switch1.toggle();
                }
            }
        });
    }

    public void getState() {
        StringRequest stringRequest = new StringRequest(Request.Method.POST, stateUri,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        try {

                            JSONObject jsonObject = new JSONObject(response);
                            state = jsonObject.getString("state");
                            //JSONArray dataArray = jsonObject.getJSONArray("data");

                            if (state.matches("[1]")) {
                                Toast.makeText(getApplicationContext(), "Device was already on.", Toast.LENGTH_LONG).show();
                                switch1.setChecked(true);
                            } else {
                                Toast.makeText(getApplicationContext(), "Device  was already off.", Toast.LENGTH_LONG).show();
                                switch1.setChecked(false);
                            }

                            prevState = false;
                            setListener();

                        } catch (JSONException e) {
                            e.printStackTrace();
                            prevState = false;
                            setListener();
                        }

                    }
                },
                new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Toast.makeText(PanelActivity.this, error.toString(), Toast.LENGTH_LONG).show();
                        prevState = false;
                        setListener();
                    }
                }) {

            @Override
            protected Map<String, String> getParams() {
                Map<String, String> params = new HashMap<String, String>();

                return params;
            }

        };

        RequestQueue requestQueue = Volley.newRequestQueue(PanelActivity.this);
        requestQueue.add(stringRequest);
    }
}
