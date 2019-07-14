package com.noble.zachary.metaphoricallyspeaking;

import androidx.appcompat.app.AppCompatActivity;

import android.content.res.Resources;
import android.os.Bundle;
import android.widget.ListView;

public class Results extends AppCompatActivity
{

    ListView resultsList;
    String [] result, resultDescription;


    @Override
    protected void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_results);

        Resources res = getResources();
        resultsList = (ListView) findViewById(R.id.resultsList);

        result = res.getStringArray(R.array.results);
        resultDescription = res.getStringArray(R.array.descriptions);

    }
}
