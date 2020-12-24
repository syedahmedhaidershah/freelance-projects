package com.example.osproject;

import android.content.Context;
import android.webkit.JavascriptInterface;
import android.widget.Toast;

public class WebAppInterface {
    Context mContext;;

    /** Instantiate the interface and set the context */
    WebAppInterface(Context c) {
        mContext = c;
    }

    /** Show a toast from the web page */
    @JavascriptInterface
    public void showToast(String toast) {
        Toast.makeText(mContext, toast, Toast.LENGTH_SHORT).show();
    }

    @JavascriptInterface
    public void reloadPage() {
        // Required because of MF UI thread Issue
        (MainActivity2.getInstance()).webView.post(new Runnable() {
            @Override
            public void run() {
                (MainActivity2.getInstance()).webView.loadUrl("https://osp.syedahmedhaidershah.cyou");
            }
        });
    }
}