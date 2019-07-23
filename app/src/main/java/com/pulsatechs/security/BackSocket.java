package com.pulsatechs.security;

import com.github.nkzawa.emitter.Emitter;
import com.github.nkzawa.socketio.client.IO;
import com.github.nkzawa.socketio.client.Socket;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.net.URISyntaxException;
import java.util.Map;
import java.util.HashMap;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.Context;
import android.content.SharedPreferences;
import android.graphics.Color;
import android.media.RingtoneManager;
import android.os.Build;
import android.support.v4.app.NotificationCompat;
import android.widget.Toast;


import android.app.Service;
import android.content.Intent;
import android.os.IBinder;

public class BackSocket extends Service {
    Socket socket;
    String uid;
    NotificationManager mNotificationManager;
    JSONObject obj;
    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        if(intent != null){
            uid = intent.getStringExtra("uid");
            System.out.println("EXTRA -----------> ".concat(uid));
//            Toast.makeText(this, uid, Toast.LENGTH_SHORT).show();
            try {
                socket = IO.socket("http://192.168.0.101:9897");
                socket.connect();
//                System.out.println("APPLICATION FLOWING");
            }catch (URISyntaxException e){
//                Toast.makeText(getApplicationContext(), e.toString(), Toast.LENGTH_LONG).show();
            }

            //create connection

//            System.out.println(uid);
//            System.out.println(socket);
            socket.on(socket.EVENT_DISCONNECT, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    socket.connect();
                }

            });

            socket.on(socket.EVENT_RECONNECT_FAILED, new Emitter.Listener() {

                @Override
                public void call(Object... args) {
                    socket.connect();
                }

            });

            socket.on("0", new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    JSONObject obj = (JSONObject)args[0];
                    try {

                        Intent intent = new Intent(BackSocket.this, MainActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        PendingIntent pendingIntent = PendingIntent.getActivity(BackSocket.this, 0, intent, 0);


                        // Add as notification

                        System.out.println("MESSAGE ------> : ".concat((obj.getString("message"))));
                        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            String id = "my_channel_01";
                            CharSequence name = "Security";
                            String description="abc";
                                /*int importance = NotificationManager.IMPORTANCE_LOW;
                                NotificationChannel mChannel = new NotificationChannel(id, name, importance);
                                mChannel.enableLights(true);
                                mNotificationManager.createNotificationChannel(mChannel);

                                Notification notification = new Notification.Builder(BackSocket.this,id)*/

                            int importance = NotificationManager.IMPORTANCE_DEFAULT;
                            NotificationChannel channel = new NotificationChannel(id, name, importance);
                            channel.setDescription(description);
                            // Register the channel with the system; you can't change the importance
                            // or other notification behaviors after this
                            NotificationManager notificationManager = getSystemService(NotificationManager.class);
                            notificationManager.createNotificationChannel(channel);

                            NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"my_channel_01")
                                    .setSmallIcon(R.mipmap.ic_launcher)
                                    .setContentTitle("piPanel Security")
                                    .setContentText(obj.getString("message"))
                                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                    .setContentIntent(pendingIntent)
                                    .setAutoCancel(true)
                                    .setOngoing(false);

                            startForeground(234,builder.build());
                        }else{
                            NotificationManager notificationManager = getSystemService(NotificationManager.class);

                            NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"0")
                                    .setSmallIcon(R.mipmap.ic_launcher)
                                    .setContentTitle("piPanel Security")
                                    .setContentText(obj.getString("message"))
                                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                    .setContentIntent(pendingIntent)
                                    .setAutoCancel(true)
                                    .setOngoing(false);
                            startForeground(234,builder.build());

                        }

                    } catch (JSONException e) {}
                }
            });

            socket.on(uid, new Emitter.Listener() {
                @Override
                public void call(Object... args) {
                    if(args != null)
                        obj = (JSONObject)args[0];
                    try {
                        JSONObject obj2=obj.getJSONObject("message");
                        Intent intent = new Intent(BackSocket.this, MainActivity.class);
                        intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                        PendingIntent pendingIntent = PendingIntent.getActivity(BackSocket.this, 0, intent, 0);
                        // Add as notification


                        if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                            String id = "my_channel_01";
                            CharSequence name = "Security";
                            String description="abc";
                                /*int importance = NotificationManager.IMPORTANCE_LOW;
                                NotificationChannel mChannel = new NotificationChannel(id, name, importance);
                                mChannel.enableLights(true);
                                mNotificationManager.createNotificationChannel(mChannel);

                                Notification notification = new Notification.Builder(BackSocket.this,id)*/

                            int importance = NotificationManager.IMPORTANCE_DEFAULT;
                            NotificationChannel channel = new NotificationChannel(id, name, importance);
                            channel.setDescription(description);
                            // Register the channel with the system; you can't change the importance
                            // or other notification behaviors after this
                            NotificationManager notificationManager = getSystemService(NotificationManager.class);
                            notificationManager.createNotificationChannel(channel);

                            NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"my_channel_01")
                                    .setSmallIcon(R.mipmap.ic_launcher)
                                    .setContentTitle("piPanel Security")
                                    .setContentText(obj2.getString("text"))
                                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                    .setContentIntent(pendingIntent)
                                    .setAutoCancel(true)
                                    .setOngoing(false);

                            startForeground(235,builder.build());
                        }else{
                            NotificationManager notificationManager = getSystemService(NotificationManager.class);

                            NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"0")
                                    .setSmallIcon(R.mipmap.ic_launcher)
                                    .setContentTitle("piPanel Security")
                                    .setContentText(obj2.getString("text"))
                                    .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                    .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                    .setContentIntent(pendingIntent)
                                    .setAutoCancel(true)
                                    .setOngoing(false);
                            startForeground(235,builder.build());

                        }
                        socket.emit("received",obj);
                    } catch (JSONException e) {}
                }
            });


        }
        return START_STICKY;

    }

    @Override
    public void onCreate() {
        try {
            //if you are using a phone device you should connect to same local network as your laptop and disable your pubic firewall as well
//            if(socket == null)
            socket = IO.socket("http://192.168.0.101:9897");
            //create connection
//            if(!(socket.connected()))
            socket.connect();
            // emit the event join along side with the nickname
            //socket.emit('join',Nickname);
            System.out.println("SOCKET CONNECTED OVER HERE0");
            if (socket.connected()){
                  System.out.println("socket connected");
                socket.on("0", new Emitter.Listener() {
                    @Override
                    public void call(Object... args) {
                        JSONObject obj = (JSONObject)args[0];
                        try {

                            Intent intent = new Intent(BackSocket.this, MainActivity.class);
                            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK);
                            PendingIntent pendingIntent = PendingIntent.getActivity(BackSocket.this, 0, intent, 0);


                            // Add as notification

                            System.out.println("MESSAGE ------> : ".concat((obj.getString("message"))));
                            if(Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                                String id = "my_channel_01";
                                CharSequence name = "Security";
                                String description="abc";
                                /*int importance = NotificationManager.IMPORTANCE_LOW;
                                NotificationChannel mChannel = new NotificationChannel(id, name, importance);
                                mChannel.enableLights(true);
                                mNotificationManager.createNotificationChannel(mChannel);

                                Notification notification = new Notification.Builder(BackSocket.this,id)*/

                                int importance = NotificationManager.IMPORTANCE_DEFAULT;
                                NotificationChannel channel = new NotificationChannel(id, name, importance);
                                channel.setDescription(description);
                                // Register the channel with the system; you can't change the importance
                                // or other notification behaviors after this
                                NotificationManager notificationManager = getSystemService(NotificationManager.class);
                                notificationManager.createNotificationChannel(channel);

                                NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"my_channel_01")
                                        .setSmallIcon(R.mipmap.ic_launcher)
                                        .setContentTitle("piPanel Security")
                                        .setContentText(obj.getString("message"))
                                        .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                        .setContentIntent(pendingIntent)
                                        .setAutoCancel(true)
                                        .setOngoing(false);

                                startForeground(234,builder.build());
                            }else{
                                NotificationManager notificationManager = getSystemService(NotificationManager.class);

                                NotificationCompat.Builder builder = new NotificationCompat.Builder(BackSocket.this,"0")
                                        .setSmallIcon(R.mipmap.ic_launcher)
                                        .setContentTitle("piPanel Security")
                                        .setContentText(obj.getString("message"))
                                        .setSound(RingtoneManager.getDefaultUri(RingtoneManager.TYPE_NOTIFICATION))
                                        .setPriority(NotificationCompat.PRIORITY_DEFAULT)
                                        .setContentIntent(pendingIntent)
                                        .setAutoCancel(true)
                                        .setOngoing(false);
                                startForeground(234,builder.build());

                            }

                        } catch (JSONException e) {}
                    }
                });
//                socket.on(socket.EVENT_DISCONNECT, new Emitter.Listener() {
//
//                    @Override
//                    public void call(Object... args) {
//                        socket.connect();
//                    }
//
//                });
            }
        } catch (URISyntaxException e) {
            e.printStackTrace();
        }
    }

    public BackSocket() {
    }

    @Override
    public IBinder onBind(Intent intent) {
        // TODO: Return the communication channel to the service.
        throw new UnsupportedOperationException("Not yet implemented");
    }
}
