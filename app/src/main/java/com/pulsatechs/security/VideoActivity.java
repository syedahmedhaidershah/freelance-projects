package com.pulsatechs.security;

import android.app.ProgressDialog;
import android.content.Intent;
import android.os.Bundle;
import android.app.Activity;
import android.view.View;
import android.widget.Button;
import android.widget.VideoView;
import android.graphics.PixelFormat;
import android.media.MediaPlayer;
import android.media.MediaPlayer.OnPreparedListener;
import android.net.Uri;
import android.os.Bundle;
import android.widget.MediaController;
import android.widget.VideoView;
import com.pulsatechs.security.IPCamView;

public class VideoActivity extends Activity {

    private IPCamView ipCamView;

    private static ProgressDialog progressDialog;
    String videourl=""; //It should be 3gp or mp4
    VideoView videoView ;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_video);

        Button back = (Button) findViewById(R.id.button4);

        back.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                Intent mainIntent = new Intent(VideoActivity.this, PanelActivity.class);
                VideoActivity.this.startActivity(mainIntent);
                VideoActivity.this.finish();
            }
        });

        ipCamView = findViewById(R.id.ip_cam_view);
        ipCamView.setUrl("http://192.168.0.102:8888/out.jpg?q=30&id=0.9479069705501526");
        ipCamView.setInterval(16); // In milliseconds, default 1000
        ipCamView.start();
    }


}
