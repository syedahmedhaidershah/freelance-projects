package com.example.osproject;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.webkit.ConsoleMessage;
import android.webkit.JavascriptInterface;
import android.webkit.WebResourceError;
import android.webkit.WebResourceRequest;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ProgressBar;
import android.widget.Toast;

public class MainActivity2 extends AppCompatActivity {
    private static MainActivity2 instance;
    WebView webView;
    ProgressBar progBar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main2);
        progBar = (ProgressBar) findViewById(R.id.progressBar);
        progBar.bringToFront();

        instance = this;

        webView = (WebView) findViewById(R.id.webView);


        WebView.setWebContentsDebuggingEnabled(true);
        WebSettings webSettings = webView.getSettings();

        webSettings.setJavaScriptEnabled(true);
        webView.setWebViewClient(new WebViewClient() {
//            @Override public void onReceivedError(WebView view, WebResourceRequest request, WebResourceError error) {
//                webView.loadUrl("file:///android_asset/error.html");
//            }
        });
        webView.addJavascriptInterface(new WebAppInterface(this), "Android");
        webView.loadUrl("file:///android_asset/index.html");
    }

    public static MainActivity2 getInstance() {
        return instance;
    }
}