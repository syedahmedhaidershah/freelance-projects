package com.example.osproject;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.Toast;

public class Welcome extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_welcome);

        Button b = (Button) findViewById(R.id.button);

        b.setOnClickListener(new View.OnClickListener() {
            public void onClick(View v) {
                Toast.makeText(Welcome.this, "Loading engine ...", Toast.LENGTH_SHORT).show();
                Intent mainIntent = new Intent(Welcome.this,MainActivity2.class);
                Welcome.this.startActivity(mainIntent);
                Welcome.this.finish();
            }
        });
    }
}