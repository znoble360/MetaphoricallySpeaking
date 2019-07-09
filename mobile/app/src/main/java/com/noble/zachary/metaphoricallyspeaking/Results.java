package com.noble.zachary.metaphoricallyspeaking;

import androidx.appcompat.app.AppCompatActivity;

import android.content.res.Resources;
import android.os.Bundle;
import android.widget.ListView;

import java.util.List;

public class Results extends AppCompatActivity {

    ListView resultsList;
    String result, resultDiscription;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);

        Resources res = getResources();
        resultsList = (ListView) findViewById(R.id.resultsList);

        result = res.getString(R.string.result);
        resultDiscription = res.getString(R.string.resultDiscription);

        


    }
}
